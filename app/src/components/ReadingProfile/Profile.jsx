import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import ProfileSummary from "./ProfileSummary.jsx";
import ProfileForm from "./ProfileForm.jsx";
import { Link } from "react-router-dom";
import { sanitizeNumberInput, sanitizeTextInput } from "../../utils/forms.js";
import { getTodayDate } from "../../utils/date.js";
import { useBooks } from "../../context/BookContext.jsx";
import ReadingStreakSummary from "./ReadingStreakSummary.jsx";

function ReadingProfile() {
  const { user, setUser, logout } = useAuth();
  const today = getTodayDate();
  const { readingStreak } = useBooks();
  const completedToday = readingStreak?.lastCompletedDate === today;

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked } = event.target;

    if (name === "favoriteGenres") {
      const currentGenres = user.favoriteGenres || [];

      setUser({
        ...user,
        favoriteGenres: checked
          ? [...currentGenres, value]
          : currentGenres.filter((genre) => genre !== value),
      });

      return;
    }

    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleEdit() {
    setIsEditing(true);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: sanitizeTextInput(user.name),
      dailyGoalMinutes: sanitizeNumberInput(user.dailyGoalMinutes),
      yearlyGoalBooks: sanitizeNumberInput(user.yearlyGoalBooks),
      favoriteGenres: user.favoriteGenres || [],
    };

    setUser(updatedUser);
    setIsEditing(false);
    setMessage("Profile updated successfully!");
  }

  function handleLogout() {
    logout();
    setIsEditing(false);
    setMessage("");
  }

  if (!user) {
    return (
      <section className="reading-profile">
        <h1>Profile</h1>

        <p>Please sign up or log in to view your profile.</p>

        <div className="profile-auth-actions">
          <Link to="/?auth=signup">Sign Up</Link>
          <span> / </span>
          <Link to="/?auth=login">Login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="reading-profile">
      <h1>Profile</h1>

      {!isEditing ? (
        <ProfileSummary
          message={message}
          onEdit={handleEdit}
          onLogout={handleLogout}
        />
      ) : (
        <ProfileForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          completedToday={completedToday}
        />
      )}

      <ReadingStreakSummary />
    </section>
  );
}

export default ReadingProfile;
