import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import AuthMessage from "../AuthMessage/AuthMessage.jsx";
import fireIcon from "../../assets/nav-icons/fire.png";
import bookIcon from "../../assets/nav-icons/book.png";
import timeIcon from "../../assets/nav-icons/time.png";
import targetIcon from "../../assets/streak-icons/target.png";
import playIcon from "../../assets/streak-icons/play.png";
import pauseIcon from "../../assets/streak-icons/pause-button.png";
import resetIcon from "../../assets/streak-icons/undo.png";
import checkIcon from "../../assets/streak-icons/check-mark.png";
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

  function formatMinutes(minutes) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  if (!user) {
    return (
      <section className="reading-streak">
        <AuthMessage
          icon={fireIcon}
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

          <p className="streak-description">
            Complete your daily goal to build your streak and become a better
            reader every day.
          </p>
        </div>

        <div className="streak-layout">
          <div className="streak-card streak-progress-card">
            <div className="card-icon">
              <img src={fireIcon} alt="Fire icon" />
            </div>

            <h2>Streak Progress</h2>

            <p className="streak-number">{currentStreak}</p>

            <p className="streak-label">
              {currentStreak === 1 ? "day streak" : "days streak"}
            </p>

            {completedToday && (
              <div className="status-text status-completed">
                <strong>Status:</strong> Today's Goal Completed
              </div>
            )}

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
              <strong>Daily Goal:</strong> {formatMinutes(goalMinutes)}
              <p>Read every day to keep your streak going!</p>
            </div>
          </div>

          <div className="right-column">
            <div className="streak-card timer-card">
              <div className="card-icon">
                <img src={bookIcon} alt="Book icon" />
              </div>

              <h2>Reading Timer</h2>

              <div className="goal-timer-box">
                <img src={targetIcon} alt="" className="inline-icon" />

                <div>
                  <p>Today's reading goal</p>
                  <strong>{formatMinutes(goalMinutes)}</strong>
                </div>
              </div>

              <div className="timer-display-box">
                {!completedToday && isRunning && (
                  <span className="timer-status-dot running" />
                )}

                {!completedToday && !isRunning && timeLeft !== initialTime && (
                  <span className="timer-status-dot paused" />
                )}

                <div className="timer-title">
                  <img src={timeIcon} alt="" className="inline-icon" />
                  <span>Time Left</span>
                </div>

                <p className="timer">{formatTime(timeLeft)}</p>

                <small>minutes</small>
              </div>

              <div className="timer-actions">
                <button
                  className={
                    !isRunning && !completedToday ? "active-button" : ""
                  }
                  onClick={() => setIsRunning(true)}
                  disabled={isRunning || completedToday}
                >
                  <img src={playIcon} alt="" className="button-icon" />
                  Start
                </button>

                <button
                  className={isRunning ? "active-button" : ""}
                  onClick={() => setIsRunning(false)}
                  disabled={!isRunning}
                >
                  <img src={pauseIcon} alt="" className="button-icon" />
                  Pause
                </button>

                <button
                  className={completedToday ? "active-button" : ""}
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(initialTime);
                  }}
                >
                  <img src={resetIcon} alt="" className="button-icon" />
                  Reset
                </button>
              </div>

              {completedToday && (
                <div className="keep-reading-box">
                  <img src={checkIcon} alt="" className="status-icon" />
                  Great job! You completed today's reading goal.
                </div>
              )}

              <p className="timer-note">
                Press Start to begin your reading session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ReadingStreak;
