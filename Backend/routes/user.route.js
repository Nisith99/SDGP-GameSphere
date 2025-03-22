import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
  searchUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

console.log("user.route.js loaded");

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);
router.get("/search", protectRoute, (req, res, next) => {
  console.log("Search endpoint hit with query:", req.query.q);
  searchUsers(req, res, next);
});

export default router;