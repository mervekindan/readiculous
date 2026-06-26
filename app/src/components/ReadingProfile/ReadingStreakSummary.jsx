import { Link } from "react-router-dom";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import "./ReadingStreakSummary.css";

function ReadingStreakSummary() {
  const { readingStreak } = useBooks();

  const today = getTodayDate();
  const currentStreak = readingStreak?.currentStreak || 0;
  const completedToday = readingStreak?.lastCompletedDate === today;

  return (
    <section className="profile-card streak-summary-card">
      <div className="profile-card-header">
        <div>
          <p className="profile-label">Reading Habit</p>
          <h2>Reading Streak</h2>
        </div>

        <span className="streak-badge">🔥</span>
      </div>

      <div className="streak-highlight">
        <p className="summary-streak-number">{currentStreak}</p>
        <span>{currentStreak === 1 ? "day streak" : "days streak"}</span>
      </div>

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

      <p className={completedToday ? "streak-status done" : "streak-status"}>
        {completedToday ? "Completed today ✅" : "Not completed yet"}
      </p>

      <Link to="/daily-streak" className="profile-link-button">
        Continue Reading
      </Link>
    </section>
  );
}

export default ReadingStreakSummary;
