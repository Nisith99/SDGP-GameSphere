import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
  rateUser,
  getUserRatings,
} from "../controllers/user.controller.js";

const router = express.Router();

console.log("user.route.js loaded");

// Public route for profile access (no authentication required)
router.get("/public/:username", getPublicProfile);

// Protected routes (require authentication)
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile); // Keep this for authenticated access if needed
router.put("/profile", protectRoute, updateProfile);
router.post("/rate/:userId", protectRoute, rateUser);
router.get("/ratings/:username", protectRoute, getUserRatings);

export default router;