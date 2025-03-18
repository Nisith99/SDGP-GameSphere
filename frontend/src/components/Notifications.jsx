import { useState } from "react";
import { Home, Users, Bell, LogOut, Info, Eye, Trash2, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import "./Notifications.css";
import { Footer } from "../Components/footer";

const initialNotifications = [
  {
    id: 1,
    type: "comment",
    user: {
      name: "Olivia Pearson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    message: "commented on your match performance",
    time: "2 minutes ago",
    read: false,
    postText: "Great goal in yesterday's derby match!",
  },
  {
    id: 2,
    type: "like",
    user: {
      name: "Beth Doe",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    message: "liked your training video",
    time: "11 minutes ago",
    read: true,
    postText: "Amazing 3-pointers in practice! 🏀",
  },
  {
    id: 3,
    type: "share",
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    message: "shared your sprint record",
    time: "1 day ago",
    read: true,
    postText: "New club record: 100m in 10.2s! 🏃♂️"
  },
  {
    id: 4,
    type: "event",
    user: {
      name: "Alex Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    message: "invited you to weedkend tournament",
    time: "3 days ago",
    read: true,
    postText: "Grand Slam Qualifiers - Register Now! 🎾"
  }
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
      like: <ThumbsUp className="nav-icon" />,
      comment: <MessageSquare className="nav-icon" />,
      share: <Share2 className="nav-icon" />,
    };
    return icons[type] || <Bell className="nav-icon" />;
  };

  return (
    <div className="container">
      {/* Left Sidebar */}
      <div className="sidebar">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-content">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="Marcus Holloway"
              className="profile-image"
            />
            <h2 className="profile-name">Marcus Holloway</h2>
            <p className="profile-title">Football Coach</p>
            <p className="profile-connections">96 connections</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <a href="#" className="nav-link">
            <Home className="nav-icon" />
            Home
          </a>
          <a href="#" className="nav-link">
            <Users className="nav-icon" />
            My Network
          </a>
          <a href="#" className="nav-link active">
            <Bell className="nav-icon" />
            Notifications
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1 className="header-title">Notifications</h1>
          <div className="header-actions">
            <button className="icon-button">
              <Info className="nav-icon" />
            </button>
            <button className="icon-button">
              <LogOut className="nav-icon" />
            </button>
          </div>
        </header>

        <div className="notifications-container">
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="notification-avatar"
                  />
                  <div className="notification-content">
                    <div className="notification-header">
                      <div>
                        <p className="notification-text">
                          <span className="notification-name">{notification.user.name}</span>
                          {' '}{notification.message}
                        </p>
                        <p className="notification-time">{notification.time}</p>
                        {notification.postText && (
                          <div className="notification-post-text">{notification.postText}</div>
                        )}
                      </div>
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
                    {notification.postImage && (
                      <div className="notification-image">
                        <img
                          src={notification.postImage}
                          alt="Post"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-notifications">No notifications available.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;