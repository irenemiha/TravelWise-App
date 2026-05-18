import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  allowedRole?: "admin" | "user";
}

export function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem("isAdminLoggedIn");
        localStorage.removeItem("userRole");
        setIsChecking(false);
        return;
      }

      setIsAuthenticated(true);
      
      // Preluăm din cache. Dacă nu există, va fi null
      let currentRole = localStorage.getItem("userRole");

      // Dacă nu există în local storage, interogăm Firestore
      if (!currentRole) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // Dacă din greșeală câmpul role nu e setat în Firestore, punem implicit "user"
            currentRole = userDoc.data().role || "user";
          } else {
            currentRole = "user";
          }
        } catch (error) {
          console.error("Eroare la verificarea rolului:", error);
          currentRole = "user";
        }
        
        // Salvăm sigur ca string în localStorage
        localStorage.setItem("userRole", currentRole);
        localStorage.setItem("isAdminLoggedIn", currentRole === "admin" ? "true" : "false");
      }

      setUserRole(currentRole);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-950 via-purple-950 to-fuchsia-950 flex flex-col items-center justify-center p-6 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-2" />
        <p className="text-xs font-black uppercase tracking-widest text-blue-200/60">Securizare Sesiune...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole === "admin" && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (allowedRole === "user" && userRole === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />;
}