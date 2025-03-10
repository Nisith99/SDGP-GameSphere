import { Message } from "../models/message.model";
import { AppError } from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { io } from "../socket";
import mongoose from "mongoose";
import { getUserSocketId } from "../utils/socket-manager";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { receiverId, content } = req.body;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  const senderId = req.user.id;
  
  if (!receiverId || !content) {
    return next(new AppError("Receiver ID and content are required", 400));
  }

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
  });

  // Emit socket event for real-time message
  const receiverSocketId = getUserSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", {
      id: message._id,
      sender: senderId,
      content,
      createdAt: message.createdAt,
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const getConversation = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  const currentUserId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  const messages = await Message.find({
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
    data: {
      messages,
    },
  });
});

export const updateMessageStatus = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const { status } = req.body;

  if (!["sent", "delivered", "read"].includes(status)) {
    return next(new AppError("Invalid message status", 400));
  }

  const message = await Message.findByIdAndUpdate(messageId, { status }, { new: true });

  if (!message) {
    return next(new AppError("Message not found", 404));
  }

  // Emit socket event for message status update
  if (message.sender) {
    const senderSocketId = getUserSocketId(message.sender.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageStatus", {
        messageId: message._id.toString(),
        status,
      });
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});
