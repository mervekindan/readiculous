import "./Badge.css";

export default function Badge({ badge, progress }) {
    const percentage = (progress / badge.goal) * 100;

    const unlocked = progress >= badge.goal;

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
                {progress}/{badge.goal}
            </small>
        </div>
    );
}
