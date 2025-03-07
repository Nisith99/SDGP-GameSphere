import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { updateUserProfile , getProfile} from '../controllers/user.controller.js';

const router = express.Router();

router.put("/profile", protectRoute, updateUserProfile);
router.get("/profile/:userId", protectRoute, getProfile);

export default router;