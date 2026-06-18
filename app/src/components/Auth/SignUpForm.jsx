import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { createUser } from "../../api/authApi.js";

function SignUpForm() {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

  async function handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      dailyGoalMinutes: Number(formData.dailyGoalMinutes),
      yearlyGoalBooks: Number(formData.yearlyGoalBooks),
    };
    try {
      const createdUser = await createUser(newUser);
      setUser(createdUser);
      setMessage("Account created successfully!");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
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
          minLength={6}
          value={formData.password}
          onChange={handleChange}
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
