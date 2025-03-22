// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload"; // Add this
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import { connectDB } from "./lib/db.js";
import fs from "fs/promises";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(fileUpload()); // Enable file uploads

// CORS configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:5173",
    credentials: true,
  })
);

// Create uploads directories if they don’t exist
await fs.mkdir(path.join(__dirname, "uploads/profile"), { recursive: true });
await fs.mkdir(path.join(__dirname, "uploads/banner"), { recursive: true });

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Mounting routes...");
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  userRoutes(req, res, next);
});
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});