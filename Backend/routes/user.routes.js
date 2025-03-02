import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login user
router.get("/:id", getUser); // Get user details

export default router;
