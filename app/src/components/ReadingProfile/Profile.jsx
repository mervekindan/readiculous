import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import ProfileSummary from "./ProfileSummary.jsx";
import ProfileForm from "./ProfileForm.jsx";
import { Link } from "react-router-dom";

function ReadingProfile() {
  const { user, setUser, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(user);

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
      ...user,
      name: profile.name.trim(),
      dailyGoalMinutes: Number(profile.dailyGoalMinutes),
      yearlyGoalBooks: Number(profile.yearlyGoalBooks),
    };

    setUser(updatedProfile);
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
        <p>You're not logged in.</p>
        <p>Please sign up or log in to view your profile.</p>

        <Link to="/" className="profile-auth-link">
          Go to Sign Up / Login
        </Link>
      </section>
    );
  }

  return (
    <section className="reading-profile">
      <h1>Profile</h1>

      {!isEditing ? (
        <ProfileSummary
          user={user}
          message={message}
          onEdit={handleEdit}
          onLogout={handleLogout}
        />
      ) : (
        <ProfileForm
          profile={profile}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}

export default ReadingProfile;
