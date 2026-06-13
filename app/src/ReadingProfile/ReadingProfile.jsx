import { useState } from "react";
import "./ReadingProfile.css";

function ReadingProfile() {
  const [profile, setProfile] = useState({
    name: "",
    dailyGoalMinutes: "",
    yearlyGoalBooks: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(profile);
  }

  return (
    <section className="reading-profile">
      <h1>Reading Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            type="text"
          />
        </label>

        <label>
          Daily reading goal (minutes)
          <input
            name="dailyGoalMinutes"
            value={profile.dailyGoalMinutes}
            onChange={handleChange}
            type="number"
          />
        </label>

        <label>
          Yearly book goal
          <input
            name="yearlyGoalBooks"
            value={profile.yearlyGoalBooks}
            onChange={handleChange}
            type="number"
          />
        </label>

        <label>
          Favorite genres
          <input
            name="favoriteGenres"
            value={profile.favoriteGenres}
            onChange={handleChange}
            type="text"
            placeholder="Mystery, fantasy, classic..."
          />
        </label>

        <button type="submit">Save Profile</button>
      </form>
    </section>
  );
}

export default ReadingProfile;
