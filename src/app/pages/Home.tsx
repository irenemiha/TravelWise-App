import { Link } from "react-router";
import { Plus, Users, Calendar, MapPin, TrendingUp, Compass, Trash2, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { mockTrips, Trip, deleteTrip } from "../store";
import { ConfirmDialog } from "../components/ConfirmDialog";

export function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  useEffect(() => {
    setTrips([...mockTrips]);
  }, []);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setTripToDelete(id);
  };

  const confirmDelete = () => {
    if (tripToDelete) {
      deleteTrip(tripToDelete);
      setTrips([...mockTrips]);
      setTripToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTripToDelete(null);
  };

  const getStatusBadge = (status: Trip["status"]) => {
    switch (status) {
      case "planning":
        return (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold shadow-sm">
            Planificare
          </span>
        );
      case "voting":
        return (
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold shadow-sm">
            Votare
          </span>
        );
      case "confirmed":
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-bold shadow-sm">
            Confirmat
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
      <div className="w-full flex flex-col items-center text-center max-w-md mx-auto">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Călătoriile mele
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestionează aventurile tale și descoperă noi destinații
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          {[
            { label: "Călătorii", value: trips.length, icon: Calendar, color: "text-blue-500" },
            { label: "Membri", value: trips.reduce((acc, t) => acc + t.members, 0), icon: Users, color: "text-purple-500" },
            { label: "Locații", value: trips.length, icon: MapPin, color: "text-green-500" },
            { label: "Voturi", value: trips.reduce((acc, t) => acc + t.votes, 0), icon: TrendingUp, color: "text-orange-500" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-[24px] border border-gray-100 dark:border-gray-800 flex flex-col items-center transition-all">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* New Trip Button */}
        <Link
          to="/new-trip"
          className="w-full mb-8 bg-blue-600 dark:bg-blue-600 text-white font-bold px-6 py-4 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black-200 dark:shadow-none"
        >
          <Plus className="w-5 h-5" />
          Creează călătorie nouă
        </Link>

        {/* Trips List */}
        <div className="flex flex-col gap-6 w-full">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 transition-all"
            >
              <Link to={`/trip/${trip.id}`} className="w-full">
                <div className="relative h-48 w-full overflow-hidden">
                  <ImageWithFallback
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(trip.status)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {trip.name}
                  </h3>
                  <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500" /> {trip.destination}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-500" /> {trip.dates}</span>
                  </div>
                </div>
              </Link>
                
              <div className="flex border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <Link 
                  to={`/chat/${trip.id}`} 
                  className="flex-1 py-4 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Chat
                </Link>
                <div className="w-[1px] bg-gray-100 dark:bg-gray-800" />
                <button 
                  onClick={(e) => handleDeleteClick(e, trip.id)} 
                  className="flex-1 py-4 flex items-center justify-center gap-2 text-red-500 dark:text-red-400 font-bold text-sm active:bg-red-50 dark:active:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-5 h-5" /> Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={tripToDelete !== null}
        title="Șterge călătoria"
        message="Ești sigur că vrei să elimini această aventură?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </div>
  );
}