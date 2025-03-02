import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to database successfully"))
.catch(err => console.log("❌ Failed to connect to database", err));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes); // ✅ Added post routes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
