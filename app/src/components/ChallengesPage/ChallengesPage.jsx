import Badge from "../Badge/Badge";
import { BADGES } from "../../utils/badges";
import "./ChallengesPage.css";

export default function ChallengesPage() {
    const userProgress = {
        first_book: 1,
        bookworm: 3,
        marathon_runner: 2,
        trendsetter: 0,
        hype_beast: 1,
        detective_master: 1,
        scifi_master: 0,
        realist_master: 0,
        window_shopper: 7,
        total_clearance: 0,
    };

    return (
        <div className="challenges-page">
            <div className="challenges-header">
                <h1>Challenges</h1>
                <p>
                    Complete reading challenges and earn badges along the way.
                </p>
            </div>

            <div className="badges-grid">
                {BADGES.map((badge) => (
                    <Badge
                        key={badge.id}
                        badge={badge}
                        progress={userProgress[badge.id] || 0}
                    />
                ))}
            </div>
        </div>
    );
}
