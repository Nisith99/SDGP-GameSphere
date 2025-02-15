import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const app = express();

dotenv.config();

app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conncted to database successfuly"))
.catch(err => console.log("Faild to connect to database",err))

app.listen(process.env.PORT,() => {
    console.log('Server is running on port 3001');
});