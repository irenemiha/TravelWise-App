import { Link, useLocation } from "react-router";
import { Compass, User, PlusCircle, Bell } from "lucide-react";

export function Navigation() {
  const { pathname } = useLocation();

  // În mod normal, badgeCount ar veni dintr-un Store (Zustand/Redux) sau Context
  const unreadNotifications = 3; 

  const NAV_ITEMS = [
    { path: "/", label: "Călătorii", icon: Compass, badgeCount: 0 },
    { path: "/new-trip", label: "Adaugă", icon: PlusCircle, badgeCount: 0 },
    { 
      path: "/notifications", 
      label: "Notificări", 
      icon: Bell, 
      badgeCount: unreadNotifications // Aici activăm badge-ul
    },
    { path: "/profile", label: "Profil", icon: User, badgeCount: 0 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-purple-900 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.3)] h-16">
      <div className="flex justify-between items-center h-full px-6 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 ${
                isActive ? "text-white scale-105" : "text-blue-300 hover:text-blue-100"
              }`}
            >
              {/* Container pentru Iconiță + Badge */}
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-transform ${isActive ? "fill-white/20" : ""}`} 
                />
                
                {/* Badge-ul de notificări */}
                {item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-blue-900">
                    {item.badgeCount}
                  </span>
                )}
              </div>

              {/* <span className="text-[10px] font-bold tracking-wide opacity-90">
                {item.label}
              </span>
               */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}