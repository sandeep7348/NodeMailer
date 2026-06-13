
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
    },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    verificationTokenExpires: { type: Date, select: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) throw new Error("Password not selected");
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.verificationToken;
  delete obj.verificationTokenExpires;
  return obj;
};

const User = model("User", userSchema);

export default User;


