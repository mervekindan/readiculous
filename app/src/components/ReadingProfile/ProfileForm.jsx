import { ALLOWED_GENRES } from "../../utils/genres";
import { useAuth } from "../../context/AuthContext";

function ProfileForm({ onChange, onSubmit }) {
  const { user } = useAuth();

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

        {ALLOWED_GENRES.map((genre) => (
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
      </fieldset>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ProfileForm;
