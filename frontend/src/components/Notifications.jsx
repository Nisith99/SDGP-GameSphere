import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import NotificationItem from "./NotificationItem";
import "../styles/Notifications.css";

// Connect to Socket.IO server
const socket = io("http://localhost:3001");

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all"); // 'all' | 'unread' | 'mentions'

    useEffect(() => {
        fetchNotifications();

        socket.on("receiveNotification", (newNotification) => {
            setNotifications((prev) => [newNotification, ...prev]);
        });

        return () => socket.off("receiveNotification");
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/notifications/${userId}`);
            setNotifications(res.data);
        } catch (err) {
            console.error("Error fetching notifications", err);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/notifications/${id}/read`);
            setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error("Error marking notification as read", err);
        }
    };

    const filteredNotifications = notifications.filter(n => 
        filter === "all" ? true : filter === "unread" ? !n.read : n.type === "mention"
    );

    return (
        <div className="notification-container">
            <h2>🔔 Notifications</h2>
            <div className="filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("unread")}>Unread</button>
                <button onClick={() => setFilter("mentions")}>Mentions</button>
            </div>
            {filteredNotifications.length === 0 ? (
                <p>No notifications!</p>
            ) : (
                filteredNotifications.map(n => (
                    <NotificationItem key={n._id} notification={n} markAsRead={markAsRead} />
                ))
            )}
        </div>
    );
};

export default Notifications;
