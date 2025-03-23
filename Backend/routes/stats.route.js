import express from "express";
import { getAllUserStats, getTestUserStats} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

console.log("stats.route.js loaded");

// Main endpoint to get all user stats - protected by auth middleware
router.get("/", protectRoute, getAllUserStats);

// Public test endpoint for development
router.get("/test", getTestUserStats);


export default router;