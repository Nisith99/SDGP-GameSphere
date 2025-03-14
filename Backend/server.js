import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import playerRoutes from "./routes/player.route.js";
import clubRoutes from "./routes/club.route.js";
import ratingRoutes from "./routes/rating.route.js";
import messageRoutes from "./routes/messages.js";
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log("Failed to connect to database", err));

const PORT = process.env.PORT || 3001;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (roomId) => {
    socket.join(roomId);
  });

  socket.on('message', async (messageData) => {
    try {
      const message = new Message({
        sender: messageData.senderId,
        receiver: messageData.receiverId,
        content: messageData.content,
        roomId: messageData.roomId
      });

      const savedMessage = await message.save();
      const populatedMessage = await Message.findById(savedMessage._id)
        .populate('sender', 'userName profilePicture')
        .populate('receiver', 'userName profilePicture');

      io.to(messageData.roomId).emit('message', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/player", playerRoutes)
app.use("/api/v1/club", clubRoutes)
app.use("/api/v1/rating", ratingRoutes)
app.use("/api/v1/messages", messageRoutes);