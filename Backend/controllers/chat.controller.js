import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name username profilePicture")
      .sort({ updatedAt: -1 });

    const formattedChats = chats.map((chat) => {
      const otherUser = chat.participants.find(p => p._id.toString() !== userId.toString());
      return {
        _id: chat._id,
        user: otherUser,
        messages: chat.messages,
      };
    });

    res.status(200).json(formattedChats);
  } catch (error) {
    console.error("Error in getChats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user._id;

    if (!recipientId || !content) {
      return res.status(400).json({ message: "Recipient ID and content are required" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [senderId, recipientId],
        messages: [],
      });
    }

    const newMessage = {
      sender: senderId,
      content,
      createdAt: new Date(),
    };
    chat.messages.push(newMessage);
    await chat.save();

    // Create notification for the recipient
    const notification = new Notification({
      user: recipientId,
      type: "message",
      relatedUser: senderId,
    });
    await notification.save();

    res.status(200).json({ message: "Message sent successfully", chat });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};