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
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            Planificare
          </span>
        );
      case "voting":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
            Votare
          </span>
        );
      case "confirmed":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            Confirmat
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="w-full px-4 flex flex-col items-center text-center">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-1 text-gray-900">
            Călătoriile mele
          </h1>
          <p className="text-sm text-gray-600">
            Gestionează și planifică aventurile tale
          </p>
        </div>

        {/* Stats - Grid layout for mobile */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 mb-2 w-full">
              <Calendar className="w-5 h-5 text-blue-600 mb-1" />
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wide">Călătorii</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{trips.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 mb-2 w-full">
              <Users className="w-5 h-5 text-purple-600 mb-1" />
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wide">Membri</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {trips.reduce((acc, trip) => acc + trip.members, 0)}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 mb-2 w-full">
              <MapPin className="w-5 h-5 text-green-600 mb-1" />
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wide">Destinații</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{trips.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1 mb-2 w-full">
              <TrendingUp className="w-5 h-5 text-orange-600 mb-1" />
              <div className="text-gray-500 text-xs font-bold uppercase tracking-wide">Voturi active</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {trips.reduce((acc, trip) => acc + trip.votes, 0)}
            </div>
          </div>
        </div>

        {/* New Trip Button */}
        <Link
          to="/new-trip"
          className="w-full mb-6 bg-blue-600 text-white font-bold px-6 py-4 rounded-xl active:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Creează călătorie nouă
        </Link>

        {/* Trips List */}
        <div className="flex flex-col gap-4 w-full">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col items-center text-center"
            >
              <Link
                to={`/trip/${trip.id}`}
                className="w-full active:scale-[0.98] transition-transform"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <ImageWithFallback
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex justify-end w-full px-3">
                    {getStatusBadge(trip.status)}
                  </div>
                </div>
                <div className="p-4 flex flex-col items-center w-full">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {trip.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {trip.dates}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      {trip.members} membri
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between w-full text-sm font-bold px-4 mb-2">
                    <div className="text-gray-600">
                      {trip.attractions} atracții
                    </div>
                    <div className="text-blue-600">
                      {trip.votes} voturi
                    </div>
                  </div>
                </div>
              </Link>
                
              <div className="w-full border-t border-gray-100 flex mt-auto">
                <Link 
                  to={`/chat/${trip.id}`} 
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-blue-600 font-bold active:bg-blue-50 transition-colors"
                  title="Deschide chat-ul grupului"
                >
                  <MessageCircle className="w-5 h-5" /> Chat
                </Link>
                <div className="w-[1px] bg-gray-100" />
                <button 
                  onClick={(e) => handleDeleteClick(e, trip.id)} 
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-red-500 font-bold active:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" /> Șterge
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {trips.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl mb-2 text-gray-900">
                Nicio călătorie încă
              </h3>
              <p className="text-gray-600 mb-6">
                Începe să planifici prima ta aventură cu prietenii
              </p>
              <Link
                to="/new-trip"
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all inline-flex items-center justify-center w-full max-w-xs mx-auto"
              >
                Creează prima călătorie
              </Link>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={tripToDelete !== null}
        title="Șterge călătoria"
        message="Ești sigur că vrei să ștergi această călătorie? Această acțiune nu poate fi anulată."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </div>
  );
}