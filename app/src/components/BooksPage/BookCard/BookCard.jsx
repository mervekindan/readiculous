import { useState, useEffect } from "react";
import "./BookCard.css";

const ALLOWED_GENRES = [
  // Fiction & Literature
  "detective",
  "mystery",
  "thriller",
  "crime",
  "suspense",
  "fantasy",
  "fiction",
  "sci-fi",
  "science fiction",
  "dystopia",
  "cyberpunk",
  "horror",
  "gothic",
  "ghost stories",
  "romance",
  "love story",
  "historical fiction",
  "drama",
  "adventure",
  "action",
  "western",

  // Kids & Teens
  "children",
  "comics",
  "manga",
  "teen",

  // Non-Fiction & Science
  "biography",
  "autobiography",
  "memoir",
  "history",
  "politics",
  "philosophy",
  "religion",
  "science",
  "psychology",
  "sociology",
  "economics",
  "business",
  "technology",
  "computers",
  "programming",
];

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

export default function BookCard({ book, onAdd }) {
  const hasCover = window.navigator.onLine && book.cover_i;
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const genres = extractCleanGenres(book.subject);

  return (
    <div className="book-card">
      <div className="book-cover-wrapper">
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
        <button onClick={() => onAdd(book)}>Add ➕</button>
      </div>
    </div>
  );
}
