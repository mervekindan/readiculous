import { useAuth } from "../../context/AuthContext";
import "./ProfileSummary.css";
import medalIcon from "../../assets/nav-icons/medal.png";
import bookIcon from "../../assets/nav-icons/book.png";
import timeIcon from "../../assets/nav-icons/time.png";

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
          <div className="profile-icon">
            <img src={timeIcon} alt="Daily goal" />
          </div>

          <div>
            <small>Daily Goal</small>
            <h3>
              {user.dailyGoalMinutes}{" "}
              {user.dailyGoalMinutes === 1 ? "minute" : "minutes"}
            </h3>
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-icon">
            <img src={medalIcon} alt="Yearly goal" />
          </div>

          <div>
            <small>Yearly Goal</small>
            <h3>{user.yearlyGoalBooks} books</h3>
          </div>
        </div>

        <div className="profile-info-card profile-genres">
          <div className="profile-icon">
            <img src={bookIcon} alt="Favorite genres" />
          </div>

          <div>
            <small>Favorite Genres</small>

            <div className="genre-tags">
              {user.favoriteGenres?.length ? (
                user.favoriteGenres.map((genre) => (
                  <span key={genre} className="genre-tag">
                    {genre}
                  </span>
                ))
              ) : (
                <span className="no-genres">No favorite genres selected</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {message && <p className="success-message">{message}</p>}
    </section>
  );
}

export default ProfileSummary;
