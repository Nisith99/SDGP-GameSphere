import PropTypes from "prop-types";
import "../styles/NotificationItem.css"; // Import CSS

const NotificationItem = ({ notification }) => {
    return (
        <div className="notification-item">
            <div className="notification-icon">🔔</div>
            <div>
                <p className="notification-message font-semibold">{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
            </div>
        </div>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
};

export default NotificationItem;
