import Chat from "../models/chat.models.js";

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create(req.body);
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate("user", "username email");
    if (!chat) return res.status(404).json({ error: "Not found" });
    res.json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listChatsByUser = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.params.userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chat) return res.status(404).json({ error: "Not found" });
    res.json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
