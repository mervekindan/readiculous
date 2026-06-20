function ProfileSummary({ user, message, onEdit, onLogout }) {
  return (
    <div className="profile-summary">
      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Daily goal:</strong> {user.dailyGoalMinutes} minutes
      </p>

      <p>
        <strong>Yearly goal:</strong> {user.yearlyGoalBooks} books
      </p>
      <p>
        <strong>Favorite Genres:</strong>{" "}
        {user.favoriteGenres?.length
          ? user.favoriteGenres.join(", ")
          : "No favorite genres selected"}
      </p>

      <div className="profile-actions">
        <button type="button" onClick={onEdit}>
          Edit Profile
        </button>

        <button type="button" className="logout-button" onClick={onLogout}>
          Log Out
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default ProfileSummary;
