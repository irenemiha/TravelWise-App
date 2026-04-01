import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Search, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// IMPORTURI FIREBASE
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export function ChangeDestination() {
  const navigate = useNavigate();
  const { id } = useParams(); // Luăm ID-ul călătoriei din URL
  
  const [newDestination, setNewDestination] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!newDestination.trim() || !id) {
      toast.error("Te rugăm să introduci o destinație.");
      return;
    }

    setIsSaving(true);
    try {
      // Generăm URL-ul imaginii noi pe baza destinației
      const cityOnly = newDestination.split(",")[0].trim();
      const newImageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cityOnly + " landscape")}&w=1200&h=800&c=7`;

      const tripRef = doc(db, "trips", id);
      await updateDoc(tripRef, {
        destination: newDestination,
        image: newImageUrl // Actualizăm și imaginea de fundal
      });

      toast.success("Destinație actualizată cu succes!");
      navigate(-1); // Ne întoarcem la setări
    } catch (error) {
      console.error("Error updating destination:", error);
      toast.error("Eroare la actualizarea destinației.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setNewDestination(city);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Schimbă Destinația</h1>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            placeholder="Ex: Roma, Italia" 
            className="w-full p-4 pl-12 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 outline-none transition-all shadow-sm font-bold"
          />
        </div>

        {/* Sugestii */}
        <div className="space-y-3">
          <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
            Sugestii populare
          </p>
          <div className="space-y-2">
            {["Londra", "Barcelona", "Tokyo", "Paris"].map((city) => (
              <button 
                key={city} 
                onClick={() => handleSuggestionClick(city)}
                className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all active:scale-[0.98] ${
                  newDestination === city 
                    ? "bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800" 
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                }`}
              >
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-100">{city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSave}
          disabled={isSaving || !newDestination.trim()}
          className="w-full py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Salvează Noua Destinație"
          )}
        </button>
      </div>
    </div>
  );
}