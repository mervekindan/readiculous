import { useState } from "react";
import "./Badge.css";

export default function Badge({ badge, progress, userGoal }) {
  const goalValue = typeof badge.goal === "number" ? badge.goal : userGoal || 1;
  const hasProgress = typeof progress === "number";
  const unlocked = hasProgress && progress >= goalValue;
  const percentage = hasProgress
    ? Math.min(100, (progress / goalValue) * 100)
    : 0;

  const [showTooltip, setShowTooltip] = useState(false);
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  const progressLabel = !hasProgress
    ? null
    : unlocked
      ? "Goal completed! 🎉"
      : `${progress}/${goalValue}`;

  return (
    <div
      className="badge-card"
      onClick={() => {
        if (isTouchDevice) {
          setShowTooltip(!showTooltip);
        }
      }}
    >
      <div className={`badge-tooltip ${showTooltip ? "show-tooltip" : ""}`}>
        {badge.description}
      </div>
      <img
        src={badge.icon}
        alt={badge.title}
        className={`badge-image ${hasProgress && unlocked ? "unlocked" : "locked"}`}
      />

      <h3 className="badge-title">{badge.title}</h3>

      {hasProgress ? (
        <>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <small>{progressLabel}</small>
        </>
      ) : null}
    </div>
  );
}
