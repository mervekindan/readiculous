function ProfileForm({ profile, onChange, onSubmit }) {
  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <label>
        Name
        <input
          name="name"
          value={profile.name}
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
          value={profile.dailyGoalMinutes}
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
          value={profile.yearlyGoalBooks}
          onChange={onChange}
          required
        />
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ProfileForm;
