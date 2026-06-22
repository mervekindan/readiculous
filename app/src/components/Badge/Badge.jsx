import "./Badge.css";

export default function Badge({ badge, progress, userGoal }) {
    const goalValue = typeof badge.goal === "number" ? badge.goal : (userGoal || 1);
    const unlocked = progress >= goalValue;
    const percentage = Math.min(100, (progress / goalValue) * 100);

    const progressLabel = unlocked ? "Goal completed! 🎉" : `${progress}/${goalValue}`;

    return (
        <div className="badge-card">
            <div className="badge-tooltip">{badge.description}</div>
            <img
                src={badge.icon}
                alt={badge.title}
                className={`badge-image ${unlocked ? "unlocked" : "locked"}`}
            />

            <h3 className="badge-title">{badge.title}</h3>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <small>{progressLabel}</small>
        </div>
    );
}
