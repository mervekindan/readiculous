import { Link } from "react-router-dom";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";

function ReadingStreakSummary() {
  const { readingStreak } = useBooks();

  const today = getTodayDate();
  const currentStreak = readingStreak?.currentStreak || 0;
  const completedToday = readingStreak?.lastCompletedDate === today;

  return (
    <div className="profile-card streak-summary-card">
      <div className="profile-card-header">
        <h2>Reading Streak</h2>
        <span className="streak-badge">🔥</span>
      </div>

      <p className="summary-streak-number">{currentStreak}</p>
      <p>{currentStreak === 1 ? "day streak" : "days streak"}</p>

      <div className="summary-week-progress">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <div key={day + index} className="summary-day-item">
            <span>{day}</span>
            <div
              className={
                readingStreak?.currentWeekProgress?.[index]
                  ? "summary-day-circle completed"
                  : "summary-day-circle"
              }
            />
          </div>
        ))}
      </div>

      <p className="streak-status">
        {completedToday ? "Completed today ✅" : "Not completed yet"}
      </p>

      <Link to="/daily-streak" className="profile-link-button">
        Continue Reading
      </Link>
    </div>
  );
}

export default ReadingStreakSummary;
