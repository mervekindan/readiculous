import React, { createContext, useState, useEffect, useContext } from "react";
import { LOCAL_STORAGE_KEY, INITIAL_APP_STATE } from "../utils/constants";
import { extractCleanGenres } from "../components/BookCard/BookCard";
import { getTodayDate, getTodayIndex } from "../utils/date.js";

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

    const isBestseller =
      book.isBestseller ??
      (book.subject?.some((s) => s.toLowerCase().includes("bestseller")) ||
        false);

    const isAdded =
      appData.inProgressBooks.some((b) => b.key === book.key) ||
      appData.finishedBooks.some((b) => b.key === book.key);

    if (!isAdded) {
      const bookWithStart = {
        ...book,
        cleanGenres: cleanGenres,
        isBestseller: isBestseller,
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

  function completeReadingToday() {
    const today = getTodayDate();
    const todayIndex = getTodayIndex();

    if (appData.readingStreak?.lastCompletedDate === today) {
      showPopup("You already completed today's reading goal.", "error");
      return;
    }
    setAppData((prev) => {
      const currentWeekProgress = prev.readingStreak?.currentWeekProgress || [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];

      const updatedWeekProgress = [...currentWeekProgress];
      updatedWeekProgress[todayIndex] = true;

      return {
        ...prev,
        readingStreak: {
          currentStreak: (prev.readingStreak?.currentStreak || 0) + 1,
          lastCompletedDate: today,
          currentWeekProgress: updatedWeekProgress,
        },
      };
    });

    showPopup("Today's reading goal completed!", "success");
  }

  return (
    <BookContext.Provider
      value={{
        userProfile: appData.userProfile,
        inProgressBooks: appData.inProgressBooks,
        finishedBooks: appData.finishedBooks,
        readingStreak: appData.readingStreak,
        notification,
        setNotification,
        addToProgress,
        finishBook,
        removeFromProgress,
        completeReadingToday,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () => useContext(BookContext);
