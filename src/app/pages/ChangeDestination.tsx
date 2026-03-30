import { useNavigate } from "react-router";
import { ChevronLeft, Search, MapPin } from "lucide-react";
import { toast } from "sonner";

export function ChangeDestination() {
  const navigate = useNavigate();
  
  const handleSave = () => {
    toast.success("Destinație actualizată!");
    navigate(-1);
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
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Schimbă Destinația</h1>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Ex: Roma, Italia" 
            className="w-full p-4 pl-12 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 outline-none transition-all shadow-sm"
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
                className="w-full p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-all active:scale-[0.98]"
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
          className="w-full py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-all mt-4"
        >
          Salvează Noua Destinație
        </button>
      </div>
    </div>
  );
}