import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import { BADGES } from "../../utils/badges";
import { useBooks } from "../../context/BookContext";
import { useAuth } from "../../context/AuthContext";
import "./ChallengesPage.css";

function getBadgeProgress(
  badge,
  inProgressBooks,
  finishedBooks,
  user,
  goalBooks,
) {
  if (typeof badge.getProgress !== "function") return 0;
  return badge.getProgress({
    inProgressBooks,
    finishedBooks,
    user,
    badge,
    goalBooks,
  });
}

export default function ChallengesPage() {
  const { inProgressBooks, finishedBooks } = useBooks();
  const { user } = useAuth();
  const goalBooks = Number(user?.yearlyGoalBooks) || 0;
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  const handleTooltipToggle = (badgeId) => {
    setActiveTooltipId((currentId) => (currentId === badgeId ? null : badgeId));
  };

  return (
    <div className="challenges-page">
      <div className="challenges-page-container">
        {!user && (
          <div className="login-prompt-banner">
            <span>
              <Link className="login-prompt-link" to="?auth=login">
                Log in
              </Link>{" "}
              to add books to your reading progress.
            </span>
          </div>
        )}
        <div className="challenges-header">
          <h1>Challenges</h1>
          <p className="challenges-description">
            Complete reading challenges and earn badges along the way.
          </p>
        </div>

        <div className="badges-grid">
          {BADGES.map((badge) => {
            let userGoalForBadge;
            if (badge.type === "annual_goal_match") {
              userGoalForBadge = user ? goalBooks : undefined;
            }

            return (
              <Badge
                key={badge.id}
                badge={badge}
                progress={
                  user
                    ? getBadgeProgress(
                        badge,
                        inProgressBooks,
                        finishedBooks,
                        user,
                        goalBooks,
                      )
                    : null
                }
                userGoal={userGoalForBadge}
                isTooltipOpen={activeTooltipId === badge.id}
                onToggleTooltip={handleTooltipToggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
