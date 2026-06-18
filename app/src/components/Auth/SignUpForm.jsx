import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function SignUpForm() {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    dailyGoalMinutes: "",
    yearlyGoalBooks: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: formData.name.trim(),
      dailyGoalMinutes: Number(formData.dailyGoalMinutes),
      yearlyGoalBooks: Number(formData.yearlyGoalBooks),
    };

    localStorage.setItem("readingUser", JSON.stringify(newUser));
    setUser(newUser);
    setMessage("Account created successfully!");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={50}
          required
        />
      </label>

      <label>
        Daily reading goal (minutes)
        <input
          name="dailyGoalMinutes"
          type="number"
          min="1"
          max="300"
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
          value={formData.yearlyGoalBooks}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Create Account</button>

      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default SignUpForm;
