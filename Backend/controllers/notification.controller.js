import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ user: userId })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image")
      .sort({ createdAt: -1 });
    
    console.log("Returning notifications:", notifications); // Debug log
    res.status(200).json(notifications); // Return array directly
  } catch (error) {
    console.error("Error in getNotifications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const notification = await Notification.findOneAndDelete({ _id: id, user: userId });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};