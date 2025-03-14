import { useState } from "react";
import { Bell, MessageSquare, ThumbsUp, Share2, Eye, Trash2 } from "lucide-react";
import "./Notifications.css";

const initialNotifications = [
  { id: 1, type: "comment", user: "Olivia Pearson", message: "commented on your post", time: "2 minutes ago", read: false, postText: "Confirming with the lads Claude can't replace us!" },
  { id: 2, type: "comment", user: "Beth Doe", message: "commented on your post", time: "11 minutes ago", read: false, postText: "Today Jeff was explaining why he sucks at coding on a whiteboard! 😆" },
  { id: 3, type: "like", user: "John Doe", message: "liked your post", time: "1 day ago", read: true, postText: "Hello world!" },
  { id: 4, type: "share", user: "Alex Smith", message: "shared your post", time: "3 days ago", read: true, postText: "Great content! 🎉" },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    const icons = {
      like: <ThumbsUp className="icon like" />,
      comment: <MessageSquare className="icon comment" />,
      share: <Share2 className="icon share" />,
    };
    return icons[type] || <Bell className="icon default" />;
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
              <div className="icon-wrapper">{getIcon(notification.type)}</div>
              <div className="notification-content">
                <p>
                  <strong>{notification.user}</strong> {notification.message}
                </p>
                <span className="time">{notification.time}</span>
                {notification.postText && <div className="related-post">{notification.postText}</div>}
              </div>
              <div className="actions">
                {!notification.read && (
                  <button className="mark-read" onClick={() => markAsRead(notification.id)}>
                    <Eye size={16} />
                  </button>
                )}
                <button className="delete" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
