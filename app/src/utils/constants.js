export const LOCAL_STORAGE_KEY = "readiculous_app_data";

export const INITIAL_APP_STATE = {
  userProfile: {
    dailyTargetMinutes: 20,
    yearlyTargetBooks: 5,
    favoriteGenres: [],
  },
  inProgressBooks: [],
  finishedBooks: [],
  readingStreak: {
    currentStreak: 0,
    lastCompletedDate: null,
  },
};
