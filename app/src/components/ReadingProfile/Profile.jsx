import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";

function ReadingProfile() {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState(
    user || {
      name: "",
      dailyGoalMinutes: "",
      yearlyGoalBooks: "",
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handleEdit() {
    setProfile(user);
    setIsEditing(true);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedProfile = {
      name: profile.name.trim(),
      dailyGoalMinutes: Number(profile.dailyGoalMinutes),
      yearlyGoalBooks: Number(profile.yearlyGoalBooks),
    };

    setUser(updatedProfile);
    localStorage.setItem("readingUser", JSON.stringify(updatedProfile));

    setIsEditing(false);
    setMessage("Profile updated successfully!");
  }

  function handleLogout() {
    setUser(null);
    setIsEditing(false);
    setMessage("");
  }

  if (!user) {
    return (
      <section className="reading-profile">
        <h1>Profile</h1>
        <p>You're not logged in.</p>
        <p>Please sign up or log in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="reading-profile">
      <h1>Profile</h1>

      {!isEditing ? (
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
          <div className="profile-actions">
            <button type="button" onClick={handleEdit}>
              Edit Profile
            </button>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>

          {message && <p className="success-message">{message}</p>}
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </label>

          <label>
            Daily reading goal (minutes)
            <input
              name="dailyGoalMinutes"
              type="number"
              min="1"
              max="300"
              value={profile.dailyGoalMinutes}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Yearly book goal
            <input
              name="yearlyGoalBooks"
              type="number"
              min="1"
              max="100"
              value={profile.yearlyGoalBooks}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </section>
  );
}

export default ReadingProfile;
