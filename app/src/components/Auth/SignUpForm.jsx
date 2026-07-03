import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { createUser } from "../../api/authApi.js";
import { useNavigate } from "react-router-dom";
import {
  sanitizeEmailInput,
  sanitizeNumberInput,
  sanitizeTextInput,
} from "../../utils/forms.js";

function SignUpForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dailyGoalMinutes: "",
    yearlyGoalBooks: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const newUser = {
      name: sanitizeTextInput(formData.name),
      email: sanitizeEmailInput(formData.email),
      password: formData.password,
      dailyGoalMinutes: sanitizeNumberInput(formData.dailyGoalMinutes),
      yearlyGoalBooks: sanitizeNumberInput(formData.yearlyGoalBooks),
      favoriteGenres: [],
      readingStreak: {
        currentStreak: 0,
        lastCompletedDate: "",
        currentWeekProgress: [false, false, false, false, false, false, false],
      },
    };

    try {
      const createdUser = await createUser(newUser);
      setUser(createdUser);
      navigate("/profile");
    } catch (error) {
      setMessage("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={50}
          required
          placeholder="Your name"
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your email"
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Set a password (min 6 characters)"
        />
      </label>

      <label>
        Daily reading goal (minutes)
        <input
          name="dailyGoalMinutes"
          type="number"
          min="1"
          max="300"
          placeholder="30"
          value={formData.dailyGoalMinutes}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Yearly book goal
        <input
          name="yearlyGoalBooks"
          type="number"
          min="1"
          max="100"
          placeholder="Set your yearly book goal"
          value={formData.yearlyGoalBooks}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="auth-submit-button" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>

      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default SignUpForm;
