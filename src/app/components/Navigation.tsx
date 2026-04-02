import { Link, useLocation } from "react-router";
import { Compass, User, PlusCircle, Bell, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function Navigation() {
  const { pathname } = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  // 1. ASCULTĂM NOTIFICĂRILE NECITITE ÎN TIMP REAL
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  const NAV_ITEMS = [
    { path: "/", label: "Călătorii", icon: Compass },
    { path: "/new-trip", label: "Adaugă", icon: PlusCircle },
    { 
      path: "/notifications", 
      label: "Notificări", 
      icon: Bell, 
      badgeCount: unreadCount 
    },
    { path: "/profile", label: "Profil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 border-t border-white/10 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.4)] transition-colors">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto px-6">
        {NAV_ITEMS.map((item) => {
          // Logica de Active îmbunătățită:
          // Dacă e "/" trebuie să fie fix "/", altfel verificăm dacă path-ul începe cu ruta respectivă
          const isActive = item.path === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.path);
            
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-3 gap-1.5 transition-all duration-300 ${
                isActive 
                  ? "text-blue-100/90 scale-110" 
                  : "text-blue-100/80 hover:text-blue-200"
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isActive ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-blue-950 animate-in zoom-in duration-300">
                    {item.badgeCount > 9 ? "9+" : item.badgeCount}
                  </span>
                ) : null}
              </div>

              <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                isActive ? "opacity-100 translate-y-0" : "opacity-70"
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