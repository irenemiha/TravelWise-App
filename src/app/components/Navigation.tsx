import { Link, useLocation } from "react-router";
import { Compass, User, PlusCircle, Bell } from "lucide-react";

export function Navigation() {
  const { pathname } = useLocation();

  // Badge count din store/context
  const unreadNotifications = 3; 

  const NAV_ITEMS = [
    { path: "/", label: "Călătorii", icon: Compass, badgeCount: 0 },
    { path: "/new-trip", label: "Adaugă", icon: PlusCircle, badgeCount: 0 },
    { 
      path: "/notifications", 
      label: "Notificări", 
      icon: Bell, 
      badgeCount: unreadNotifications 
    },
    { path: "/profile", label: "Profil", icon: User, badgeCount: 0 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-purple-900 border-t border-white/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 ${
                isActive ? "text-blue-200 scale-105" : "text-blue-300/70 hover:text-blue-100"
              }`}
            >
              {/* Container Iconiță + Badge */}
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-all ${
                    isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Badge-ul de notificări */}
                {item.badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-blue-900">
                    {item.badgeCount}
                  </span>
                )}
              </div>

              {/* Label sub iconiță */}
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-opacity ${
                isActive ? "opacity-100" : "opacity-100"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}