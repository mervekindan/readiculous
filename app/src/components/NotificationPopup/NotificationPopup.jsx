import { useBooks } from "../../context/BookContext";
import "./NotificationPopup.css";

export default function NotificationPopup() {
  const { notification, setNotification } = useBooks();

  if (!notification) return null;

  return (
    <div className={`popup-toast ${notification.type}`}>
      <span className="popup-message">{notification.message}</span>
      <button className="popup-close-btn" onClick={() => setNotification(null)}>
        ✕
      </button>
    </div>
  );
}
