import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
  rateUser,
  getUserRatings,
  searchUsers
} from "../controllers/user.controller.js";

const router = express.Router();

console.log("Initializing user routes");

// Public route
router.get("/public/:username", getPublicProfile);

// Protected routes
router.get("/suggestions", protectRoute, getSuggestedConnections);
// Place the search route BEFORE the username parameter route to prevent conflicts
router.get("/search", protectRoute, searchUsers);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
router.post("/rate/:userId", protectRoute, rateUser);
router.get("/ratings/:username", protectRoute, getUserRatings);

export default router;