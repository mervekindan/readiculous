import { useState } from "react";
import "./AboutPage.css";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const instructionsData = [
    {
      title: "Set Your Targets",
      description:
        "Before jumping in, set your personal goals. Choose how many minutes per day you want to read and how many books per year you want to conquer. Your targets, your rules.",
    },
    {
      title: "Hunt and Gather",
      description:
        "Head over to the Library tab. Search for your next obsession. Click Add to drop it into your reading queue.",
    },
    {
      title: "Fire Up the Daily Streak",
      description:
        "Every day you sit down to read, start the built-in Reading Timer. Complete your daily goal in minutes to secure your Daily Streak and keep your current week green! Don't let the streak die.",
    },
    {
      title: "Claim Your Glory",
      description:
        "Finished the final chapter? Hit Finished! Your book will move to the hall of fame, your annual stats will update instantly, and you’ll get closer to unlocking gaming achievements.",
    },
    {
      title: "Collect Your Badges",
      description:
        "Head over to the dedicated. Challenges page to see your trophy cabinet. Turn those locked, gray achievements into shiny, colorized badges!",
    },
  ];

  const faqData = [
    {
      q: 'What is this "Daily Streak" and why should I care?',
      a: "It’s your ultimate consistency tracker! Every day you hit your reading goal using the timer, your streak goes up and your current week stays green. Missing a day won't instantly wipe out all your hard work, but it will pause your momentum. Keep turning those days green to unlock achievements!",
    },
    {
      q: "Is this app going to judge me if I don't read every day?",
      a: "Absolutely not. However, the books in your In Progress column and your Daily Streak timer might develop severe separation anxiety if left abandoned. Read responsibly.",
    },
    {
      q: "I set my goal to 120 minutes a day and 100 books a year. Am I doing this right?",
      a: "We love the enthusiasm, but let’s be real. Setting your daily target to 2 hours on day one is a fast track to burnout. Start small (like 15–20 minutes), build your weekly streak, and scale up when you become an absolute reading machine.",
    },
    {
      q: "I added 45 books to my progress queue today. Am I a reader now?",
      a: "Ah, the classic Window Shopper syndrome. Collecting books and reading books are two entirely separate hobbies. You have unlocked the hoarder energy, but to unlock the real badges on the Challenges page, you actually have to read them.",
    },
    {
      q: "Can I add 'The Lord of the Rings' three times to get the achievements faster?",
      a: "One does not simply duplicate Mordor. Our code checks the unique book keys, so you can't cheat the system. Nice loophole attempt, but Gandalf says: “You shall not pass” with duplicate entries.",
    },
    {
      q: "What happens when I unlock an achievement like 'Hype Beast'? Do I get a real trophy?",
      a: "You get something much better than a plastic trophy: digital bragging rights and a hit of raw dopamine! Plus, a beautifully clean, colorized badge in your dashboard that proves to the internet that you are intellectually superior.",
    },
    {
      q: "Where are my hard-earned badges and streaks being saved?",
      a: "Everything is saved locally in your browser via localStorage. This means if you clear your browser cache, your streak and your trophy cabinet might vanish into the void. If you lose a 50-day streak because you cleared your history, we will salute your fallen progress.",
    },
    {
      q: "Can I just leave the timer running while I take a nap to cheat the streak?",
      a: "You could... but you'd only be lying to yourself (and the books know). There is no anti-cheat system, but the guilt of having a fake 'Master Reader' badge while not knowing what happened in the book is a heavy burden to carry.",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-page-container">
        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <ol className="instructions-list">
            {instructionsData.map((item, index) => (
              <li key={index}>
                <strong className="accent-color">
                  {index + 1}. {item.title}:{" "}
                </strong>
                {item.description}
              </li>
            ))}
          </ol>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className="modern-accordion">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`accordion-item ${isOpen ? "active" : ""}`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="accordion-question accent-color">
                      {item.q}
                    </span>
                    <span className="accordion-icon">
                      {isOpen ? "−" : "＋"}
                    </span>
                  </div>

                  <div className="accordion-collapse">
                    <div className="accordion-body">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
