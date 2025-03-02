import express from "express";
import {signup, login, selectRole, getCurrentUser, getProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/role", selectRole);
router.post("/profile", getProfile);
router.get("/me", protectRoute, getCurrentUser)

export default router;