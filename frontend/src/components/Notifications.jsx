import { useEffect, useState } from "react";
import { Home, Users, Bell, LogOut, Info, Eye, Trash2, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import "./Notifications.css";
import { Footer } from "../Components/footer";
import Navbar from "../Components/Navbar"; // Ensure correct import

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      });
  }, []);

  const markAsRead = (id) => {
    fetch(`/api/notifications/${id}/read`, { method: "PATCH" })
      .then(() => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
      });
  };

  const deleteNotification = (id) => {
    fetch(`/api/notifications/${id}`, { method: "DELETE" })
      .then(() => {
        setNotifications(notifications.filter((n) => n.id !== id));
      });
  };

  const getIcon = (type) => {
    const icons = {
      like: <ThumbsUp className="nav-icon" />,
      comment: <MessageSquare className="nav-icon" />,
      share: <Share2 className="nav-icon" />,
    };
    return icons[type] || <Bell className="nav-icon" />;
  };

  return (
    <div className="container">
      <Navbar /> {/* Include Navbar */}
      <div className="main-content">
        <header className="header">
          <h1 className="header-title">Notifications</h1>
        </header>

        <div className="notifications-container">
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications.length > 0 ? (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
                  <img src={notification.user.avatar} alt={notification.user.name} className="notification-avatar" />
                  <div className="notification-content">
                    <p className="notification-text">
                      <span className="notification-name">{notification.user.name}</span> {notification.message}
                    </p>
                    <p className="notification-time">{notification.time}</p>
                    {notification.postText && <div className="notification-post-text">{notification.postText}</div>}
                    <div className="notification-actions">
                      {!notification.read && (
                        <button className="action-button read" onClick={() => markAsRead(notification.id)}>
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button className="action-button delete" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-notifications">No notifications available.</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
