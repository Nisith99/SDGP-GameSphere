import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Fixed typo
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import notifyRoute from "./routes/notifications.route.js"


const app = express();
app.use(express.json()); // Don't forget to uncomment this!

dotenv.config();

app.use(cors());




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


app.listen(process.env.PORT,() => {
    console.log('Server is running on port 3001');
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/notify", notifyRoute)