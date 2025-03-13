import express from "express";
import { ratingClub, getClubRating, getClubsSortedUsingRating, removeRating } from "../controllers/rating.controller.js";
import { protectRoute, roleRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:clubId/rate", 
    protectRoute, 
    roleRequired(["player"]), 
    ratingClub
);

router.delete("/:clubId/rate", 
    protectRoute, 
    roleRequired(["player"]), 
    removeRating
);

router.get("/:clubId/ratings", protectRoute, getClubRating);

router.get("/sorted", protectRoute, getClubsSortedUsingRating);

export default router;