import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getLeagues, joinLeague, getLeagueDetails } from "../controllers/league.controller.js";

const router = express.Router();

router.get("/", protectRoute, getLeagues);
router.get("/:leagueName", protectRoute, getLeagueDetails);
router.post("/join/:leagueId", protectRoute, joinLeague);

export default router;