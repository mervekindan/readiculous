import "./TeamPage.css";
import { Link } from "react-router-dom";

import mervePhoto from "../../assets/team/merve.png";
import ninaPhoto from "../../assets/team/nina.png";
import anastasiaPhoto from "../../assets/team/anastasia.png";
import githubIcon from "../../assets/github.svg";

import logo from "../../assets/readiculous2.png";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Merve",
      role: "Frontend / UI Developer",
      github: "https://github.com/mervekindan/",
      avatar: mervePhoto,
      bio: "Home page with popups for forms, Challenges logic and design, navigation and styles.",
    },
    {
      name: "Nina",
      role: "Frontend / UI Developer",
      github: "https://github.com/codebynina",
      avatar: ninaPhoto,
      bio: "Registration and Login form, authentication (mockAPI), user profile, streak and timer.",
    },
    {
      name: "Anastasia",
      role: "Frontend / UI Developer",
      github: "https://github.com/nastiasolo",
      avatar: anastasiaPhoto,
      bio: "Library (external API - OpenLibrary, Progress page logic, design, responsiveness, mobile adjustments",
    },
  ];

  return (
    <div className="about-us-page about-page">
      <div className="about-container">
        <section className="project-intro">
          <h1 className="about-title">About Readiculous</h1>
          <p className="project-description">
            This web application is our{" "}
            <strong className="accent-color"> graduation final project </strong>
            for the intensive 8-month web development program at{" "}
            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hyf-link"
            >
              HackYourFuture Denmark
            </a>
            . We built <strong className="accent-color">Readiculous</strong> to
            help book lovers seamlessly track their reading progress, maintain
            daily streaks, and smash reading challenges.
          </p>

          <div className="project-repo-wrapper">
            <a
              href="https://github.com/mervekindan/readiculous/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-button"
            >
              <img src={githubIcon} alt="GitHub" className="github-svg-icon" />
              <span>View Project Repository</span>
            </a>
          </div>
        </section>

        <section className="team-section">
          <h2 className="team-title">Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="member-card">
                <div className="avatar-wrapper">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="member-avatar"
                  />
                </div>
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-bio">{member.bio}</p>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="github-button"
                >
                  <img
                    src={githubIcon}
                    alt="GitHub"
                    className="github-svg-icon"
                  />
                  <span>GitHub Profile</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
