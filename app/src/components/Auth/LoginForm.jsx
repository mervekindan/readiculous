import { useState } from "react";
import { getUserByEmail } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginForm() {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const savedUser = await getUserByEmail(
        formData.email.trim().toLowerCase(),
      );

      if (!savedUser) {
        setMessage("No account found. Please sign up first.");
        return;
      }

      if (savedUser.password !== formData.password) {
        setMessage("Incorrect password.");
        return;
      }

      setUser(savedUser);
      setMessage("Logged in successfully!");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Login</button>

      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default LoginForm;
