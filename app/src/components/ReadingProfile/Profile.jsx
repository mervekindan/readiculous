import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import ProfileSummary from "./ProfileSummary.jsx";
import ProfileForm from "./ProfileForm.jsx";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUser } from "../../api/authApi.js";
import { getTodayDate } from "../../utils/date.js";
import { sanitizeNumberInput, sanitizeTextInput } from "../../utils/forms.js";

function ReadingProfile() {
  const { user, setUser, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const today = getTodayDate();
  const completedToday = user?.readingStreak?.lastCompletedDate === today;

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  function handleSignUp() {
    setSearchParams({ auth: "signup" });
  }

  function handleLogin() {
    setSearchParams({ auth: "login" });
  }

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

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: sanitizeTextInput(user.name),
      dailyGoalMinutes: sanitizeNumberInput(user.dailyGoalMinutes),
      yearlyGoalBooks: sanitizeNumberInput(user.yearlyGoalBooks),
      favoriteGenres: user.favoriteGenres || [],
    };

    try {
      const savedUser = await updateUser(user.id, updatedUser);

      setUser(savedUser);
      setIsEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Unable to update profile. Please try again.");
    }
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
          <button type="button" onClick={handleSignUp}>Sign Up</button>
          <button type="button" onClick={handleLogin}>Login</button>
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
    </section>
  );
}

export default ReadingProfile;
