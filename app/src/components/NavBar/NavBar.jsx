import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/readiculous2.png";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Readiculous logo" className="logo" />
      </Link>

      <div className="nav-links">
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Profile
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Library
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Progress
        </NavLink>
        <NavLink
          to="/daily-streak"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Daily Streak
        </NavLink>
        <NavLink
          to="/challenges"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Challenges
        </NavLink>
      </div>
    </nav>
  );
}
