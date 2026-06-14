import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ onSwitchToSignUp }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("readingUser"));

    if (
      savedUser &&
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </label>

      {error && <p>{error}</p>}

      <button type="submit">Sign In</button>

      <p>
        Don't have an account?{" "}
        <button type="button" onClick={onSwitchToSignUp}>
          Sign Up
        </button>
      </p>
    </form>
  );
}

export default SignIn;
