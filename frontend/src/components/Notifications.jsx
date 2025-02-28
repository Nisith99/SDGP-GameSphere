import { useState } from "react";
import { Bell, Users, CheckCircle, MessageCircle, Flag } from "lucide-react";

const notificationsData = [
  { id: 1, type: "trial", message: "You have been invited for a trial at XYZ Club.", time: "30m", unread: true },
  { id: 2, type: "selection", message: "Coach ABC shortlisted you for the next selection round.", time: "1h", unread: true },
  { id: 3, type: "message", message: "New message from Coach DEF.", time: "2h", unread: true },
  { id: 4, type: "club_invite", message: "XYZ Club has sent you an invitation to join.", time: "4h", unread: false },
  { id: 5, type: "achievement", message: "Congratulations! You have been rated All-Island Level.", time: "1d", unread: false },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");

  const getIcon = (type) => {
    switch (type) {
      case "trial":
        return <Flag className="text-blue-500" />;
      case "selection":
        return <CheckCircle className="text-green-500" />;
      case "message":
        return <MessageCircle className="text-purple-500" />;
      case "club_invite":
        return <Users className="text-yellow-500" />;
      case "achievement":
        return <Bell className="text-orange-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === "all" || n.type === filter
  );

  return (
    <div className="min-h-screen bg-gray-0 p-10 flex flex-col items-center">
      
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {["all", "trial", "selection", "message", "club_invite", "achievement"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg transition ${
                filter === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center p-4 border-b ${
                notification.unread ? "bg-blue-100" : "bg-white"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                {getIcon(notification.type)}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {notification.unread && <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>}
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
