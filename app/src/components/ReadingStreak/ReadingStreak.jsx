import { useEffect, useState } from "react";
import { useBooks } from "../../context/BookContext";
import { getTodayDate } from "../../utils/date.js";
import "./ReadingStreak.css";

function ReadingStreak() {
  const { userProfile, readingStreak, completeReadingToday } = useBooks();

  const goalMinutes =
    userProfile.dailyGoalMinutes || userProfile.dailyTargetMinutes || 20;

  const initialTime = Number(goalMinutes || 0) * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const today = getTodayDate();
  const completedToday = readingStreak?.lastCompletedDate === today;
  const currentStreak = readingStreak?.currentStreak || 0;

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

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTimeLeft(initialTime);
  }

  return (
    <section className="reading-streak">
      <div className="streak-card">
        <h1>Daily Reading Streak</h1>

        <p className="streak-number">{currentStreak}</p>
        <p>{currentStreak === 1 ? "day streak" : "days streak"}</p>

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
              />
            </div>
          ))}
        </div>

        <div className="streak-info">
          <p>
            <strong>Today's reading goal:</strong> {goalMinutes || 0} minutes
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {completedToday ? "Completed today ✅" : "Not completed yet"}
          </p>
        </div>

        <p className="timer">{formatTime(timeLeft)}</p>

        <div className="timer-actions">
          <button
            type="button"
            onClick={handleStart}
            disabled={isRunning || completedToday}
          >
            Start
          </button>

          <button type="button" onClick={handlePause} disabled={!isRunning}>
            Pause
          </button>

          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReadingStreak;
