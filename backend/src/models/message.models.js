import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    content: { type: String, required: true },
    role: { type: String, enum: ["user", "ai"], required: true, default: "user" },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
