import { Link } from "react-router-dom";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import fireIcon from "../../assets/nav-icons/fire.png";
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
          <h2>Reading Streak</h2>
        </div>

        <div className="streak-badge">
          <img src={fireIcon} alt="Reading streak" />
        </div>
      </div>

      <div className="streak-highlight">
        <div className="streak-count">
          <span className="summary-streak-number">{currentStreak}</span>
          <span className="streak-text">
            {currentStreak === 1 ? "day streak" : "days streak"}
          </span>
        </div>
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
