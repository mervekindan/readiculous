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
  "war",

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

  // Kids & Teens
  "children",
  "comics",
  "manga",
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
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  const genres = extractCleanGenres(book.subject);

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} />
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
