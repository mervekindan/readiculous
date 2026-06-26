import "./HomePage.css";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCTAButtonClick = () => {
    setSearchParams({ auth: "signup" });
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
          Start building a habit
        </button>
      </div>
    </section>
  );
}

export default HomePage;
