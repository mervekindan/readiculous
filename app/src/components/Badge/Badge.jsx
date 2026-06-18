import "./Badge.css";

export default function Badge({ badge, progress }) {
    const unlocked = progress >= badge.goal;
    const percentage = badge.goal === 0
        ? unlocked ? 100 : 0
        : Math.min(100, (progress / badge.goal) * 100);

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
            <small>
                {badge.goal === 0
                    ? unlocked ? "Complete" : "Incomplete"
                    : `${progress}/${badge.goal}`}
            </small>
        </div>
    );
}
