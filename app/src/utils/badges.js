import firstBook from "/badges/firstBook.png";
import bookworm from "/badges/bookworm.png";
import marathonRunner from "/badges/marathonRunner.png";
import trendsetter from "/badges/trendsetter.png";
import hypeBeast from "/badges/hypeBeast.png";
import detectiveMaster from "/badges/detectiveMaster.png";
import scifiMaster from "/badges/scifiMaster.png";
import realistMaster from "/badges/realistMaster.png";
import windowShopper from "/badges/windowShopper.png";
import totalClearance from "/badges/totalClearance.png";
import realistPro from "/badges/realistPro.png";
import genreLoyalty from "/badges/genreLoyalty.png";
import architectOfHabits from "/badges/architectOfHabits.png";

export const BADGES = [
    {
        id: "first_book",
        title: "First Book",
        description:
            "Read your very first book. The journey of a thousand pages begins!",
        type: "quantity",
        icon: firstBook,
        goal: 1,
    },
    {
        id: "bookworm",
        title: "Bookworm Entry-Level",
        description:
            "Finish 5 books. You're officially turning into a certified reader!",
        type: "quantity",
        icon: bookworm,
        goal: 5,
    },
    {
        id: "marathon_runner",
        title: "Marathon Runner",
        description:
            'Have 3 different books "In Progress" at the same time. Multitasking at its finest!',
        type: "progress_count",
        icon: marathonRunner,
        goal: 3,
    },
    {
        id: "trendsetter",
        title: "Trendsetter",
        description:
            "Finish a Bestseller. Reading what the world is talking about!",
        type: "bestseller",
        icon: trendsetter,
        goal: 1,
    },
    {
        id: "hype_beast",
        title: "Hype Beast",
        description:
            "Complete 5 Bestsellers. You only accept the absolute hits!",
        type: "bestseller",
        icon: hypeBeast,
        goal: 5,
    },
    {
        id: "detective_master",
        title: "Elementary, My Dear Watson",
        description:
            "Finish 3 Detective or Mystery books. Sherlock Holmes would be proud.",
        type: "genre",
        icon: detectiveMaster,
        goal: 3,
    },
    {
        id: "scifi_master",
        title: "To Infinity and Beyond",
        description:
            "Finish 3 Sci-Fi or Fantasy books. Reality is overrated anyway!",
        type: "genre",
        icon: scifiMaster,
        goal: 3,
    },
    {
        id: "realist_master",
        title: "The Realist",
        description:
            "Finish 2 Biography or History books. Staying grounded in reality.",
        type: "genre",
        icon: realistMaster,
        goal: 2,
    },
    {
        id: "window_shopper",
        title: "Window Shopper",
        description:
            "Add 10 books total to your lists. Collect now, read... later?",
        type: "total_added",
        icon: windowShopper,
        goal: 10,
    },
    {
        id: "total_clearance",
        title: "Total Clearance",
        description:
            'Empty your "In Progress" list by finishing all added books. No trailing assignments!',
        type: "clearance",
        icon: totalClearance,
        goal: 0,
    },
    {
        id: "realist_pro",
        title: "Realist Pro",
        description:
            "Complete your entire Annual Goal (number of books) that you set for yourself. Promise kept!",
        type: "annual_goal_match",
        icon: realistPro,
        goal: "dynamic",
    },
    // {
    //     id: "genre_loyalty",
    //     title: "Genre Loyalty",
    //     description:
    //         'Finish a book that matches one of the "Favorite Genres" you selected during registration.',
    //     type: "favorite_genre_match",
    //     icon: genreLoyalty,
    //     goal: 1,
    // },
    {
        id: "architect_of_habits",
        title: "Architect of Habits",
        description:
            "Maintain a streak of consistent reading habits by reading at least 20 minutes a day for 7 consecutive days.",
        type: "habit_streak",
        icon: architectOfHabits,
        goal: 7,
    },
];
