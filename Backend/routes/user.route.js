// backend/routes/user.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  getSuggestedConnections, 
  getPublicProfile, 
  updateProfile, 
  rateUser, 
  getUserRatings
} from "../controllers/user.controller.js";

const router = express.Router();

console.log("user.route.js loaded");

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
router.post("/rate/:userId", protectRoute, rateUser);
router.get("/ratings/:username", protectRoute, getUserRatings);
//router.put("/profile", protect, updateProfile);

export default router;