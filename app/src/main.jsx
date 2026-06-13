import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import "./main.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/profile", element: <TestPage /> },
            { path: "/library", element: <TestPage /> },
            { path: "/progress", element: <TestPage /> },
            { path: "/daily-streak", element: <TestPage /> },
            { path: "/challenges", element: <TestPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
