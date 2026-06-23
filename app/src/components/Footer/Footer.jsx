import { Link } from "react-router-dom";
import { SocialMediaItem } from "../SocialMediaItem/SocialMediaItem";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-description">
        <h3>Readiculous</h3>
        <p>Read more. Become more.</p>
        <p>&copy; 2026 Readiculous, All rights reserved.</p>
      </div>
      <div className="contact-us">
        <h3>Contact Us</h3>
        <Link to="/about" className="footer-faq-link">
          FAQ
        </Link>
        <p>Help</p>
      </div>
      <div className="footer-links">
        <h3>Follow Us</h3>
        <ul className="footer-list">
          <SocialMediaItem
            url="https://facebook.com"
            title="Facebook"
            icon="/socialmedia/Facebook.png"
          />
          <SocialMediaItem
            url="https://instagram.com"
            title="Instagram"
            icon="/socialmedia/Instagram.png"
          />
          <SocialMediaItem
            url="https://linkedin.com"
            title="LinkedIn"
            icon="/socialmedia/LinkedIn.png"
          />
        </ul>
      </div>
    </footer>
  );
}
