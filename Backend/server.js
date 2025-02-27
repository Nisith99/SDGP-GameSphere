import express from "express";
import mongoose from "mongoose";
<<<<<<< HEAD
import cors from "cors"; // Fixed typo
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json()); // Don't forget to uncomment this!

dotenv.config();

app.use(cors());
=======
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
>>>>>>> 69028dbe0c19d4f4ca875adcfd22453d05a84bd7

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log("Failed to connect to database", err));

<<<<<<< HEAD
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});
=======
app.listen(process.env.PORT,() => {
    console.log('Server is running on port 3001');
});

app.use("/api/v1/auth", authRoutes)
>>>>>>> 69028dbe0c19d4f4ca875adcfd22453d05a84bd7
