const NotificationItem = ({ notification, markAsRead }) => {
    return (
        <div className={`notification-item ${notification.read ? "read" : "unread"}`} 
             onClick={() => markAsRead(notification._id)}>
            <span className="icon">🔔</span>
            <p>{notification.message}</p>
            {!notification.read && <span className="badge">New</span>}
        </div>
    );
};

export default NotificationItem;
