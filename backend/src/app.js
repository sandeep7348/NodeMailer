import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.json({ status: "ok", message: "Backend server is running" });
});


app.get("/health", (req, res) => {
	res.json({ uptime: process.uptime(), timestamp: Date.now() });
});


app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

export default app;
