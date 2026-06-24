import Badge from "../Badge/Badge";
import { BADGES } from "../../utils/badges";
import { useBooks } from "../../context/BookContext";
import { useAuth } from "../../context/AuthContext";
import "./ChallengesPage.css";

function getBadgeProgress(badge, inProgressBooks, finishedBooks, user, goalBooks) {
  if (typeof badge.getProgress !== "function") return 0;
  return badge.getProgress({ inProgressBooks, finishedBooks, user, badge, goalBooks });
}

export default function ChallengesPage() {
    const { inProgressBooks, finishedBooks } = useBooks();
    const { user } = useAuth();
    const goalBooks = Number(user?.yearlyGoalBooks) || 0;

    return (
        <div className="challenges-page">
            <div className="challenges-header">
                <h1>Challenges</h1>
                <p>
                    Complete reading challenges and earn badges along the way.
                </p>
            </div>

            <div className="badges-grid">
                {BADGES.map((badge) => {
                    let userGoalForBadge;
                    if (badge.type === "annual_goal_match") {
                        userGoalForBadge = goalBooks;
                    } 
                    
                    return (
                        <Badge
                            key={badge.id}
                            badge={badge}
                            progress={getBadgeProgress(badge, inProgressBooks, finishedBooks, user, goalBooks)}
                            userGoal={userGoalForBadge}
                        />
                    );
                })}
            </div>
        </div>
    );
}
