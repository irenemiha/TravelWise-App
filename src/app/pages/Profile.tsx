import { User, Settings, LogOut, Heart, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ConfirmDialog } from "../components/ConfirmDialog";

export function Profile() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center transition-colors duration-300">
      {/* Header Profile */}
      <div className="w-full max-w-md shadow-sm flex flex-col items-center text-center transition-colors">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Alexandru Popescu</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">alexandru.popescu@example.com</p>
        
        <div className="flex gap-4 mt-6 w-full">
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 flex flex-col items-center border border-transparent dark:border-blue-900/30">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">12</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Călătorii</span>
          </div>
          <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 flex flex-col items-center border border-transparent dark:border-purple-900/30">
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">48</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Atracții</span>
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="w-full max-w-md mt-6 flex flex-col gap-4 items-center relative">

        <Link 
          to="/edit-profile"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Editează Profil</span>
        </Link>

        <Link 
          to="/saved-attractions"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Atracții Salvate</span>
        </Link>

        <Link 
          to="/notifications"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Notificări</span>
        </Link>

        <Link 
          to="/settings"
          className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 dark:active:bg-gray-800 active:scale-95 border dark:border-gray-800 transition-all text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
            <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-300">Setări Aplicație</span>
        </Link>

        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-50 dark:bg-red-900/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-red-100 dark:active:bg-red-900/20 active:scale-95 border border-transparent dark:border-red-900/30 transition-all text-center"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <LogOut className="w-6 h-6 text-red-600 dark:text-red-500" />
          </div>
          <span className="font-bold text-red-600 dark:text-red-500">Deconectare</span>
        </button>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Deconectare"
        message="Ești sigur că vrei să te deconectezi de la contul tău?"
        confirmText="Deconectare"
        cancelText="Anulează"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}