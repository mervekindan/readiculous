import { useState, useEffect } from "react";
import "./BookCard.css";
import { ALLOWED_GENRES } from "../../utils/genres";

function extractCleanGenres(apiSubjects) {
  if (!apiSubjects || !Array.isArray(apiSubjects)) return ["Other"];

  const foundGenres = new Set();

  apiSubjects.forEach((subject) => {
    const clean = subject.toLowerCase();

    ALLOWED_GENRES.forEach((genre) => {
      if (clean.includes(genre)) {
        const formattedGenre = genre
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        if (formattedGenre === "Sci-Fi") {
          foundGenres.add("Sci-Fi");
        } else if (formattedGenre === "Science Fiction") {
          foundGenres.add("Sci-Fi");
        } else {
          foundGenres.add(formattedGenre);
        }
      }
    });
  });

  return foundGenres.size > 0
    ? Array.from(foundGenres).slice(0, 3)
    : ["Fiction"];
}

export default function BookCard({
  book,
  onAdd,
  onFinish,
  onRemove,
  variant = "catalog",
  isAdded = false,
}) {
  const hasCover = window.navigator.onLine && book.cover_i;
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const isBestseller = book.subject?.some((s) =>
    s.toLowerCase().includes("bestseller"),
  );

  const genres = extractCleanGenres(book.subject);

  return (
    <div
      className={`book-card ${isBestseller ? "bestseller-card" : ""} ${variant !== "catalog" ? "mini-card" : ""}`}
    >
      {variant === "progress" && (
        <button
          className="delete-cross-btn"
          onClick={() => onRemove(book.key)}
          title="Remove book"
        >
          ✕
        </button>
      )}
      <div className="book-cover-wrapper">
        {isBestseller && (
          <span className="bestseller-badge">Bestseller 🔥</span>
        )}

        {hasCover ? (
          <img src={coverUrl} alt={book.title} />
        ) : (
          <div className="no-cover-placeholder">
            <span className="no-cover-icon">📖</span>
            <span className="no-cover-text">No Cover</span>
          </div>
        )}
      </div>
      <div className="book-card-info">
        <h3>{book.title}</h3>
        <p>Author: {book.author_name?.[0] || "Unknown Author"}</p>
        <div className="tags">
          {genres.map((genre, idx) => (
            <span key={idx} className="tag">
              {genre}
            </span>
          ))}
        </div>

        {variant === "catalog" && (
          <button
            onClick={() => onAdd(book)}
            disabled={isAdded}
            className={isAdded ? "added-btn" : ""}
          >
            {isAdded ? "Added ✓" : "Add ➕"}
          </button>
        )}

        {variant === "progress" && (
          <button className="finish-btn" onClick={() => onFinish(book.key)}>
            Finished ✓
          </button>
        )}

        {variant === "finished" && (
          <span className="completed-badge">Done 🎉</span>
        )}
      </div>
    </div>
  );
}
