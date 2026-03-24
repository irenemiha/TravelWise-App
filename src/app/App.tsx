import { RouterProvider } from "react-router";
import { appRouter } from "./appRoutes";
import { Toaster } from "sonner";

export default function App() {
  // Adding a unique id to force React Router to fully reload its route configuration
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider key="main-router" router={appRouter} />
    </>
  );
}
