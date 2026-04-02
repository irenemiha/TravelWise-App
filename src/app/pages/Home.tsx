import { Link } from "react-router";
import { Plus, Users, Calendar, MapPin, TrendingUp, Compass, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc } from "firebase/firestore";

// Definim tipul Trip pentru a se potrivi cu ce salvăm în Firestore
export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  participants: string[];
  ownerId: string;
  votesCount?: number;
  itinerary?: any[];
}

export function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  // --- LOGICA DE FETCH REAL-TIME ---
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "trips"),
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tripsData = snapshot.docs.map(doc => {
        const data = doc.data();
        const tripId = doc.id;
        
        // Luăm doar primul nume din destinație (ex: "Paris" din "Paris, Franța")
        const cityName = (data.destination || 'travel').split(',')[0].trim();
        
        // Generăm un număr unic bazat pe ID-ul călătoriei (Seed)
        const seed = tripId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        return {
          id: tripId,
          ...data,
          // Aceasta este "Poza Fixă": caută orașul și blochează imaginea pe baza ID-ului
          image: `https://loremflickr.com/1200/800/${encodeURIComponent(cityName)},landscape/all?lock=${seed}`
        };
      }) as Trip[];
      
      setTrips(tripsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching trips:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setTripToDelete(id);
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      try {
        await deleteDoc(doc(db, "trips", tripToDelete));
        setTripToDelete(null);
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
  };

  const cancelDelete = () => {
    setTripToDelete(null);
  };

  // --- LOGICĂ CALCUL STATUS DINAMIC (PĂSTRATĂ) ---
  const calculateTripStatus = (trip: Trip): "planning" | "voting" | "confirmed" => {
    const itinerary = trip.itinerary || [];
    const hasActivities = itinerary.some((day: any) => day.activities && day.activities.length > 0);
    const hasVotes = (trip.votesCount || 0) > 0;
    const isItineraryComplete = itinerary.length > 0 && 
                                itinerary.every((day: any) => day.activities && day.activities.length > 0);

    if (isItineraryComplete) return "confirmed";
    if (hasActivities || hasVotes) return "voting";
    return "planning";
  };

  const getStatusBadge = (trip: Trip) => {
    const status = calculateTripStatus(trip);
    switch (status) {
      case "planning":
        return (
          <div className="flex items-center top-2 bg-blue-600/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">
            Planificare
          </div>
        );
      case "voting":
        return (
          <div className="flex items-center top-2 bg-purple-600/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">
            Votare
          </div>
        );
      case "confirmed":
        return (
          <div className="flex items-center top-2 bg-green-600/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg">
            Confirmat
          </div>
        );
    }
  };

  // Helper pentru formatarea datei afișate
  const formatTripDates = (start: string, end: string) => {
    if (!start || !end) return "Data nespecificată";
    const s = new Date(start);
    const e = new Date(end);
    const months = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${s.getDate()} ${months[s.getMonth()]} - ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300 pb-20">
      <div className="w-full flex flex-col items-center text-center max-w-md mx-auto">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Călătoriile mele
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">
            Gestionează aventurile tale și descoperă noi destinații
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          {[
            { label: "Călătorii", value: trips.length, icon: Calendar },
            { label: "Membri", value: trips.reduce((acc, t) => acc + (t.participants?.length || 0), 0), icon: Users },
            { label: "Locații", value: Array.from(new Set(trips.map(t => t.destination))).length, icon: MapPin },
            { label: "Voturi", value: trips.reduce((acc, t) => acc + (t.votesCount || 0), 0), icon: TrendingUp },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-[24px] border border-gray-100 dark:border-gray-800 flex flex-col items-center transition-all shadow-sm">
              <stat.icon className={`w-5 h-5 ${idx === 0 ? 'text-blue-500' : idx === 1 ? 'text-purple-500' : idx === 2 ? 'text-green-500' : 'text-orange-500'} mb-2`} />
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* New Trip Button */}
        <Link
          to="/new-trip"
          className="w-full mb-8 bg-blue-600 dark:bg-blue-600 text-white font-black uppercase text-xs tracking-widest px-6 py-5 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          Creează călătorie nouă
        </Link>

        {/* Trips List */}
        <div className="flex flex-col gap-6 w-full pb-4">
          {trips.length === 0 && (
            <p className="text-gray-400 dark:text-gray-600 text-sm italic">Nu ai nicio călătorie planificată încă.</p>
          )}
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 transition-all"
            >
              <Link to={`/trip/${trip.id}`} className="w-full">
                <div className="relative h-52 w-full overflow-hidden">
                  <ImageWithFallback
                    // Dacă avem imagine în DB o folosim, dacă nu, cerem una de la Unsplash cu numele destinației
                    src={trip.image || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80&sig=${trip.destination}`}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-5 left-5">
                    {getStatusBadge(trip)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                    {trip.name}
                  </h3>
                  <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-blue-500" /> {trip.destination}</span>
                    <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-4 h-4 text-purple-500" /> {formatTripDates(trip.startDate, trip.endDate)}</span>
                  </div>
                </div>
              </Link>
                
              <div className="flex border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <Link 
                  to={`/chat/${trip.id}`} 
                  className="flex-1 py-5 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest active:bg-blue-50 dark:active:bg-gray-800 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Chat
                </Link>
                <div className="w-[1px] bg-gray-100 dark:bg-gray-800" />
                <button 
                  onClick={(e) => handleDeleteClick(e, trip.id)} 
                  className="flex-1 py-5 flex items-center justify-center gap-2 text-red-500 dark:text-red-400 font-bold text-xs uppercase tracking-widest active:bg-red-50 dark:active:bg-gray-800 transition-colors"
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