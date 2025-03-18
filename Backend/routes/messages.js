import express from 'express';
import Message from '../models/message.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

const router = express.Router();

// Get messages for a specific room or between users
router.get('/:roomId', protectRoute, async (req, res) => {
  try {
    const query = req.params.roomId
      ? { roomId: req.params.roomId } // Query for messages in a specific room
      : {
          $or: [
            { sender: req.user._id }, // Query for messages where the user is the sender
            { receiver: req.user._id }, // Query for messages where the user is the receiver
          ],
        };

    const messages = await Message.find(query)
      .populate('sender', 'userName profilePicture') // Populate sender details
      .populate('receiver', 'userName profilePicture') // Populate receiver details
      .sort({ timestamp: 1 }); // Sort messages by timestamp (oldest first)

    res.json(messages); // Send the messages in the response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// Send a new message
router.post('/', protectRoute, async (req, res) => {
  const { receiverId, content, roomId } = req.body;

  // Validate receiverId (check if it's a valid ObjectId if provided)
  if (receiverId && !mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({ message: 'Invalid receiver ID format' });
  }

  const message = new Message({
    sender: req.user._id, // Sender is the authenticated user
    receiver: receiverId || null, // Receiver can be null if it's a room message
    content,
    roomId: roomId || null, // Room ID is optional
  });

  try {
    // Save the new message to the database
    const newMessage = await message.save();

    // Populate sender and receiver details in the response
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'userName profilePicture')
      .populate('receiver', 'userName profilePicture');

    // Respond with the populated message
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
});

// Update message status (optional, for cases like 'sent', 'delivered', 'read')
router.patch('/:messageId/status', protectRoute, async (req, res) => {
  const { status } = req.body;

  if (!['sent', 'delivered', 'read'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Update message status
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.messageId,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Respond with the updated message
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get direct messages between two users (optional endpoint for direct conversation)
router.get('/direct/:userId', protectRoute, async (req, res) => {
  const { userId } = req.params;

  // Validate userId (check if it's a valid ObjectId)
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    // Find messages between the authenticated user and the specified user
    const messages = await Message.find({
      roomId: null, // Only direct messages (no room ID)
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate('sender', 'userName profilePicture')
      .populate('receiver', 'userName profilePicture')
      .sort({ timestamp: 1 });

    res.status(200).json(messages); // Send the direct messages in the response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

export default router;
