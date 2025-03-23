import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import leagueRoutes from "./routes/league.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import fs from "fs/promises";
import { searchUsers } from "./controllers/user.controller.js";
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(fileUpload());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:5173",
    credentials: true,
  })
);

await fs.mkdir(path.join(__dirname, "uploads/profile"), { recursive: true });
await fs.mkdir(path.join(__dirname, "uploads/banner"), { recursive: true });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Mounting routes...");
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/leagues", leagueRoutes);
app.use("/api/v1/chats", chatRoutes);

app.get("/api/v1/users/search", protectRoute, (req, res) => {
  console.log("Direct /api/v1/users/search route hit with query:", req.query);
  searchUsers(req, res);
});

app.get("/api/v1/test", (req, res) => {
  console.log("Test endpoint hit");
  res.status(200).json({ message: "Server is running" });
});

app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Not Found" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();