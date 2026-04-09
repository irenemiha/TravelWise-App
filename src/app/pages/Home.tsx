import { Link } from "react-router";
import { Plus, Users, Calendar, MapPin, TrendingUp, Compass, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc, getDocs } from "firebase/firestore";

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  participants: string[];
  ownerId: string;
  votesCount?: number; // Acest camp va fi calculat acum live
  itinerary?: any[];
}

export function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);
  const [realVotesTotal, setRealVotesTotal] = useState(0); // State nou pentru totalul de voturi

  // 1. FETCH DATE TRIPS + CALCULARE LIVE VOTURI
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "trips"),
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const tripsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Trip[];
      
      setTrips(tripsData);
      
      // LOGICĂ NOUĂ: Calculăm totalul real de voturi din sub-colecții
      let totalVotesFound = 0;
      
      for (const trip of tripsData) {
        try {
          const votesRef = collection(db, "trips", trip.id, "attractionVotes");
          const votesSnap = await getDocs(votesRef);
          
          votesSnap.docs.forEach(vDoc => {
            const vData = vDoc.data();
            // Adunăm toate voturile pozitive și negative (sau doar prezența lor)
            // Dacă vrei să numeri doar câți oameni au votat în total:
            if (vData.voters) {
              totalVotesFound += Object.keys(vData.voters).length;
            }
          });
        } catch (err) {
          console.error("Error counting votes for trip:", trip.id, err);
        }
      }
      
      setRealVotesTotal(totalVotesFound);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching trips:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getDisplayImage = (trip: Trip) => {
    const cityName = (trip.destination || 'travel').split(',')[0].trim();
    const isBroken = !trip.image || 
                     trip.image === "" || 
                     trip.image.includes("loremflickr") || 
                     trip.image.includes("picsum.photos") || 
                     trip.image.includes("teleport");

    if (isBroken) {
      return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cityName + " city travel landscape")}&w=1200&h=800&c=1&p=0`;
    }
    return trip.image;
  };

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

  const calculateTripStatus = (trip: Trip): "planning" | "voting" | "confirmed" => {
    const itinerary = trip.itinerary || [];
    const hasActivities = itinerary.some((day: any) => day.activities && day.activities.length > 0);
    const isItineraryComplete = itinerary.length > 0 && 
                                itinerary.every((day: any) => day.activities && day.activities.length > 0);

    if (isItineraryComplete) return "confirmed";
    if (hasActivities) return "voting";
    return "planning";
  };

  const getStatusBadge = (trip: Trip) => {
    const status = calculateTripStatus(trip);
    switch (status) {
      case "planning":
        return <div className="flex items-center top-2 bg-blue-600/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">Planificare</div>;
      case "voting":
        return <div className="flex items-center top-2 bg-purple-600/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">Votare</div>;
      case "confirmed":
        return <div className="flex items-center top-2 bg-green-600/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg">Confirmat</div>;
    }
  };

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
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Călătoriile mele</h1>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">Gestionează aventurile tale și descoperă noi destinații</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          {[
            { label: "Călătorii", value: trips.length, icon: Calendar, color: "text-blue-500" },
            { label: "Membri", value: trips.reduce((acc, t) => acc + (t.participants?.length || 0), 0), icon: Users, color: "text-purple-500" },
            { label: "Locații", value: Array.from(new Set(trips.map(t => t.destination))).length, icon: MapPin, color: "text-green-500" },
            // MODIFICARE: Aici folosim realVotesTotal calculat live
            { label: "Voturi", value: realVotesTotal, icon: TrendingUp, color: "text-orange-500" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-[24px] border border-gray-100 dark:border-gray-800 flex flex-col items-center shadow-sm">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <Link
          to="/new-trip"
          className="w-full mb-8 bg-blue-600 dark:bg-blue-600 text-white font-black uppercase text-xs tracking-widest px-6 py-5 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          Creează călătorie nouă
        </Link>

        <div className="flex flex-col gap-6 w-full pb-4">
          {trips.length === 0 && <p className="text-gray-400 dark:text-gray-600 text-sm italic">Nu ai nicio călătorie planificată încă.</p>}
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 transition-all">
              <Link to={`/trip/${trip.id}`} className="w-full">
                <div className="relative h-52 w-full overflow-hidden flex">
                  <ImageWithFallback
                    src={getDisplayImage(trip)}
                    alt={trip.destination}
                    className="w-full h-full min-w-full min-h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-5 left-5">{getStatusBadge(trip)}</div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">{trip.name}</h3>
                  <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-blue-500" /> {trip.destination}</span>
                    <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-4 h-4 text-purple-500" /> {formatTripDates(trip.startDate, trip.endDate)}</span>
                  </div>
                </div>
              </Link>
                
              <div className="flex border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <Link to={`/chat/${trip.id}`} className="flex-1 py-5 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest active:bg-blue-50 dark:active:bg-gray-800 transition-colors"><MessageCircle className="w-5 h-5" /> Chat</Link>
                <div className="w-[1px] bg-gray-100 dark:bg-gray-800" />
                <button onClick={(e) => handleDeleteClick(e, trip.id)} className="flex-1 py-5 flex items-center justify-center gap-2 text-red-500 dark:text-red-400 font-bold text-xs uppercase tracking-widest active:bg-red-50 dark:active:bg-gray-800 transition-colors"><Trash2 className="w-5 h-5" /> Șterge</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog isOpen={tripToDelete !== null} title="Șterge călătoria" message="Ești sigur că vrei să elimini această aventură?" onConfirm={confirmDelete} onCancel={() => setTripToDelete(null)} confirmText="Șterge" cancelText="Anulează" />
    </div>
  );
}