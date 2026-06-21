import React, { createContext, useState, useEffect, useContext } from "react";
import { LOCAL_STORAGE_KEY, INITIAL_APP_STATE } from "../utils/constants";
import { extractCleanGenres } from "../components/BookCard/BookCard";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [appData, setAppData] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : INITIAL_APP_STATE;
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
  }, [appData]);

  const showPopup = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToProgress = (book) => {
    const cleanGenres = book.cleanGenres || extractCleanGenres(book.subject);

    const isAdded =
      appData.inProgressBooks.some((b) => b.key === book.key) ||
      appData.finishedBooks.some((b) => b.key === book.key);

    if (!isAdded) {
      const bookWithStart = {
        ...book,
        cleanGenres: cleanGenres,
        startedAt: new Date().toISOString(),
      };

      setAppData((prev) => ({
        ...prev,
        inProgressBooks: [...prev.inProgressBooks, bookWithStart],
      }));
      showPopup(`"${book.title}" added to progress!`, "success");
    } else {
      showPopup(
        "You are already reading this book or have finished it.",
        "error",
      );
    }
  };

  const finishBook = (bookKey) => {
    const bookToFinish = appData.inProgressBooks.find((b) => b.key === bookKey);
    if (bookToFinish) {
      const finishedBook = {
        ...bookToFinish,
        finishedAt: new Date().toISOString(),
      };

      setAppData((prev) => ({
        ...prev,
        inProgressBooks: prev.inProgressBooks.filter((b) => b.key !== bookKey),
        finishedBooks: [...prev.finishedBooks, finishedBook],
      }));
      showPopup("Book marked as finished! 🎉", "success");
    }
  };

  const removeFromProgress = (bookKey) => {
    setAppData((prev) => ({
      ...prev,
      inProgressBooks: prev.inProgressBooks.filter((b) => b.key !== bookKey),
    }));
    showPopup("Book removed from progress.", "success");
  };

  return (
    <BookContext.Provider
      value={{
        userProfile: appData.userProfile,
        inProgressBooks: appData.inProgressBooks,
        finishedBooks: appData.finishedBooks,
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

export const useBooks = () => useContext(BookContext);
