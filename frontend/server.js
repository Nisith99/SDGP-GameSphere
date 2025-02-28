const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const notificationRoutes = require("./routes/notifications");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL }
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("sendNotification", (notification) => {
        io.emit("receiveNotification", notification);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect", err));

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
