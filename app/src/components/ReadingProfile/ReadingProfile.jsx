import { useState } from "react";
import "./ReadingProfile.css";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";

function ReadingProfile() {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <section className="reading-profile">
      <h1>Reading Profile</h1>

      {showSignUp ? (
        <SignUp onSwitchToSignIn={() => setShowSignUp(false)} />
      ) : (
        <SignIn onSwitchToSignUp={() => setShowSignUp(true)} />
      )}
    </section>
  );
}

export default ReadingProfile;
