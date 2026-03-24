import { Link, useLocation } from "react-router";
import { Compass, User, PlusCircle, Bell } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-purple-900 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.15)] h-16">
      <div className="flex justify-between items-center h-full px-6 max-w-md mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            location.pathname === "/" ? "text-white" : "text-blue-300 hover:text-blue-100"
          }`}
        >
          <Compass className={`w-6 h-6 ${location.pathname === "/" ? "fill-white/20" : ""}`} />
          <span className={`text-[10px] font-bold ${location.pathname === "/" ? "text-white" : "text-blue-300"}`}>
            Călătorii
          </span>
        </Link>

        <Link
          to="/new-trip"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            location.pathname === "/new-trip" ? "text-white" : "text-blue-300 hover:text-blue-100"
          }`}
        >
          <PlusCircle className={`w-6 h-6 ${location.pathname === "/new-trip" ? "fill-white/20" : ""}`} />
          <span className={`text-[10px] font-bold ${location.pathname === "/new-trip" ? "text-white" : "text-blue-300"}`}>
            Adaugă
          </span>
        </Link>

        <Link
          to="/notifications"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            location.pathname === "/notifications" ? "text-white" : "text-blue-300 hover:text-blue-100"
          }`}
        >
          <Bell className={`w-6 h-6 ${location.pathname === "/notifications" ? "fill-white/20" : ""}`} />
          <span className={`text-[10px] font-bold ${location.pathname === "/notifications" ? "text-white" : "text-blue-300"}`}>
            Notificări
          </span>
        </Link>
        
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            location.pathname === "/profile" ? "text-white" : "text-blue-300 hover:text-blue-100"
          }`}
        >
          <User className={`w-6 h-6 ${location.pathname === "/profile" ? "fill-white/20" : ""}`} />
          <span className={`text-[10px] font-bold ${location.pathname === "/profile" ? "text-white" : "text-blue-300"}`}>
            Profil
          </span>
        </Link>
      </div>
    </nav>
  );
}