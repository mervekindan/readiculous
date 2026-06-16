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
      // This route can be removed and replaced with your own page
      {
        path: "nested",
        element: <TestPage />,
      },
      {
        path: "profile",
        element: <ReadingProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
