import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// IMPORTURI FIREBASE
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export function VoteNotifications() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tripId = id || "";

  const [settings, setSettings] = useState({
    everyVote: true,
    summary: false,
    chatAlerts: true
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. ASCULTĂM SETĂRILE DIN FIRESTORE
  useEffect(() => {
    if (!tripId) return;

    const tripRef = doc(db, "trips", tripId);
    const unsubscribe = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        // Verificăm dacă avem deja obiectul de setări, altfel folosim default-ul
        if (data.voteSettings) {
          setSettings(data.voteSettings);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tripId]);

  // 2. LOGICA DE UPDATE ÎN TIMP REAL
  const toggle = async (key: keyof typeof settings) => {
    if (!tripId) return;

    const newSettings = { ...settings, [key]: !settings[key] };
    setIsUpdating(true);

    try {
      const tripRef = doc(db, "trips", tripId);
      await updateDoc(tripRef, {
        voteSettings: newSettings
      });
      toast.success("Preferințe actualizate!");
    } catch (error) {
      console.error("Notification settings error:", error);
      toast.error("Nu s-au putut salva modificările.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-10 transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Alerte Voturi</h1>
      </div>

      <div className="p-6 space-y-4 max-w-md mx-auto">
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2">
          Preferințe Notificări pentru acest Trip
        </p>

        <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y dark:divide-gray-800 shadow-sm overflow-hidden transition-all ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Fiecare vot */}
          <label className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <p className="font-bold text-gray-900 dark:text-gray-100">Fiecare vot nou</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                Primești notificare instant când cineva votează o atracție.
              </p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.everyVote} 
              onChange={() => toggle('everyVote')} 
              className="w-6 h-6 rounded-lg accent-pink-500 cursor-pointer" 
            />
          </label>

          {/* Rezumat zilnic */}
          <label className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <p className="font-bold text-gray-900 dark:text-gray-100">Rezumat zilnic</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                Un singur raport seara cu toate voturile zilei pentru a evita spam-ul.
              </p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.summary} 
              onChange={() => toggle('summary')} 
              className="w-6 h-6 rounded-lg accent-pink-500 cursor-pointer" 
            />
          </label>

          {/* Alerte pe Chat */}
          <label className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <p className="font-bold text-gray-900 dark:text-gray-100">Alerte pe Chat</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                Să apară mesaje automate în chat când se votează ceva.
              </p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.chatAlerts} 
              onChange={() => toggle('chatAlerts')} 
              className="w-6 h-6 rounded-lg accent-pink-500 cursor-pointer" 
            />
          </label>
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
          <p className="text-xs text-pink-700 dark:text-pink-400 font-medium text-center leading-relaxed">
            Aceste setări sunt salvate în cloud și se aplică doar pentru acest grup. Restul membrilor vor primi notificările conform acestor reguli.
          </p>
        </div>
      </div>
    </div>
  );
}