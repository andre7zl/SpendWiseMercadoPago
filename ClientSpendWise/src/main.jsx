import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GastoPage from "./pages/GastoPage.jsx";
import AddCategoria from "./pages/AddCategoria.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/gasto",
    element: <GastoPage />,
  },
  {
    path: "/add-categoria",
    element: <AddCategoria />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
