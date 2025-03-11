import express from "express";
import mongoose from "mongoose";

import cors from "cors"; // Fixed typo
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import notifyRoute from "./routes/notifications.route.js"
import userRoutes from "./routes/user.route.js"
import playerRoutes from "./routes/player.route.js"
import clubRoutes from "./routes/club.route.js"
import ratingRoutes from "./routes/rating.route.js"
import postRoutes from "./routes/post.route.js"

const app = express();
app.use(express.json()); // Don't forget to uncomment this!

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log("Failed to connect to database", err));


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/notify", notifyRoute)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/player", playerRoutes)
app.use("/api/v1/club", clubRoutes)
app.use("/api/v1/rating", ratingRoutes)
app.use("/api/v1/post",postRoutes)

