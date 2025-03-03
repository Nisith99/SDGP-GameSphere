import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getClubProfileById, getClubProfils } from "../controllers/club.controller.js";

const router = express.Router();


router.get("/", protectRoute, getClubProfils);

router.get("/:clubId", protectRoute, getClubProfileById);

export default router;