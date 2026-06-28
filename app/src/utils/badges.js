import firstBook from "/badges/firstBook.png";
import bookworm from "/badges/bookworm.png";
import marathonRunner from "/badges/marathonRunner.png";
import trendsetter from "/badges/trendsetter.png";
import hypeBeast from "/badges/hypeBeast.png";
import detectiveMaster from "/badges/detectiveMaster.png";
import scifiMaster from "/badges/scifiMaster.png";
import realistMaster from "/badges/realistMaster.png";
import windowShopper from "/badges/windowShopper.png";
import firstMinutes from "/badges/firstMinutes.png";
import realistPro from "/badges/realistPro.png";
import architectOfHabits from "/badges/architectOfHabits.png";
import { useBooks } from "../context/BookContext";
import { useAuth } from "../context/AuthContext";

getProgress: ({ inProgressBooks, finishedBooks, user, badge, goalBooks }) => { }

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

export const BADGES = [
    {
        id: "first_book",
        title: "First Book",
        description:
            "Read your very first book. The journey of a thousand pages begins!",
        type: "quantity",
        icon: firstBook,
        goal: 1,
        getProgress: ({finishedBooks}) => {
          return finishedBooks.length;
        },
    },
    {
        id: "bookworm",
        title: "Bookworm Entry-Level",
        description:
            "Finish 5 books. You're officially turning into a certified reader!",
        type: "quantity",
        icon: bookworm,
        goal: 5,
        getProgress: ({finishedBooks}) => {
          return finishedBooks.length;
        }
    },
    {
        id: "marathon_runner",
        title: "Marathon Runner",
        description:
            'Have 3 different books "In Progress" at the same time. Multitasking at its finest!',
        type: "progress_count",
        icon: marathonRunner,
        goal: 3,
        getProgress: ({inProgressBooks, badge}) => {
          return Math.min(inProgressBooks.length, badge.goal);
        }
    },
    {
        id: "trendsetter",
        title: "Trendsetter",
        description:
            "Finish a Bestseller. Reading what the world is talking about!",
        type: "bestseller",
        icon: trendsetter,
        goal: 1,
        getProgress: ({finishedBooks}) => {
        return finishedBooks.filter(isBestseller).length;
        }
    },
    {
        id: "hype_beast",
        title: "Hype Beast",
        description:
            "Complete 5 Bestsellers. You only accept the absolute hits!",
        type: "bestseller",
        icon: hypeBeast,
        goal: 5,
        getProgress: ({finishedBooks}) => {
        return finishedBooks.filter(isBestseller).length;
        }
    },
    {
        id: "detective_master",
        title: "Elementary, My Dear Watson",
        description:
            "Finish 3 Detective or Mystery books. Sherlock Holmes would be proud.",
        type: "genre",
        icon: detectiveMaster,
        goal: 3,
        getProgress: ({finishedBooks}) => {
          return finishedBooks.filter((book) => matchesGenre(book, ["detective", "mystery"] || [])).length;
        }
    },
    {
        id: "scifi_master",
        title: "To Infinity and Beyond",
        description:
            "Finish 3 Sci-Fi or Fantasy books. Reality is overrated anyway!",
        type: "genre",
        icon: scifiMaster,
        goal: 3,
        getProgress: ({finishedBooks}) => {
          return finishedBooks.filter((book) => matchesGenre(book, ["sci-fi", "science fiction", "fantasy"] || [])).length;
        }
    },
    {
        id: "realist_master",
        title: "The Realist",
        description:
            "Finish 2 Biography or History books. Staying grounded in reality.",
        type: "genre",
        icon: realistMaster,
        goal: 2,
        getProgress: ({finishedBooks}) => {
          return finishedBooks.filter((book) => matchesGenre(book, ["biography", "history"] || [])).length;
        }
    },
    {
        id: "window_shopper",
        title: "Window Shopper",
        description:
            "Add 10 books total to your lists. Collect now, read... later?",
        type: "total_added",
        icon: windowShopper,
        goal: 10,
        getProgress: ({inProgressBooks, finishedBooks}) => {
          return inProgressBooks.length + finishedBooks.length > 10 ? 10 : inProgressBooks.length + finishedBooks.length;
        }
    },
    {
        id: 'first_minutes',
        title: 'First Minutes',
        description: 'Start and successfully complete your very first timed reading session.',
        type: 'timer_first_run',
        icon: firstMinutes,
        goal: 1,
		getProgress: ({inProgressBooks, finishedBooks, user}) => {
          return user?.completedTimedReadingSession ? 1 : 0;
        }
    },
    {
        id: "realist_pro",
        title: "Realist Pro",
        description:
            "Complete your entire Annual Goal (number of books) that you set for yourself. Promise kept!",
        type: "annual_goal_match",
        icon: realistPro,
        goal: "dynamic",
		getProgress: ({finishedBooks, goalBooks}) => {
          return goalBooks > 0 && finishedBooks.length >= goalBooks ? 1 : 0;
        }
    },
    {
        id: "architect_of_habits",
        title: "Architect of Habits",
        description:
            "Maintain a streak of consistent reading habits by reading at least 20 minutes a day for 7 consecutive days.",
        type: "habit_streak",
        icon: architectOfHabits,
        goal: 7,
		getProgress: ({user, badge}) => {
        const streakDays = Number(user?.readingStreakDays) || 0;
            return Math.min(streakDays, badge.goal);
        }
    },
];
