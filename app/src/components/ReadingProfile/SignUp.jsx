import { useState } from "react";

function SignUp({ onSwitchToSignIn }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    dailyGoalMinutes: "",
    yearlyGoalBooks: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem("readingUser", JSON.stringify(user));
    alert("Account created! You can now sign in.");

    onSwitchToSignIn();
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>
        Name
        <input name="name" value={user.name} onChange={handleChange} required />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Daily reading goal (minutes)
        <input
          name="dailyGoalMinutes"
          type="number"
          value={user.dailyGoalMinutes}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Yearly book goal
        <input
          name="yearlyGoalBooks"
          type="number"
          value={user.yearlyGoalBooks}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Create Account</button>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToSignIn}>
          Sign In
        </button>
      </p>
    </form>
  );
}

export default SignUp;
