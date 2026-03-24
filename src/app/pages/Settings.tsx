import { useNavigate } from "react-router";
import { toast } from "sonner";
import { 
  ArrowLeft, Bell, Moon, MapPin, Globe, Shield, HelpCircle, 
  ChevronRight, Lock, Trash2
} from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

export function Settings() {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    // În mod real ar face call către API, apoi logout
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <div className="bg-white border-b sticky top-0 z-10 flex items-center p-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-10">Setări Aplicație</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col gap-6 mt-2">
        
        {/* Preferințe Generale */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-5">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Preferințe Generale</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2.5 rounded-full">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-bold text-gray-800">Notificări Push</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="h-px bg-gray-100 -mx-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2.5 rounded-full">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-bold text-gray-800">Mod Întunecat</span>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="h-px bg-gray-100 -mx-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2.5 rounded-full">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-bold text-gray-800">Locație GPS</span>
            </div>
            <button 
              onClick={() => setLocation(!location)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${location ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${location ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Cont și Securitate */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Cont și Securitate</h2>
          
          <button 
            onClick={() => toast.info("Setări limbă...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-2.5 rounded-full">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-bold text-gray-800">Limbă (Română)</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => toast.info("Modificare parolă...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2.5 rounded-full">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-bold text-gray-800">Schimbă Parola</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => toast.info("Setări confidențialitate...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-cyan-50 p-2.5 rounded-full">
                <Shield className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="font-bold text-gray-800">Confidențialitate</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Suport și Pericol */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Asistență</h2>
          
          <button 
            onClick={() => toast.info("Deschidere centru suport...")}
            className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2.5 rounded-full">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-bold text-gray-800">Centru de Suport</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="h-px bg-gray-100 mx-1 my-2"></div>

          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-3 p-3 -mx-3 bg-red-50 active:bg-red-100 rounded-xl transition-colors mt-2"
          >
            <div className="bg-red-100 p-2.5 rounded-full">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-bold text-red-600">Șterge Contul Definitiv</span>
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