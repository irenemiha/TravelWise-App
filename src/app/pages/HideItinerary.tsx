import { useNavigate, useParams } from "react-router";
import { ChevronLeft, EyeOff, Eye, Info, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// IMPORTURI FIREBASE
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export function HideItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tripId = id || "";

  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. ASCULTĂM STAREA DE VIZIBILITATE DIN FIRESTORE
  useEffect(() => {
    if (!tripId) return;

    const tripRef = doc(db, "trips", tripId);
    const unsubscribe = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        // Folosim field-ul 'isItineraryHidden'
        setIsHidden(data.isItineraryHidden ?? false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tripId]);

  // 2. LOGICA DE TOGGLE REALĂ
  const handleToggle = async () => {
    if (!tripId) return;

    const newState = !isHidden;
    setIsUpdating(true);

    try {
      const tripRef = doc(db, "trips", tripId);
      await updateDoc(tripRef, {
        isItineraryHidden: newState
      });
      
      if (newState) {
        toast.warning("Itinerariul a fost ascuns pentru ceilalți membri!");
      } else {
        toast.success("Itinerariul este acum vizibil pentru tot grupul.");
      }
    } catch (error) {
      console.error("Hide toggle error:", error);
      toast.error("Eroare la schimbarea vizibilității.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-10 transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white transition-colors">Vizibilitate Plan</h1>
      </div>

      <div className="p-6 flex flex-col items-center max-w-md mx-auto">
        {/* Ilustrație Stare */}
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 shadow-lg ${
          isHidden 
            ? 'bg-indigo-600 text-white rotate-12 scale-110' 
            : 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-100 dark:border-indigo-900/50'
        }`}>
          {isHidden ? <EyeOff className="w-12 h-12" /> : <Eye className="w-12 h-12" />}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
            {isHidden ? "Planul este Ascuns" : "Planul este Vizibil"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            {isHidden 
              ? "Doar tu (administratorul) poți vedea locațiile și activitățile selectate. Pentru restul grupului, secțiunea 'Itinerariu' va apărea blocată." 
              : "Toți membrii grupului pot vedea în timp real locațiile confirmate și programul zilnic."}
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-2xl flex gap-3 mb-8 w-full transition-colors">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-snug">
            Poți folosi această opțiune pentru a organiza o <strong>călătorie surpriză</strong> sau pentru a finaliza detaliile înainte de marea dezvăluire.
          </p>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={handleToggle}
          disabled={isUpdating}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
            isHidden 
              ? 'bg-gray-900 dark:bg-indigo-700 shadow-gray-200 dark:shadow-none' 
              : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'
          } disabled:opacity-50`}
        >
          {isUpdating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            isHidden ? "Dezvăluie Itinerariul" : "Ascunde Itinerariul (Surpriză)"
          )}
        </button>
      </div>
    </div>
  );
}