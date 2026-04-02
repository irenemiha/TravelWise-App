import { User, Settings, LogOut, Heart, Bell, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ConfirmDialog } from "../components/ConfirmDialog";

// IMPORTURI FIREBASE
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";

export function Profile() {
  const navigate = useNavigate();
  const { user: contextUser } = useAuth();
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [stats, setStats] = useState({ trips: 0, saved: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  const [realName, setRealName] = useState("");
  const [realEmail, setRealEmail] = useState("");

  useEffect(() => {
    // Folosim onAuthStateChanged pentru a fi siguri că prindem momentul 
    // în care Firebase termină verificarea la Refresh
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        // Dacă după verificare nu există user, oprim loading-ul și probabil ar trebui să redirectăm
        setLoadingStats(false);
        return;
      }

      console.log("👤 User detectat la Refresh:", firebaseUser.uid);

      // 1. Ascultăm datele de profil (Nume, Email, Favorite)
      const userRef = doc(db, "users", firebaseUser.uid);
      const unsubUser = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setRealName(data.name || firebaseUser.displayName || "");
          setRealEmail(data.email || firebaseUser.email || "");
          setStats(prev => ({ 
            ...prev, 
            saved: data.savedAttractions?.length || 0 
          }));
        } else {
          setRealName(firebaseUser.displayName || "");
          setRealEmail(firebaseUser.email || "");
        }
        setLoadingStats(false);
      }, (err) => {
        console.error("Eroare Firestore:", err);
        setLoadingStats(false);
      });

      // 2. Ascultăm călătoriile
      const tripsQuery = query(
        collection(db, "trips"),
        where("participants", "array-contains", firebaseUser.uid)
      );
      const unsubTrips = onSnapshot(tripsQuery, (snap) => {
        setStats(prev => ({ ...prev, trips: snap.size }));
      });

      // Returnăm funcțiile de curățare pentru onSnapshot în interiorul auth-ului
      return () => {
        unsubUser();
        unsubTrips();
      };
    });

    return () => unsubAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const finalName = realName || contextUser?.displayName || "Călător TravelWise";
  const userInitials = finalName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center transition-colors duration-300 pb-20">
      {/* Header Profile */}
      <div className="w-full max-w-md flex flex-col items-center text-center transition-colors">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
          {contextUser?.photoURL ? (
            <ImageWithFallback
              src={contextUser.photoURL}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{userInitials}</span>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {loadingStats ? "Se încarcă..." : finalName}
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {loadingStats ? "" : (realEmail || contextUser?.email)}
        </p>
        
        <div className="flex gap-4 mt-6 w-full">
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex flex-col items-center border border-transparent dark:border-blue-900/30">
            {loadingStats ? <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> : (
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.trips}</span>
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">Călătorii</span>
          </div>
          <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 flex flex-col items-center border border-transparent dark:border-purple-900/30">
            {loadingStats ? <Loader2 className="w-5 h-5 animate-spin text-purple-400" /> : (
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.saved}</span>
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">Salvate</span>
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="w-full max-w-md mt-6 flex flex-col gap-4 items-center relative">
        <Link 
          to="/edit-profile"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Editează Profil</span>
        </Link>

        <Link 
          to="/saved-attractions"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Atracții Salvate</span>
        </Link>

        <Link 
          to="/settings"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Setări Aplicație</span>
        </Link>

        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-50 dark:bg-red-900/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-red-100 dark:active:bg-red-900/20 active:scale-95 border border-transparent dark:border-red-900/30 transition-all text-center"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <LogOut className="w-6 h-6 text-red-600 dark:text-red-500" />
          </div>
          <span className="font-bold text-red-600 dark:text-red-500">Deconectare</span>
        </button>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Deconectare"
        message="Ești sigur că vrei să te deconectezi de la contul tău?"
        confirmText="Deconectare"
        cancelText="Anulează"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}