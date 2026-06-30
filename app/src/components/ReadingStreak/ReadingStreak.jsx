import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import AuthMessage from "../AuthMessage/AuthMessage.jsx";
import fireIcon from "../../assets/nav-icons/fire.png";
import bookIcon from "../../assets/nav-icons/book.png";
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
        <AuthMessage
          icon="🔥"
          title="Daily Reading Streak"
          message="Access Restricted. Please log in or create an account to view and track your personal daily streak."
        />
      </section>
    );
  }

  return (
    <section className="reading-streak">
      <div className="reading-streak-container">
        <div className="reading-streak-header">
          <h1>Daily Reading Streak</h1>
        </div>
        <div className="streak-layout">
          <div className="streak-card streak-progress-card">
            <div className="card-icon green-icon">
              <img src={fireIcon} alt="" />
            </div>
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
              <div className="card-icon blue-icon">
                <img src={bookIcon} alt="" />
              </div>
              <h2>Reading Timer</h2>

              <div className="goal-timer-box">
                <span>🎯</span>
                <div>
                  <p>Today's reading goal</p>
                  <strong>{goalMinutes} minutes</strong>
                </div>
              </div>

              <div className="timer-display-box">
                <span>⏰ Time Left</span>
                <p className="timer">{formatTime(timeLeft)}</p>
                <small>minutes</small>
              </div>

              <div className="timer-actions">
                <button
                  onClick={() => setIsRunning(true)}
                  disabled={isRunning || completedToday}
                >
                  ▶ Start
                </button>

                <button
                  onClick={() => setIsRunning(false)}
                  disabled={!isRunning}
                >
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

              <div className="keep-reading-box">
                ⏳ Keep reading and enjoy your progress!
              </div>

              <p className="timer-note">
                Press Start to begin your reading session.
              </p>
            </div>
          </div>
        </div>

        <p className="bottom-message">
          ℹ Complete your daily goal to build your streak and become a better
          reader every day!
        </p>
      </div>
    </section>
  );
}
export default ReadingStreak;
