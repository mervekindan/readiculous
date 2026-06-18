import Badge from "../Badge/Badge";
import { BADGES } from "../../utils/badges";
import { useBooks } from "../../context/BookContext";
import { useAuth } from "../../context/AuthContext";
import "./ChallengesPage.css";

function isBestseller(book) {
    return book.subject?.some((subject) =>
        String(subject).toLowerCase().includes("bestseller"),
    );
}

function matchesGenre(book, targets) {
    if (!book.subject || !Array.isArray(book.subject)) return false;

    return book.subject.some((subject) => {
        const cleanSubject = String(subject).toLowerCase();
        return targets.some((target) => cleanSubject.includes(target));
    });
}

function calculateBadgeProgress(badge, inProgressBooks, finishedBooks, user) {
    switch (badge.type) {
        case "quantity":
            return finishedBooks.length;
        case "progress_count":
            return Math.min(inProgressBooks.length, badge.goal);
        case "bestseller":
            return finishedBooks.filter(isBestseller).length;
        case "genre": {
            const genreRules = {
                detective_master: ["detective", "mystery"],
                scifi_master: ["sci-fi", "science fiction", "fantasy"],
                realist_master: ["biography", "history"],
            };

            return finishedBooks.filter((book) =>
                matchesGenre(book, genreRules[badge.id] || []),
            ).length;
        }
        case "total_added":
            return inProgressBooks.length + finishedBooks.length;
        case "clearance":
            return inProgressBooks.length === 0 &&
                inProgressBooks.length + finishedBooks.length > 0
                ? badge.goal
                : 0;
        case "annual_goal_match": {
            const goalBooks = Number(user?.yearlyGoalBooks) || 0;
            return goalBooks > 0 && finishedBooks.length >= goalBooks ? 1 : 0;
        }
        // case "favorite_genre_match":
        //     return finishedBooks.some((book) =>
        //         matchesUserFavoriteGenre(book, user?.favoriteGenres || []),
        //     )
        //         ? 1
        //         : 0;
        case "settings_changed":
            return user?.settingsChanged ? 1 : 0;
        default:
            return 0;
    }
}

export default function ChallengesPage() {
    const { inProgressBooks, finishedBooks } = useBooks();
    const { user } = useAuth();
    const goalBooks = Number(user?.yearlyGoalBooks) || 0;
    const finishedCount = finishedBooks.length;
    const goalComplete = goalBooks > 0 && finishedCount >= goalBooks;

    return (
        <div className="challenges-page">
            <div className="challenges-header">
                <h1>Challenges</h1>
                <p>
                    Complete reading challenges and earn badges along the way.
                </p>
                {goalBooks > 0 ? (
                    <div className="goal-summary">
                        <strong>Yearly goal:</strong> {finishedCount} /{" "}
                        {goalBooks} books
                        {goalComplete ? " — Goal completed! 🎉" : ""}
                    </div>
                ) : (
                    <div className="goal-summary">
                        Set your yearly reading goal on your profile to track
                        progress.
                    </div>
                )}
            </div>

            <div className="badges-grid">
                {BADGES.map((badge) => {
                    let userGoalForBadge;
                    if (badge.type === "annual_goal_match") {
                        userGoalForBadge = goalBooks;
                    } else if (badge.type === "favorite_genre_match") {
                        userGoalForBadge = 1;
                    }

                    return (
                        <Badge
                            key={badge.id}
                            badge={badge}
                            progress={calculateBadgeProgress(
                                badge,
                                inProgressBooks,
                                finishedBooks,
                                user,
                            )}
                            userGoal={userGoalForBadge}
                        />
                    );
                })}
            </div>
        </div>
    );
}
