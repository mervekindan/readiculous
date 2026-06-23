import "./HomePage.css";
import AuthSection from "../Auth/AuthSection.jsx";

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Grow a little every day.</h1>
          <p>
            Set your goal, start a reading session, and keep your streak alive.
            One chapter today can change where you'll be tomorrow.
          </p>
          <button>Start building a habit</button>
        </div>
      </section>
      <AuthSection />
    </>
  );
}

export default HomePage;
