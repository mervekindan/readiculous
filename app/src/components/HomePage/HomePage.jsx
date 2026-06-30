import "./HomePage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTAButtonClick = () => {
    if (!user) {
      setSearchParams({ auth: "signup" });
    } else {
      navigate("/library");
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Grow a little every day.</h1>
        <p>
          Set your goal, start a reading session, and keep your streak alive.
          One chapter today can change where you'll be tomorrow.
        </p>
        <button onClick={handleCTAButtonClick}>
          {!user ? "Start building a habit" : "Browse your library"}
        </button>
      </div>
    </section>
  );
}

export default HomePage;
