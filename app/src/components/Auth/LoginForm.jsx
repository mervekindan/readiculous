import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginForm() {
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("readingUser"));

    if (!savedUser) {
      setMessage("No account found. Please sign up first.");
      return;
    }

    if (savedUser.name.toLowerCase() !== name.trim().toLowerCase()) {
      setMessage("Name does not match saved user.");
      return;
    }

    setUser(savedUser);
    setMessage("Logged in successfully!");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={50}
          required
        />
      </label>

      <button type="submit">Login</button>

      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default LoginForm;
