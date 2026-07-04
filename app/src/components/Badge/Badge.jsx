import "./Badge.css";

export default function Badge({
  badge,
  progress,
  userGoal,
  isTooltipOpen = false,
  onToggleTooltip,
}) {
  const goalValue = typeof badge.goal === "number" ? badge.goal : userGoal || 1;
  const hasProgress = typeof progress === "number";
  const unlocked = hasProgress && progress >= goalValue;
  const percentage = hasProgress
    ? Math.min(100, (progress / goalValue) * 100)
    : 0;

  const isTouchDevice =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const progressLabel = unlocked
    ? "Goal completed! 🎉"
    : `${progress ?? 0}/${goalValue}`;

  const handleClick = () => {
    if (isTouchDevice && typeof onToggleTooltip === "function") {
      onToggleTooltip(badge.id);
    }
  };

  return (
    <div className="badge-card" onClick={handleClick}>
      <div
        className={`badge-tooltip ${isTouchDevice && isTooltipOpen ? "show-tooltip" : ""}`}
      >
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
