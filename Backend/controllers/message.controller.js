import type { Request, Response, NextFunction } from "express"
import { Message } from "../models/message.model"
import { AppError } from "../utils/app-error"
import { catchAsync } from "../utils/catch-async"
import { io } from "../socket"

export const sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { receiverId, content } = req.body
  const senderId = req.user.id

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
  })

  // Emit socket event for real-time message
  io.to(receiverId).emit("newMessage", {
    id: message._id,
    sender: senderId,
    content,
    createdAt: message.createdAt,
  })

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  })
})
import type { Request, Response, NextFunction } from "express"
import { Message } from "../models/message.model"
import { AppError } from "../utils/app-error"
import { catchAsync } from "../utils/catch-async"
import { io } from "../socket"

export const sendMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { receiverId, content } = req.body
  const senderId = req.user.id

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
  })

  // Emit socket event for real-time message
  io.to(receiverId).emit("newMessage", {
    id: message._id,
    sender: senderId,
    content,
    createdAt: message.createdAt,
  })

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  })
})

export const getConversation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params
  const currentUserId = req.user.id

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar")

  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  })
})

export const updateMessageStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { messageId } = req.params
  const { status } = req.body

  const message = await Message.findByIdAndUpdate(messageId, { status }, { new: true })

  if (!message) {
    return next(new AppError("Message not found", 404))
  }

  // Emit socket event for message status update
  io.to(message.sender.toString()).emit("messageStatus", {
    messageId: message._id,
    status,
  })

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  })
})




