import express from "express";
import { getPlayerProfils, getPlayerProfileById } from "../controllers/player.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", protectRoute, getPlayerProfils);

router.get("/:playerId", protectRoute, getPlayerProfileById);

export default router;