import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const savedUser = await getUserByEmail(
        formData.email.trim().toLowerCase(),
      );

      if (!savedUser) {
        setError("No account found. Please sign up first.");
        return;
      }

      if (savedUser.password !== formData.password) {
        setError("Incorrect password.");
        return;
      }

      setUser(savedUser);
      setSuccess("Logged in successfully!");
      navigate("/profile");
    } catch (error) {
      setError(
        "Oops! No account found with this email. Please create an account first.",
      );
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

      {error && (
        <p className="error-message">
          {error}

          {error.includes("No account found") && (
            <>
              {" "}
              <Link to="/?auth=signup">Sign Up</Link>
            </>
          )}
        </p>
      )}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
}

export default LoginForm;
