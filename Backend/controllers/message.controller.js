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


