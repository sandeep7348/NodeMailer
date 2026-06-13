import crypto from "crypto";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.services.js";

const signToken = (user) => {
  const payload = { id: user._id, email: user.email, username: user.username };
  return jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { username, email } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      const duplicateField = existingUser.email === email ? "email" : "username";
      return res.status(409).json({ error: `A user with that ${duplicateField} already exists.` });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationUrl = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`}/api/auth/verify/${verificationToken}`;

    const user = await User.create({
      ...req.body,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });
    const safe = await User.findById(user._id).select("-password -verificationToken");

    try {
      console.log("Sending verification email to", user.email, "verificationUrl:", verificationUrl);
      await sendEmail({
        to: user.email,
        subject: "Verify your Perplexity account",
        text: `Hello ${user.username},\n\nYour account has been created successfully. Please verify your email by clicking the link below:\n\n${verificationUrl}`,
        html: `<p>Hello ${user.username},</p><p>Your account has been created successfully. Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">Verify your account</a></p>`,
      });
    } catch (emailErr) {
      console.error("Failed to send verification email", emailErr);
    }

    if (user.verified) {
      const token = signToken(user);
      return res.status(201).json({ user: safe, token });
    }
    return res.status(201).json({ user: safe, message: "Account created. Verification required before issuing token." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ error: "Verification token missing" });

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired verification token" });

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: "Account verified successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.verified) return res.status(400).json({ error: "Account is already verified" });

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationUrl = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`}/api/auth/verify/${verificationToken}`;

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    try {
      console.log("Resending verification email to", user.email, "verificationUrl:", verificationUrl);
      await sendEmail({
        to: user.email,
        subject: "Verify your Perplexity account",
        text: `Hello ${user.username},\n\nPlease verify your email by clicking the link below:\n\n${verificationUrl}`,
        html: `<p>Hello ${user.username},</p><p>Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">Verify your account</a></p>`,
      });
    } catch (emailErr) {
      console.error("Failed to send verification email", emailErr);
      return res.status(500).json({ error: "Unable to send verification email" });
    }

    res.json({ message: "Verification email resent." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    if (!user.verified) return res.status(403).json({ error: "Account not verified" });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken(user);
    const safe = await User.findById(user._id).select("-password");
    res.json({ user: safe, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
