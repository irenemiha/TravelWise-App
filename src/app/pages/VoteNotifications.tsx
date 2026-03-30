import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export function VoteNotifications() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    everyVote: true,
    summary: false,
    chatAlerts: true
  });

  const toggle = (key: keyof typeof settings) => 
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

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
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Alerte Voturi</h1>
      </div>

      <div className="p-6 space-y-4 max-w-md mx-auto">
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 mb-2">
          Preferințe Notificări
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y dark:divide-gray-800 shadow-sm overflow-hidden transition-colors">
          {/* Fiecare vot */}
          <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
          </div>

          {/* Rezumat zilnic */}
          <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
          <p className="text-xs text-pink-700 dark:text-pink-400 font-medium text-center">
            Setările de mai sus se aplică doar pentru această călătorie. Poți seta alerte diferite pentru alte destinații.
          </p>
        </div>
      </div>
    </div>
  );
}