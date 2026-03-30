import { useNavigate } from "react-router";
import { toast } from "sonner";
import { 
  ArrowLeft, Bell, Moon, MapPin, Globe, Shield, HelpCircle, 
  ChevronRight, Lock, Trash2, Sun
} from "lucide-react";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

export function Settings() {
  const navigate = useNavigate();
  
  // 1. Inițializăm starea verificând localStorage, apoi sistemul, apoi default false
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return document.documentElement.classList.contains("dark");
  });

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 2. Efect pentru aplicarea modului și salvarea persistentei în localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleDeleteAccount = () => {
    toast.error("Contul a fost șters definitiv.");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10 flex items-center p-4 shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors mr-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white flex-1 text-center pr-10">Setări Aplicație</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col gap-6 mt-2">
        
        {/* Preferințe Generale */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-5 transition-colors">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Preferințe Generale</h2>
          
          {/* Notificări */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Notificări Push</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 ${notifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800 -mx-4"></div>

          {/* Dark Mode Toggle - PERSISTENT */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-2.5 rounded-full transition-colors">
                {darkMode ? (
                  <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Mod Întunecat</span>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 ${darkMode ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800 -mx-4"></div>

          {/* GPS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 dark:bg-green-900/30 p-2.5 rounded-full transition-colors">
                <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Locație GPS</span>
            </div>
            <button 
              onClick={() => setLocation(!location)}
              className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 ${location ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${location ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Cont și Securitate */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-2 transition-colors">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Cont și Securitate</h2>
          
          <button 
            onClick={() => toast.info("Setări limbă...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-2.5 rounded-full">
                <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Limbă (Română)</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>

          <button 
            onClick={() => toast.info("Modificare parolă...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2.5 rounded-full">
                <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Schimbă Parola</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>

          <button 
            onClick={() => toast.info("Setări confidențialitate...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-cyan-50 dark:bg-cyan-900/30 p-2.5 rounded-full">
                <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Confidențialitate</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>
        </div>

        {/* Suport și Pericol */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-2 transition-colors">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Asistență</h2>
          
          <button 
            onClick={() => toast.info("Deschidere centru suport...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full">
                <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">Centru de Suport</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-800 mx-1 my-2"></div>

          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-3 p-3 -mx-3 bg-white dark:bg-gray-900 rounded-xl"
          >
            <div className="bg-red-100 dark:bg-red-900/50 p-2.5 rounded-full">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-500" />
            </div>
            <span className="font-bold text-red-600 dark:text-red-500">Șterge Contul Definitiv</span>
          </button>
        </div>
        
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Ștergere Cont"
        message="Atenție! Această acțiune este ireversibilă. Toate datele tale și istoricul călătoriilor vor fi șterse definitiv. Ești sigur?"
        confirmText="Șterge Contul"
        cancelText="Anulează"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}