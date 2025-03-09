import Navbar from "../Components/Navbar";
import { useState } from "react";
import { Bell, Users, CheckCircle, MessageCircle, Flag } from "lucide-react";
import "./Notifications.css";

const notificationsData = [
  { id: 1, type: "trial", message: "You have been invited for a trial at XYZ Club.", time: "30m", unread: true },
  { id: 2, type: "selection", message: "Coach ABC shortlisted you for the next selection round.", time: "1h", unread: true },
  { id: 3, type: "message", message: "New message from Coach DEF.", time: "2h", unread: true },
  { id: 4, type: "invite", message: "XYZ Club has sent you an invitation to join.", time: "4h", unread: false },
  { id: 5, type: "achievement", message: "Congratulations! You have been rated All-Island Level.", time: "1d", unread: false },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");

  const getIcon = (type) => {

    const icons = {
      trial: <Flag className="icon trial" />, 
      selection: <CheckCircle className="icon selection" />, 
      message: <MessageCircle className="icon message" />, 
      club_invite: <Users className="icon club_invite" />, 
      achievement: <Bell className="icon achievement" />, 
    };
    return icons[type] || <Bell className="icon default" />;

  };

  const filteredNotifications = notifications.filter((n) => filter === "all" || n.type === filter);

  return (
    <div className="notifications-container">
      <Navbar />
      <div className="filters">
        {["all", "trial", "selection", "message", "club_invite", "achievement"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`filter-button ${filter === category ? "active" : ""}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.unread ? "unread" : ""}`}>
              <div className="icon-wrapper">{getIcon(notification.type)}</div>
              <div className="notification-content">
                <p className="message">{notification.message}</p>
                <p className="time">{notification.time}</p>
              </div>
              {notification.unread && <span className="unread-indicator"></span>}
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
