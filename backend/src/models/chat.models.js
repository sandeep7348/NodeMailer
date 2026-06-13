import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

export default Chat;
