import { useNavigate } from "react-router";
import { ChevronLeft, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LockItinerary() {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const handleToggle = () => {
    const newState = !isLocked;
    setIsLocked(newState);
    toast.success(newState ? "Itinerariu blocat cu succes!" : "Itinerariu deblocat!");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Stare Itinerariu</h1>
      </div>

      <div className="p-6 flex flex-col items-center text-center max-w-md mx-auto">
        {/* Status Icon Container */}
        <div className={`p-8 rounded-full mb-6 transition-colors duration-500 ${
          isLocked 
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
            : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
        }`}>
          {isLocked ? <Lock className="w-16 h-16" /> : <Unlock className="w-16 h-16" />}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white transition-colors">
          {isLocked ? "Itinerariu Blocat" : "Itinerariu Deschis"}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors">
          {isLocked 
            ? "Nimeni nu mai poate adăuga sau vota atracții noi în acest moment." 
            : "Toți membrii pot adăuga, șterge sau vota elemente din planul de călătorie."}
        </p>

        {/* Toggle Action Button */}
        <button 
          onClick={handleToggle}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
            isLocked 
              ? 'bg-green-600 dark:bg-green-500 shadow-green-100 dark:shadow-none' 
              : 'bg-red-600 dark:bg-red-500 shadow-red-100 dark:shadow-none'
          }`}
        >
          {isLocked ? "Deblochează pentru Editare" : "Blochează Itinerariul"}
        </button>
        
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
           <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">
             <strong>Notă:</strong> Chiar și atunci când este blocat, membrii grupului pot vizualiza în continuare programul stabilit.
           </p>
        </div>
      </div>
    </div>
  );
}