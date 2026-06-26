import { Link } from "react-router-dom";
import { SocialMediaItem } from "../SocialMediaItem/SocialMediaItem";
import "./Footer.css";
import logo from "../../assets/readiculous2.png";

export function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-description">
          <Link to="/" className="link">
            <img
              src={logo}
              alt="Readiculous logo"
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="contact-us">
          <h3>Information</h3>
          <Link to="/team" className="footer-link">
            About Us
          </Link>
          <Link to="/about" className="footer-link">
            FAQ
          </Link>
        </div>
        <div className="footer-links">
          <h3 className="follow-us-title">Follow Us</h3>
          <ul className="footer-list">
            <SocialMediaItem
              url="https://facebook.com"
              icon="/socialmedia/Facebook.png"
            />
            <SocialMediaItem
              url="https://instagram.com"
              icon="/socialmedia/Instagram.png"
            />
            <SocialMediaItem
              url="https://linkedin.com"
              icon="/socialmedia/LinkedIn.png"
            />
          </ul>
        </div>
      </footer>
      <p className="copyright">&copy; 2026 Readiculous. All rights reserved.</p>
    </div>
  );
}
