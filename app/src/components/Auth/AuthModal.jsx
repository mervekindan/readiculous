import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignUpForm from "./SignUpForm.jsx";
import LoginForm from "./LoginForm.jsx";
import "./Auth.css";

function AuthModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authMode = searchParams.get("auth");

  const initialTab = authMode === "login" ? "login" : "signup";

  const [activeTab, setActiveTab] = useState(initialTab);
  const dialogRef = useRef(null);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSearchParams({ auth: tab });
  }

  const handleClose = () => {
    dialogRef.current?.close();
    setSearchParams({});
  };

  useEffect(() => {
    const authParam = searchParams.get("auth");

    if (authParam === "login" || authParam === "signup") {
      setActiveTab(authParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (authMode && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!authMode && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [authMode]);

  return (
    <dialog ref={dialogRef} className="auth-dialog" onClose={handleClose}>
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>
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

      {activeTab === "signup" ? (
        <SignUpForm key="signup" />
      ) : (
        <LoginForm key="login" />
      )}
    </dialog>
  );
}

export default AuthModal;
