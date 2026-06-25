import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/readiculous2.png";
import "./NavBar.css";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={closeMenu}
          >
            Profile
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={closeMenu}
          >
            Library
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={closeMenu}
          >
            Progress
          </NavLink>
          <NavLink
            to="/daily-streak"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={closeMenu}
          >
            Daily Streak
          </NavLink>
          <NavLink
            to="/challenges"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={closeMenu}
          >
            Challenges
          </NavLink>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  );
}
