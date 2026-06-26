import { useAuth } from "../../context/AuthContext";
import "./ProfileSummary.css";

function ProfileSummary({ message, onEdit, onLogout }) {
  const { user } = useAuth();

  return (
    <section className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-user">
          <p className="profile-label">Reader Profile</p>
          <h2>{user.name}</h2>
        </div>

        <div className="profile-buttons">
          <button type="button" onClick={onEdit}>
            Edit Profile
          </button>

          <button type="button" className="logout-button" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>

      <div className="profile-info-grid">
        <div className="profile-info-card">
          <div className="profile-icon">📖</div>

          <div>
            <small>Daily Goal</small>
            <h3>
              {user.dailyGoalMinutes}{" "}
              {user.dailyGoalMinutes === 1 ? "minute" : "minutes"}
            </h3>
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-icon">🎯</div>

          <div>
            <small>Yearly Goal</small>
            <h3>{user.yearlyGoalBooks} books</h3>
          </div>
        </div>

        <div className="profile-info-card profile-genres">
          <div className="profile-icon">❤️</div>

          <div>
            <small>Favorite Genres</small>

            <h3>
              {user.favoriteGenres?.length
                ? user.favoriteGenres.join(", ")
                : "No favorite genres selected"}
            </h3>
          </div>
        </div>
      </div>

      {message && <p className="success-message">{message}</p>}
    </section>
  );
}

export default ProfileSummary;
