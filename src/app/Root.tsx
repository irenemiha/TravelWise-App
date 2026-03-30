import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation";

export function Root() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-15">
      <Outlet />
      <Navigation />
    </div>
  );
}
