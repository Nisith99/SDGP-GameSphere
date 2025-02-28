import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Fixed typo
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json()); // Don't forget to uncomment this!

dotenv.config();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log("Failed to connect to database", err));


app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});

app.listen(process.env.PORT,() => {
    console.log('Server is running on port 3001');
});

app.use("/api/v1/auth", authRoutes)

