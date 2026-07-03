import { useEffect, useState } from "react";
import "./Loader.css";

import bunnyImg from "../../assets/avatar/bunny.jpg";
import foxImg from "../../assets/avatar/foxy.jpg";
import owlImg from "../../assets/avatar/owl.jpg";
import bearImg from "../../assets/avatar/bear.jpg";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="book-loader-overlay">
      <div className="loader-container">
        <div className="book-wrapper">
          <div className="book-cover"></div>

          <div className="book-page page-left">
            <div className="page-lines"></div>
          </div>
          <div className="book-page page-right">
            <div className="page-lines"></div>
          </div>

          <div className="book-page flipping-page-1">
            <div className="page-lines"></div>
          </div>
          <div className="book-page flipping-page-2">
            <div className="page-lines"></div>
          </div>
        </div>

        <div className="floating-animals">
          <img src={owlImg} alt="owl" className="floating-pet pet-1" />
          <img src={foxImg} alt="fox" className="floating-pet pet-2" />
          <img src={bunnyImg} alt="bunny" className="floating-pet pet-3" />
          <img src={bearImg} alt="bear" className="floating-pet pet-4" />
        </div>

        <h2 className="loader-text">Opening your library...</h2>
      </div>
    </div>
  );
}
