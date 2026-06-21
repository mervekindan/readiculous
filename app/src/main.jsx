import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import ReadingProfile from "./components/ReadingProfile/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./main.css";
import BooksPage from "./components/BooksPage/BooksPage.jsx";
import ProgressPage from "./components/ProgressPage/ProgressPage.jsx";
import { BookProvider } from "./context/BookContext.jsx";
import AboutPage from "./components/AboutPage/AboutPage.jsx";

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
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "progress",
        element: <ProgressPage />,
      },
      {
        path: "profile",
        element: <ReadingProfile />,
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
