import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"; // Am adăugat useNavigate
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { SplashScreen } from "./components/SplashScreen";
import { Navigation } from "./components/Navigation";
import { Compass } from "lucide-react";

export function Root() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Hook pentru navigare
  const isChatPage = location.pathname.startsWith("/chat");

  useEffect(() => {
    // 1. SALVARE LINK INVITAȚIE (Pentru useri ne-logați)
    // Dacă detectăm un link de trip cu invite, îl punem în "memorie"
    if (location.pathname.includes("/trip/") && location.search.includes("invite=true")) {
      localStorage.setItem("redirectAfterLogin", location.pathname + location.search);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // 2. REDIRECȚIONARE DUPĂ LOGIN
      // Dacă tocmai s-a logat și avem un link salvat în memorie
      if (currentUser) {
        const redirectTo = localStorage.getItem("redirectAfterLogin");
        if (redirectTo) {
          localStorage.removeItem("redirectAfterLogin"); // Ștergem din memorie să nu se repete
          navigate(redirectTo); // Îl trimitem direct la pagina de invitație
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]); // Adăugăm navigate la dependențe

  if (loading) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 flex items-center justify-center">
         <Compass className="w-12 h-12 text-white/20 animate-pulse" />
      </div>
    );
  }

  // 1. DACĂ NU E LOGAT: Arătăm doar Splash-ul
  if (!user) {
    return <SplashScreen />;
  }

  // 2. DACĂ E LOGAT: Arătăm conținutul
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <main>
        <Outlet />
      </main>
      
      {!isChatPage && <Navigation />}
    </div>
  );
}