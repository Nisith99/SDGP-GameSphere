
import { Message } from "../models/message.js";
import { AppError } from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { io } from "../socket";

import mongoose from "mongoose";
import { getUserSocketId } from "../utils/socket-manager.js";

// Send a message (either to a room or directly to a user)
export const sendMessage = catchAsync(async (req, res, next) => {
  const { receiverId, content, roomId } = req.body;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  if (!content) {
    return next(new AppError("Message content is required", 400));
  }

  const senderId = req.user.id;

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId || null, // Direct message if receiver exists
    content,
    roomId: roomId || null, // Room ID is optional
  });

  // Handle real-time messaging
  if (roomId) {
    io.to(roomId).emit("newRoomMessage", {
      id: message._id,
      sender: senderId,
      content,
      roomId,
      status: message.status,
      createdAt: message.createdAt,
    });
  } else if (receiverId) {
    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        id: message._id,
        sender: senderId,
        content,
        status: message.status,
        createdAt: message.createdAt,
      });
    }
  }

  res.status(201).json({
    status: "success",
    data: { message },
  });
});

// Get messages for a room
export const getRoomMessages = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;

  if (!roomId) {
    return next(new AppError("Room ID is required", 400));
  }

  const messages = await Message.find({ roomId })
    .sort({ createdAt: 1 })
    .populate("sender", "username avatar");

  res.status(200).json({
    status: "success",
    data: { messages },
  });
});

// Get direct conversation between two users
export const getDirectMessages = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  const currentUserId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  const messages = await Message.find({
    roomId: null, // Ensure it's a direct message
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar");

  res.status(200).json({
    status: "success",
    data: { messages },
  });
});

// Join a room (socket logic)
export const joinRoom = (socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });
};

// Update message status (sent, delivered, read)
export const updateMessageStatus = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const { status } = req.body;

  if (!["sent", "delivered", "read"].includes(status)) {
    return next(new AppError("Invalid message status", 400));
  }

  const message = await Message.findByIdAndUpdate(
    messageId,
    { status },
    { new: true }
  );

  if (!message) {
    return next(new AppError("Message not found", 404));
  }

  // Emit socket event for status update
  const senderSocketId = getUserSocketId(message.sender.toString());
  if (senderSocketId) {
    io.to(senderSocketId).emit("messageStatus", {
      messageId: message._id.toString(),
      status,
    });
  }

  res.status(200).json({
    status: "success",
    data: { message },
  });
});
