const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Mark notification as read
router.put("/:id", async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ message: "Notification marked as read" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
