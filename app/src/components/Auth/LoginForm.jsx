import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { sanitizeEmailInput } from "../../utils/forms.js";

function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
    setSuccess("");
    setIsLoading(false);
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const savedUser = await getUserByEmail(
        sanitizeEmailInput(formData.email),
      );

      if (savedUser.password !== formData.password) {
        setError("Incorrect password.");
        return;
      }

      setUser(savedUser);
      setSuccess("Logged in successfully!");
      setFormData({ email: "", password: "" });
      navigate("/profile");
    } catch (error) {
      setError(
        "Oops! No account found with this email. Please create an account first.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
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
          placeholder="Enter your password"
        />
      </label>

      <button type="submit" className="auth-submit-button" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Login"}
      </button>

      {error && (
        <p className="auth-error-message">
          {error}

          {error.includes("No account found") && (
            <>
              {" "}
              <Link to="?auth=signup">Sign Up</Link>
            </>
          )}
        </p>
      )}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
}

export default LoginForm;
