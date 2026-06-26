import { useState } from "react";
import { GENRE_CATEGORIES } from "../../utils/genres";
import { useAuth } from "../../context/AuthContext";

function ProfileForm({ onChange, onSubmit, completedToday }) {
  const { user } = useAuth();
  const [dailyGoalError, setDailyGoalError] = useState("");

  function handleDailyGoalChange(event) {
    if (completedToday) {
      setDailyGoalError(
        "Daily goal can't be changed after today's streak is completed.",
      );
      return;
    }

    setDailyGoalError("");
    onChange(event);
  }

  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <label>
        Name
        <input
          name="name"
          value={user.name}
          onChange={onChange}
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
          value={user.dailyGoalMinutes}
          onChange={handleDailyGoalChange}
          onFocus={() => {
            if (completedToday) {
              setDailyGoalError(
                "Daily goal can't be changed after today's streak is completed.",
              );
            }
          }}
          readOnly={completedToday}
          className={completedToday ? "input-locked" : ""}
          required
        />
      </label>

      {dailyGoalError && <p className="error-message">{dailyGoalError}</p>}

      <label>
        Yearly book goal
        <input
          name="yearlyGoalBooks"
          type="number"
          min="1"
          max="100"
          value={user.yearlyGoalBooks}
          onChange={onChange}
          required
        />
      </label>

      <fieldset>
        <legend>Favorite Genres</legend>
        {Object.entries(GENRE_CATEGORIES).map(([category, genres]) => (
          <div key={category} className="genre-category">
            <h4>{category}</h4>
            <div>
              {genres.map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    name="favoriteGenres"
                    value={genre}
                    checked={user.favoriteGenres?.includes(genre)}
                    onChange={onChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
        ))}
      </fieldset>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ProfileForm;
