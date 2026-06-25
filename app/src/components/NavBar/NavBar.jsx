import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/readiculous2.png";
import "./NavBar.css";

import profileIcon from "../../assets/nav-icons/user.png";
import libraryIcon from "../../assets/nav-icons/book.png";
import progressIcon from "../../assets/nav-icons/progress.png";
import streakIcon from "../../assets/nav-icons/fire.png";
import challengesIcon from "../../assets/nav-icons/medal.png";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigationLinks = [
    { to: "/profile", label: "Profile", iconSrc: profileIcon },
    { to: "/library", label: "Library", iconSrc: libraryIcon },
    { to: "/progress", label: "Progress", iconSrc: progressIcon },
    { to: "/daily-streak", label: "Streak", iconSrc: streakIcon },
    { to: "/challenges", label: "Challenges", iconSrc: challengesIcon },
  ];

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Readiculous logo" className="logo" />
        </Link>

        <button
          className={`burger-menu ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "link active" : "link")}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <nav className="nav-bar-bottom">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "mobile-icon-link active" : "mobile-icon-link"
            }
          >
            <img
              src={link.iconSrc}
              alt={`${link.label} icon`}
              className="mobile-nav-icon"
            />
            <span className="mobile-nav-text">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  );
}
