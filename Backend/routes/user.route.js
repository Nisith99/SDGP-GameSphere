import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.put("/profile", protectRoute, updateUserProfile);

export default router;