import React from "react";
import { useBooks } from "../../context/BookContext";
import "./ProgressPage.css";
import BookCard from "../BookCard/BookCard";

export default function ProgressPage() {
  const { inProgressBooks, finishedBooks, finishBook, removeFromProgress } =
    useBooks();

  const totalBooks = inProgressBooks.length + finishedBooks.length;
  const completionPercentage =
    totalBooks > 0 ? Math.round((finishedBooks.length / totalBooks) * 100) : 0;

  return (
    <div className="progress-page-container">
      <h2 className="page-title">Reading Progress</h2>

      <div className="analytics-section">
        <h3>Statistics</h3>
        <p>Total books added: {totalBooks}</p>
        <p>
          Finished books: {finishedBooks.length} of {totalBooks}
        </p>

        <div className="chart-container">
          <div
            className="chart-bar"
            style={{ width: `${completionPercentage}%` }}
          >
            {completionPercentage > 0 && `${completionPercentage}%`}
          </div>
        </div>
      </div>

      <div className="progress-columns">
        <div className="progress-column">
          <h3 className="column-title">
            Books in Progress ({inProgressBooks.length})
          </h3>
          <div className="progress-grid">
            {inProgressBooks.length === 0 ? (
              <p className="empty-text">No books in progress.</p>
            ) : (
              inProgressBooks.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  variant="progress"
                  onFinish={finishBook}
                  onRemove={removeFromProgress}
                />
              ))
            )}
          </div>
        </div>

        <div className="progress-column">
          <h3 className="column-title">
            Finished Books ({finishedBooks.length})
          </h3>
          <div className="progress-grid">
            {finishedBooks.length === 0 ? (
              <p className="empty-text">No finished books yet.</p>
            ) : (
              finishedBooks.map((book) => (
                <BookCard key={book.key} book={book} variant="finished" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
