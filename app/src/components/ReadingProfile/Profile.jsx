import { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";

function ReadingProfile() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState(
    user || {
      name: "",
      yearlyGoalBooks: "",
    },
  );
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedProfile = {
      name: profile.name.trim(),
      yearlyGoalBooks: Number(profile.yearlyGoalBooks),
    };

    setUser(updatedProfile);
    localStorage.setItem("readingUser", JSON.stringify(updatedProfile));
    setMessage("Profile saved successfully!");
  }

  return (
    <section className="reading-profile">
      <h1>Profile</h1>

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

        <button type="submit">Save Profile</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </section>
  );
}

export default ReadingProfile;
