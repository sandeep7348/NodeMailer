import express from "express";
import { register, login, verifyUser, resendVerification } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resend-verification", resendVerification);
router.get("/verify/:token", verifyUser);

export default router;
