import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import BookCard from "../BookCard/BookCard";
import "./BooksPage.css";
import { useBooks } from "../../context/BookContext";
import { useAuth } from "../../context/AuthContext";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToProgress, inProgressBooks, finishedBooks } = useBooks();
  const { user } = useAuth();

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=12&fields=title,author_name,subject,cover_i,key`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong with the API");
      }

      const data = await response.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("potter");
  }, []);

  const handleAddBook = (book) => {
    if (!user) return;
    addToProgress(book);
  };

  return (
    <div className="books-page">
      <div className="books-page-container">
        {!user && (
          <div className="login-prompt-banner">
            Log in to add books to your reading progress.
          </div>
        )}

        <div className="title-container">
          <h1 className="page-title">Book Catalog</h1>
          <SearchBar onSearch={fetchBooks} />
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
        {loading ? (
          <p className="loading-text">Loading books...</p>
        ) : (
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book) => {
                const isAdded =
                  inProgressBooks.some((b) => b.key === book.key) ||
                  finishedBooks.some((b) => b.key === book.key);

                return (
                  <BookCard
                    key={book.key}
                    book={book}
                    variant="catalog"
                    onAdd={handleAddBook}
                    isAdded={isAdded}
                  />
                );
              })
            ) : (
              <p className="loading-text">
                No books found. Try another search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
