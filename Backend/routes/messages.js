import express from 'express';
import Message from '../models/message.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get messages for a specific room or between users
router.get('/:roomId', protectRoute, async (req, res) => {
  try {
    const query = req.params.roomId ?
      { roomId: req.params.roomId } :
      {
        $or: [
          { sender: req.user._id },
          { receiver: req.user._id }
        ]
      };

    const messages = await Message.find(query)
      .populate('sender', 'userName profilePicture')
      .populate('receiver', 'userName profilePicture')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a new message
router.post('/', protectRoute, async (req, res) => {
  const message = new Message({
    sender: req.user._id,
    receiver: req.body.receiverId,
    content: req.body.content,
    roomId: req.body.roomId || null
  });

  try {
    const newMessage = await message.save();
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'userName profilePicture')
      .populate('receiver', 'userName profilePicture');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;