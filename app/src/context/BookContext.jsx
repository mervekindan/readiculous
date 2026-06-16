import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [inProgressBooks, setInProgressBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);

  const [notification, setNotification] = useState(null);

  const showPopup = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToProgress = (book) => {
    const alreadyReading = inProgressBooks.some((b) => b.key === book.key);
    const alreadyFinished = finishedBooks.some((b) => b.key === book.key);

    if (!alreadyReading && !alreadyFinished) {
      setInProgressBooks([...inProgressBooks, book]);
      showPopup(`"${book.title}" added to progress!`, "success");
    } else {
      showPopup(
        "You are already reading this book or have finished it.",
        "error",
      );
    }
  };

  const finishBook = (bookKey) => {
    const bookToFinish = inProgressBooks.find((b) => b.key === bookKey);
    if (bookToFinish) {
      setInProgressBooks(inProgressBooks.filter((b) => b.key !== bookKey));

      setFinishedBooks([...finishedBooks, bookToFinish]);
      showPopup("Book marked as finished! 🎉", "success");
    }
  };

  const removeFromProgress = (bookKey) => {
    setInProgressBooks(inProgressBooks.filter((b) => b.key !== bookKey));
    showPopup("Book removed from progress.", "success");
  };

  return (
    <BookContext.Provider
      value={{
        inProgressBooks,
        finishedBooks,
        notification,
        setNotification,
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
