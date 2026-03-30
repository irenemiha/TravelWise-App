import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router"; // sau "react-router-dom"
import { appRouter } from "./app/appRoutes"; // Asigură-te că calea e corectă către fișierul cu rutele
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={appRouter} />
);