import { useBooks } from "../../context/BookContext";
import "./ReadingStreak.css";

function ReadingStreak() {
  const { userProfile, readingStreak, completeReadingToday } = useBooks();

  const today = new Date().toISOString().split("T")[0];
  const completedToday = readingStreak?.lastCompletedDate === today;
  const currentStreak = readingStreak?.currentStreak || 0;

  return (
    <section className="reading-streak">
      <div className="streak-card">
        <h1>🔥 Daily Reading Streak</h1>

        <p className="streak-number">{currentStreak}</p>
        <p>{currentStreak === 1 ? "day streak" : "days streak"}</p>

        <div className="streak-info">
          <p>
            <strong>Today's goal:</strong> {userProfile.dailyTargetMinutes}{" "}
            minutes
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {completedToday ? "Completed today ✅" : "Not completed yet"}
          </p>
        </div>

        <button
          type="button"
          onClick={completeReadingToday}
          disabled={completedToday}
        >
          {completedToday ? "Completed Today" : "Mark Today's Goal Complete"}
        </button>
      </div>
    </section>
  );
}

export default ReadingStreak;
