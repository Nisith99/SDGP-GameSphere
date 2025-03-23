import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getChats, sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", protectRoute, getChats);
router.post("/send", protectRoute, sendMessage);

export default router;