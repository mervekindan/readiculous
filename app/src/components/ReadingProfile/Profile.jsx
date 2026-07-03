import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { updateUser } from "../../api/authApi.js";
import { getTodayDate } from "../../utils/date.js";
import { sanitizeNumberInput, sanitizeTextInput } from "../../utils/forms.js";
import { useBooks } from "../../context/BookContext.jsx";
import ReadingStreakSummary from "./ReadingStreakSummary.jsx";
import ProfileSummary from "./ProfileSummary.jsx";
import ProfileForm from "./ProfileForm.jsx";
import AuthMessage from "../AuthMessage/AuthMessage.jsx";
import userIcon from "../../assets/nav-icons/user.png";
import "./Profile.css";

function ReadingProfile() {
  const { user, setUser, logout } = useAuth();
  const [, setSearchParams] = useSearchParams();
  const { readingStreak } = useBooks();

  const today = getTodayDate();
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

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: sanitizeTextInput(user.name),
      dailyGoalMinutes: sanitizeNumberInput(user.dailyGoalMinutes),
      yearlyGoalBooks: sanitizeNumberInput(user.yearlyGoalBooks),
      favoriteGenres: user.favoriteGenres || [],
      avatar: user.avatar || null,
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
        <div className="profile-auth-container">
          <AuthMessage
            icon={userIcon}
            title="Profile"
            message="Access Restricted. Please log in or create an account to view your profile."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="reading-profile">
      <div className="reading-profile-container">
        <div className="reading-profile-header">
          <h1>Profile</h1>
        </div>

        <ProfileSummary
          message={message}
          onEdit={handleEdit}
          onLogout={handleLogout}
        />

        {isEditing && (
          <div className="profile-modal-overlay">
            <div className="profile-modal">
              <div className="profile-modal-header">
                <h2>Edit Profile</h2>

                <button
                  type="button"
                  className="profile-modal-close"
                  onClick={() => setIsEditing(false)}
                >
                  ×
                </button>
              </div>

              <ProfileForm
                onChange={handleChange}
                onSubmit={handleSubmit}
                completedToday={completedToday}
              />
            </div>
          </div>
        )}

        <ReadingStreakSummary />
      </div>
    </section>
  );
}

export default ReadingProfile;
