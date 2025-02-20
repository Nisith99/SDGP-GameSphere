import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import NotificationItem from "./NotificationItem";
import "../styles/Notifications.css"; // Import CSS

const socket = io("http://localhost:3001");

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

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

    return (
        <div className="notification-container mx-auto">
            <h2 className="notification-title">🔔 Notifications</h2>
            {notifications.length === 0 ? (
                <p className="notification-empty">No notifications yet!</p>
            ) : (
                <div>
                    {notifications.map(n => (
                        <NotificationItem key={n._id} notification={n} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
