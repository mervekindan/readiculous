import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import BookCard from "../BookCard/BookCard";
import "./BooksPage.css";
import { useBooks } from "../../context/BookContext";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToProgress } = useBooks();

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
    fetchBooks("sherlock");
  }, []);

  const handleAddBook = (book) => {
    addToProgress(book);
  };

  return (
    <div className="books-page-container">
      <SearchBar onSearch={fetchBooks} />
      <h2>Book Catalog</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="books-grid">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                variant="catalog"
                onAdd={handleAddBook}
              />
            ))
          ) : (
            <p>No books found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  );
}
