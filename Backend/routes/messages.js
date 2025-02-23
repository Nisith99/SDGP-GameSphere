import express from 'express';
import Message from '../models/Message.js';  // Note the capital M and .js extension

const router = express.Router();

// Get messages for a specific room
router.get('/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .populate('sender', 'username avatar teamBadge')
      .populate('receiver', 'username avatar teamBadge')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.body.senderId,
    receiver: req.body.receiverId,
    content: req.body.content,
    roomId: req.body.roomId
  });

  try {
    const newMessage = await message.save();
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'username avatar teamBadge')
      .populate('receiver', 'username avatar teamBadge');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;