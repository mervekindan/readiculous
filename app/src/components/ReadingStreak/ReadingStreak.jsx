import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import "./ReadingStreak.css";

function ReadingStreak() {
  const { readingStreak, completeReadingToday } = useBooks();
  const { user } = useAuth();

  const goalMinutes = user?.dailyGoalMinutes || 20;
  const initialTime = Number(goalMinutes) * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const today = getTodayDate();
  const completedToday = readingStreak?.lastCompletedDate === today;
  const currentStreak = readingStreak?.currentStreak || 0;

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning && !completedToday) {
      completeReadingToday();
      setIsRunning(false);
    }
  }, [timeLeft, isRunning, completedToday, completeReadingToday]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  if (!user) {
    return (
      <section className="reading-streak">
        <div className="streak-empty-card">
          <div className="empty-icon">🔥</div>

          <h1>Daily Reading Streak</h1>

          <p>
            🔒 Access Restricted. Please log in or create an account to view and
            track your personal daily streak.
          </p>

          <div className="profile-auth-actions">
            <Link className="auth-button" to="/?auth=signup">
              Sign Up
            </Link>

            <Link className="auth-button secondary" to="/?auth=login">
              Log In
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reading-streak">
      <h1>Daily Reading Streak</h1>

      <div className="streak-layout">
        <div className="streak-card streak-progress-card">
          <div className="card-icon green-icon">🔥</div>
          <h2>Streak Progress</h2>

          <p className="streak-number">{currentStreak}</p>
          <p className="streak-label">
            {currentStreak === 1 ? "day streak" : "days streak"}
          </p>

          <div className="status-box">
            <strong>Status:</strong>{" "}
            {completedToday ? "Completed today ✅" : "Not completed yet"}
          </div>

          <div className="weekly-section">
            <h3>Weekly Progress</h3>

            <div className="week-progress">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <div key={day + index} className="day-item">
                  <span>{day}</span>

                  <div
                    className={
                      readingStreak?.currentWeekProgress?.[index]
                        ? "day-circle completed"
                        : "day-circle"
                    }
                  >
                    {readingStreak?.currentWeekProgress?.[index] ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="goal-box">
            <strong>Daily Goal:</strong> {goalMinutes} minutes
            <p>Read every day to keep your streak going!</p>
          </div>
        </div>

        <div className="right-column">
          <div className="streak-card timer-card">
            <div className="card-icon blue-icon">📖</div>
            <h2>Reading Timer</h2>

            <div className="goal-timer-box">
              <span>🎯</span>
              <div>
                <p>Today's reading goal</p>
                <strong>{goalMinutes} minutes</strong>
              </div>
            </div>

            <div className="timer-actions">
              <button
                onClick={() => setIsRunning(true)}
                disabled={isRunning || completedToday}
              >
                ▶ Start
              </button>

              <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
                ⏸ Pause
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(initialTime);
                }}
              >
                ↻ Reset
              </button>
            </div>

            <p className="timer-note">
              Press Start to begin your reading session.
            </p>
          </div>

          <div className="streak-card time-left-card">
            <div className="card-icon purple-icon">⏰</div>
            <h2>Time Left</h2>

            <p className="timer">{formatTime(timeLeft)}</p>
            <p>minutes</p>

            <div className="keep-reading-box">
              ⏳ Keep reading and enjoy your progress!
            </div>
          </div>
        </div>
      </div>

      <p className="bottom-message">
        ℹ Complete your daily goal to build your streak and become a better
        reader every day!
      </p>
    </section>
  );
}

export default ReadingStreak;
