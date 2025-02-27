import express from "express";
import {signup, login, selectRole, getProfile} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/role", selectRole);
router.post("/profile", getProfile);

export default router;