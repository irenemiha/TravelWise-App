import { User, Settings, LogOut, Heart, Bell, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center">
      {/* Header Profile */}
      <div className="bg-white w-full max-w-md px-4 py-8 shadow-sm flex flex-col items-center text-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Alexandru Popescu</h1>
        <p className="text-gray-500 text-sm">alexandru.popescu@example.com</p>
        
        <div className="flex gap-4 mt-6 w-full">
          <div className="flex-1 bg-blue-50 rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl font-bold text-blue-600">12</span>
            <span className="text-xs text-gray-600">Călătorii</span>
          </div>
          <div className="flex-1 bg-purple-50 rounded-xl p-3 flex flex-col items-center">
            <span className="text-xl font-bold text-purple-600">48</span>
            <span className="text-xs text-gray-600">Atracții</span>
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="w-full max-w-md px-4 mt-6 flex flex-col gap-3 items-center relative">

        <Link 
          to="/edit-profile"
          className="w-full bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 active:scale-95 transition-all text-center"
        >
          <div className="bg-gray-100 p-3 rounded-full">
            <User className="w-6 h-6 text-gray-700" />
          </div>
          <span className="font-bold text-gray-700">Editează Profil</span>
        </Link>

        <Link 
          to="/saved-attractions"
          className="w-full bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 active:scale-95 transition-all text-center"
        >
          <div className="bg-gray-100 p-3 rounded-full">
            <Heart className="w-6 h-6 text-gray-700" />
          </div>
          <span className="font-bold text-gray-700">Atracții Salvate</span>
        </Link>

        <Link 
          to="/notifications"
          className="w-full bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 active:scale-95 transition-all text-center"
        >
          <div className="bg-gray-100 p-3 rounded-full">
            <Bell className="w-6 h-6 text-gray-700" />
          </div>
          <span className="font-bold text-gray-700">Notificări</span>
        </Link>

        <Link 
          to="/settings"
          className="w-full bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm active:bg-gray-50 active:scale-95 transition-all text-center"
        >
          <div className="bg-gray-100 p-3 rounded-full">
            <Settings className="w-6 h-6 text-gray-700" />
          </div>
          <span className="font-bold text-gray-700">Setări Aplicație</span>
        </Link>

        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 mt-4 shadow-sm active:bg-red-100 active:scale-95 transition-all text-center"
        >
          <div className="bg-red-100 p-3 rounded-full">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
          <span className="font-bold text-red-600">Deconectare</span>
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
