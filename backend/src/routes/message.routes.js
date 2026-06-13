import express from "express";
import { createMessage, getMessage, listMessagesByChat } from "../controllers/message.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, createMessage);
router.get("/chat/:chatId", listMessagesByChat);
router.get("/:id", getMessage);

export default router;
