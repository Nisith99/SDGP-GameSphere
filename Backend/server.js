import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import playerRoutes from "./routes/player.route.js";
import clubRoutes from "./routes/club.route.js";
import ratingRoutes from "./routes/rating.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conncted to database successfuly"))
.catch(err => console.log("Faild to connect to database",err))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/player", playerRoutes)
app.use("/api/v1/club", clubRoutes)
app.use("/api/v1/rating", ratingRoutes)