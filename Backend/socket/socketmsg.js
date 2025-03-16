import express from "express";
import {
  sendMessage,
  getRoomMessages,
  getDirectMessages,
  updateMessageStatus,
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // Ensure authentication

const router = express.Router();

// Get messages for a specific room
router.get("/room/:roomId", protect, getRoomMessages);

// Get direct messages between two users
router.get("/user/:userId", protect, getDirectMessages);

// Send a new message (either direct or room)
router.post("/", protect, sendMessage);

// Update message status
router.patch("/:messageId/status", protect, updateMessageStatus);

export default router;
