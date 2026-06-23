import { GENRE_CATEGORIES } from "../../utils/genres";
import { useAuth } from "../../context/AuthContext";

function ProfileForm({ onChange, onSubmit }) {
  const { user } = useAuth();
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
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
        Daily reading goal
        <input
          name="dailyGoalMinutes"
          type="time"
          value={minutesToTime(user.dailyGoalMinutes)}
          onChange={onChange}
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
