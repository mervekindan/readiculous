import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignUpForm from "./SignUpForm.jsx";
import LoginForm from "./LoginForm.jsx";
import "./Auth.css";

function AuthSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get("auth") === "login" ? "login" : "signup";

  const [activeTab, setActiveTab] = useState(initialTab);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSearchParams({ auth: tab });
  }
  useEffect(() => {
    const authParam = searchParams.get("auth");

    if (authParam === "login" || authParam === "signup") {
      setActiveTab(authParam);
    }
  }, [searchParams]);

  return (
    <section className="auth-section">
      <div className="auth-tabs">
        <button
          type="button"
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? "active-tab" : ""}
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("login")}
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
