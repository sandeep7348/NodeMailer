import express from "express";
import { createChat, getChat, listChatsByUser, updateChat, deleteChat } from "../controllers/chat.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, createChat);
router.get("/user/:userId", listChatsByUser);
router.get("/:id", getChat);
router.put("/:id", requireAuth, updateChat);
router.delete("/:id", requireAuth, deleteChat);

export default router;
