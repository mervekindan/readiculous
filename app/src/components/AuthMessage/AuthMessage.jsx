import { Link } from "react-router-dom";
import "./AuthMessage.css";

function AuthMessage({ title, message, icon = "🔒" }) {
  return (
    <section className="auth-message-card">
      <div className="auth-message-icon">{icon}</div>

      <h1>{title}</h1>

      <p>{message}</p>

      <div className="auth-message-actions">
        <Link className="auth-message-button" to="/?auth=signup">
          Sign Up
        </Link>

        <Link className="auth-message-button secondary" to="/?auth=login">
          Log In
        </Link>
      </div>
    </section>
  );
}

export default AuthMessage;
