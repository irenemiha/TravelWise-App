import { useNavigate, useParams } from "react-router";
import { 
  ChevronLeft, 
  Users, 
  Map, 
  Bell, 
  Lock, 
  Trash2, 
  ChevronRight,
  ShieldCheck,
  UserPlus,
  EyeOff,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { mockTrips } from "../store";
import { useState } from "react";

export function TripSettings() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const trip = mockTrips.find(t => t.id === id) || { name: "Călătorie" };

  const confirmDelete = () => {
    toast.error(`Călătoria "${trip.name}" a fost ștearsă.`);
    setIsDeleteModalOpen(false);
    navigate("/");
  };

  const SettingItem = ({ icon: Icon, title, subtitle, onClick, color = "text-gray-600" }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 active:bg-gray-50 dark:active:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-[15px] font-bold text-gray-900 dark:text-gray-100">{title}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
    </button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-4 py-4 flex items-center border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <div className="ml-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">Setări Călătorie</h1>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">{trip.name}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Grup & Membri */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Grup & Membri</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
            <SettingItem 
              icon={Users} 
              title="Gestionează Membri" 
              onClick={() => navigate(`/manage-members/${id}`)}
              color="text-blue-600 dark:text-blue-400"
            />
            <SettingItem 
              icon={UserPlus} 
              title="Permisiuni Invitație" 
              onClick={() => navigate(`/invitation-permissions/${id}`)}
              color="text-purple-600 dark:text-purple-400"
            />
          </div>
        </div>

        {/* Planificare */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Planificare</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
            <SettingItem icon={Map} title="Modifică Destinația" onClick={() => navigate(`/change-destination/${id}`)} color="text-orange-600 dark:text-orange-400" />
            <SettingItem icon={ShieldCheck} title="Confidențialitate" onClick={() => navigate(`/privacy-settings/${id}`)} color="text-green-600 dark:text-green-400" />
            <SettingItem icon={EyeOff} title="Ascunde Itinerariul" onClick={() => navigate(`/hide-itinerary/${id}`)} color="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        {/* Alerte */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">Alerte Călătorie</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
            <SettingItem icon={Bell} title="Alerte Voturi" onClick={() => navigate(`/vote-notifications/${id}`)} color="text-pink-600 dark:text-pink-400" />
            <SettingItem icon={Lock} title="Blochează Itinerariul" onClick={() => navigate(`/lock-itinerary/${id}`)} color="text-red-400 dark:text-red-500" />
          </div>
        </div>

        {/* Buton Ștergere */}
        <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 font-bold rounded-2xl active:scale-[0.98] transition-all border border-red-100 dark:border-red-900/30 mt-8 shadow-sm"
        >
          <Trash2 className="w-5 h-5" />
          Șterge Călătoria
        </button>
      </div>

      {/* --- MODALUL DE STERGERE (POP-UP) --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 w-full max-w-xs text-center shadow-2xl border dark:border-gray-800 animate-in fade-in zoom-in duration-200 transition-colors">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Ștergi călătoria?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Sigur vrei să ștergi <span className="font-bold text-gray-900 dark:text-white">{trip.name}</span>? Toate datele grupului vor fi pierdute definitiv.
            </p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={confirmDelete} 
                className="w-full py-4 bg-red-600 dark:bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none active:scale-95 transition-transform"
              >
                Șterge
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded-2xl font-bold active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}