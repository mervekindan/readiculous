import { useState } from "react";
import SignUpForm from "./SignUpForm.jsx";
import LoginForm from "./LoginForm.jsx";
import "./Auth.css";

function AuthSection() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <section className="auth-section">
      <div className="auth-tabs">
        <button
          type="button"
          onClick={() => setActiveTab("signup")}
          className={activeTab === "signup" ? "active-tab" : ""}
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={activeTab === "login" ? "active-tab" : ""}
        >
          Login
        </button>
      </div>

      {activeTab === "signup" ? <SignUpForm /> : <LoginForm />}
    </section>
  );
}

export default AuthSection;
