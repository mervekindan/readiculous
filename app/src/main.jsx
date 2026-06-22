import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BookProvider } from "./context/BookContext.jsx";

import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import ReadingProfile from "./components/ReadingProfile/Profile.jsx";
import BooksPage from "./components/BooksPage/BooksPage.jsx";
import ProgressPage from "./components/ProgressPage/ProgressPage.jsx";
import ReadingStreak from "./components/ReadingStreak/ReadingStreak.jsx";
import ChallengesPage from "./components/ChallengesPage/ChallengesPage.jsx";
import AboutPage from "./components/AboutPage/AboutPage.jsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ReadingProfile />,
      },
      {
        path: "library",
        element: <BooksPage />,
      },
      {
        path: "progress",
        element: <ProgressPage />,
      },
      {
        path: "daily-streak",
        element: <ReadingStreak />,
      },
      {
        path: "challenges",
        element: <ChallengesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <RouterProvider router={router} />
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>,
);
