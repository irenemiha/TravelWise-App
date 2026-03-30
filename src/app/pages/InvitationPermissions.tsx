import { useNavigate } from "react-router";
import { ChevronLeft, Check } from "lucide-react";
import { useState } from "react";

export function InvitationPermissions() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("admin");

  const options = [
    { id: "all", title: "Oricine din grup", desc: "Toți membrii pot invita persoane noi." },
    { id: "admin", title: "Doar Administratorii", desc: "Doar tu și ceilalți admini puteți trimite invitații." },
  ];

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
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Permisiuni Invitație</h1>
      </div>

      <div className="p-6 space-y-3 max-w-md mx-auto">
        <p className="text-xs font-black text-gray-400 dark:text-gray-500 tracking-widest uppercase ml-1 mb-4">
          Cine poate trimite link-uri?
        </p>
        
        {options.map((opt) => (
          <button 
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full p-5 rounded-[24px] border text-left transition-all active:scale-[0.98] ${
              selected === opt.id 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold text-lg ${
                selected === opt.id 
                  ? 'text-blue-700 dark:text-blue-400' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {opt.title}
              </span>
              {selected === opt.id && (
                <div className="bg-blue-600 dark:bg-blue-500 p-1 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {opt.desc}
            </p>
          </button>
        ))}

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
            Această setare poate fi modificată oricând de către administratorii călătoriei.
          </p>
        </div>
      </div>
    </div>
  );
}