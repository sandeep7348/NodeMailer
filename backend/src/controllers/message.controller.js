import Message from "../models/message.models.js";

export const createMessage = async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id).populate("chat");
    if (!msg) return res.status(404).json({ error: "Not found" });
    res.json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listMessagesByChat = async (req, res) => {
  try {
    const msgs = await Message.find({ chat: req.params.chatId }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
