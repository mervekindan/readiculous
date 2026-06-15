import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [inProgressBooks, setInProgressBooks] = useState([]);

  const [finishedBooks, setFinishedBooks] = useState([]);

  const addToProgress = (book) => {
    const alreadyReading = inProgressBooks.some((b) => b.key === book.key);
    const alreadyFinished = finishedBooks.some((b) => b.key === book.key);

    if (!alreadyReading && !alreadyFinished) {
      setInProgressBooks([...inProgressBooks, book]);
      alert(`"${book.title}" added to your progress!`);
    } else {
      alert("You are already reading this book or have finished it.");
    }
  };

  const finishBook = (bookKey) => {
    const bookToFinish = inProgressBooks.find((b) => b.key === bookKey);
    if (bookToFinish) {
      setInProgressBooks(inProgressBooks.filter((b) => b.key !== bookKey));

      setFinishedBooks([...finishedBooks, bookToFinish]);
    }
  };

  const removeFromProgress = (bookKey) => {
    setInProgressBooks(inProgressBooks.filter((b) => b.key !== bookKey));
  };

  return (
    <BookContext.Provider
      value={{
        inProgressBooks,
        finishedBooks,
        addToProgress,
        finishBook,
        removeFromProgress,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooks = () => useContext(BookContext);
