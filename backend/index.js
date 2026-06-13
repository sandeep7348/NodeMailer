import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT ?? 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	console.error("Missing MONGO_URI in environment. Add it to backend/.env or your process env.");
	process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB:", error);
		process.exit(1);
	});

mongoose.connection.on("error", (error) => {
	console.error("MongoDB connection error:", error);
});
