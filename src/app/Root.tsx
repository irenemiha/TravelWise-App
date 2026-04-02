import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { SplashScreen } from "./components/SplashScreen";
import { Navigation } from "./components/Navigation"; // Asigură-te că importul e corect
import { Loader2, Compass } from "lucide-react";

export function Root() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-blue-600 flex items-center justify-center">
         <Compass className="w-12 h-12 text-white/20 animate-pulse" />
      </div>
    );
  }

  // 1. DACĂ NU E LOGAT: Arătăm doar Splash-ul (Fără Navbar)
  if (!user) {
    return <SplashScreen />;
  }

  // 2. DACĂ E LOGAT: Arătăm Navbar-ul ȘI restul paginilor (Outlet)
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Navbar-ul va fi vizibil pe toate paginile interne */}
      <Navigation />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}