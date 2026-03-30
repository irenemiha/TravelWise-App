import { useNavigate } from "react-router";
import { ChevronLeft, Lock, Check } from "lucide-react";
import { useState } from "react";

export function PrivacySettings() {
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-10 transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white transition-colors">
          Confidențialitate
        </h1>
      </div>

      <div className="p-6 space-y-4 max-w-md mx-auto">
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2">
          Setări Vizibilitate
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-colors">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">Călătorie Privată</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                  Doar membrii grupului pot vedea planul și detaliile.
                </p>
              </div>
            </div>
            
            {/* Toggle Custom sau Checkbox standard adaptat */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isPrivate} 
                onChange={() => setIsPrivate(!isPrivate)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Info Box pentru context */}
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
            Când modul privat este activat, călătoria nu va apărea în rezultatele de căutare publice sau în profilul tău public.
          </p>
        </div>
      </div>
    </div>
  );
}