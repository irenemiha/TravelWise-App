import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Trash2,
  ArrowLeft,
  Plus,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Map,
  Lock,
  Play
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ConfirmDialog } from "../components/ConfirmDialog";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  doc, 
  onSnapshot, 
  collection, 
  updateDoc, 
  setDoc,
  deleteDoc
} from "firebase/firestore";

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  time: string;
  duration: string;
  price: string;
  type: "meal" | "attraction" | "break" | "transport";
  day: number;
  image?: string;
  lat?: number;
  lng?: number;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

// --- FUNCTII UTILITARE REPARATE ȘI OPTIMIZATE ---

const calculateDayTimeRange = (activities: Activity[]) => {
  if (!activities || activities.length === 0) return "Fără activități";
  return `${activities[0].time} - ${activities[activities.length - 1].time}`;
};

// Curăță textul pentru a preveni trimiterea de nume duplicate către Google Maps
const getCleanQuery = (act: Activity) => {
  const name = act.name || "";
  const loc = act.location || "";
  
  if (loc.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(loc.toLowerCase())) {
    return encodeURIComponent(loc);
  }
  return encodeURIComponent(name + " " + loc);
};

const generateGoogleMapsRouteUrl = (activities: Activity[]) => {
  if (!activities || activities.length === 0) return "#";
  
  const origin = getCleanQuery(activities[0]);
  if (activities.length === 1) {
    return `http://maps.google.com/?q=${origin}`;
  }
  
  const destination = getCleanQuery(activities[activities.length - 1]);
  const waypoints = activities
    .slice(1, -1)
    .map(act => getCleanQuery(act))
    .join("|");
  
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=driving`;
};


export function Itinerary() {
  const { id } = useParams();
  const tripId = id || "";
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState<any>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [proposedAttractions, setProposedAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("member"); 
  const [votesData, setVotesData] = useState<{[key: string]: any}>({});

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: "activity" | null;
    activityId: string | null;
  }>({ isOpen: false, type: null, activityId: null });

  const formatCalendarDate = (dayNumber: number) => {
    if (!trip?.startDate) return `Ziua ${dayNumber}`;
    try {
      const start = new Date(trip.startDate);
      start.setDate(start.getDate() + (dayNumber - 1));
      return start.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return `Ziua ${dayNumber}`;
    }
  };

  const getMaxDaysCount = () => {
    if (!trip?.startDate || !trip?.endDate) return 1;
    try {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch (e) { return 1; }
  };

  const calculateTotalDaysDuration = () => {
    if (!trip?.startDate || !trip?.endDate) return "";
    try {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return `${diffDays} Zile`;
    } catch (e) { return ""; }
  };

  useEffect(() => {
    if (!tripId) return;

    const tripRef = doc(db, "trips", tripId);
    const unsubTrip = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setTrip({ id: snap.id, ...data });
        if (auth.currentUser?.uid === data.ownerId) setCurrentUserRole("admin");
      }
    });

    const votesRef = collection(db, "trips", tripId, "attractionVotes");
    const unsubVotes = onSnapshot(votesRef, (snapshot) => {
      const votesMap: any = {};
      snapshot.docs.forEach(doc => { votesMap[doc.id] = doc.data(); });
      setVotesData(votesMap);
    });

    return () => { unsubTrip(); unsubVotes(); };
  }, [tripId]);

  useEffect(() => {
    if (!tripId) return;

    const itineraryRef = collection(db, "trips", tripId, "itinerary");
    const unsubItinerary = onSnapshot(itineraryRef, (snapshot) => {
      const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProposedAttractions(items);
      setLoading(false);
    });

    return () => unsubItinerary();
  }, [tripId]);

  // --- LOGICĂ NOUĂ ACTIVATĂ AUTOMAT: GENERARE DUPĂ DEPARTAJARE PRIN VOTURI (UPVOTES - DOWNVOTES) ---
  useEffect(() => {
    if (trip?.votingStatus !== "finished" || proposedAttractions.length === 0) {
      setItinerary([]);
      return;
    }

    // 1. Luăm în calcul atât Like-urile (+1) cât și Dislike-urile (-1) pentru ordonare democratică
    const scored = proposedAttractions.map(act => {
      const votes = votesData[act.id] || { up: 0, down: 0 };
      const score = (votes.up || 0) - (votes.down || 0); 
      return { ...act, score };
    }).sort((a, b) => b.score - a.score); // Sortează descrescător după popularitatea netă

    const totalDays = getMaxDaysCount();
    
    // 2. Selectăm doar topul absolut în limita zilelor disponibile (Zile * 5 atracții maxim)
    const topCandidates = scored.slice(0, totalDays * 5);

    const daysArray: ItineraryDay[] = [];
    const defaultHours = ["10:00", "12:30", "15:00", "17:30", "20:00"];

    for (let d = 1; d <= totalDays; d++) {
      // Extragem pachetul ordonat de câte 5 elemente destinat exclusiv zilei curente
      const daySlice = topCandidates.slice((d - 1) * 5, d * 5);
      
      if (daySlice.length > 0) {
        // Distribuim direct pe ore fixe conform topului net de voturi (fără calcul de locație)
        const finalizedActivities = daySlice.map((act, idx) => ({
          ...act,
          day: d,
          time: defaultHours[idx] || "12:00"
        })) as Activity[];

        daysArray.push({
          day: d,
          date: `Ziua ${d}`,
          activities: finalizedActivities
        });
      }
    }

    setItinerary(daysArray);
  }, [trip?.votingStatus, proposedAttractions, votesData]);

  const handleVote = async (activityId: string, type: "up" | "down") => {
    if (!auth.currentUser || !tripId || trip?.votingStatus === "finished") return;
    const userId = auth.currentUser.uid;
    const voteDocRef = doc(db, "trips", tripId, "attractionVotes", activityId);
    const currentData = votesData[activityId] || { up: 0, down: 0, voters: {} };
    const previousVote = currentData.voters?.[userId] || null;
    let newUp = currentData.up || 0;
    let newDown = currentData.down || 0;
    let newVoters = { ...(currentData.voters || {}) };

    if (previousVote === type) { 
      newUp = type === "up" ? newUp - 1 : newUp; 
      newDown = type === "down" ? newDown - 1 : newDown; 
      delete newVoters[userId]; 
    } else {
      if (previousVote === "up") newUp--; 
      if (previousVote === "down") newDown--;
      if (type === "up") newUp++; else newDown++;
      newVoters[userId] = type;
    }
    await setDoc(voteDocRef, { up: Math.max(0, newUp), down: Math.max(0, newDown), voters: newVoters });
  };

  const toggleVotingStatus = async () => {
    if (currentUserRole !== "admin") return;
    const nextStatus = trip?.votingStatus === "finished" ? "active" : "finished";
    await updateDoc(doc(db, "trips", tripId), { votingStatus: nextStatus });
    toast.success(nextStatus === "finished" ? "Votare încheiată! Itinerariul optimizat a fost generat." : "Votare redeschisă pentru propuneri.");
  };

  const confirmDelete = async () => {
    if (!tripId || !deleteDialog.activityId) return;
    try {
      await deleteDoc(doc(db, "trips", tripId, "itinerary", deleteDialog.activityId));
      toast.success("Propunere eliminată!");
    } catch (e) { toast.error("Eroare la ștergere."); }
    setDeleteDialog({ isOpen: false, type: null, activityId: null });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  const isVotingActive = trip?.votingStatus !== "finished";

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-34 text-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-400 hover:text-gray-900 transition-colors active:scale-90"><ArrowLeft className="w-6 h-6 stroke-[2.5]" /></Link>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-bold truncate">Itinerariu {trip?.destination?.split(',')[0]}</h1>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">
                <span>{trip?.participants?.length || 0} Membri</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-blue-600 dark:text-blue-400">{calculateTotalDaysDuration()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
        {currentUserRole === "admin" && (
          <button 
            onClick={toggleVotingStatus}
            className={`w-full mb-6 py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border shadow-lg ${
              isVotingActive 
                ? "bg-red-600 hover:bg-red-700 text-white border-transparent" 
                : "bg-green-600 hover:bg-green-700 text-white border-transparent"
            }`}
          >
            {isVotingActive ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isVotingActive ? "Stop Votare (Generează Plan)" : "Redeschide Sesiune Vot"}</span>
          </button>
        )}

        {isVotingActive ? (
          <div className="w-full space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-5 rounded-2xl text-center">
              <h4 className="text-sm font-black uppercase text-amber-800 dark:text-amber-400 tracking-wider">Sesiune Votare Activă</h4>
              <p className="text-xs text-amber-600 dark:text-amber-500/90 mt-1 font-medium">Fiecare membru poate propune și vota atracții. Când adminul oprește votarea, topul va genera automat itinerariul pe zile!</p>
            </div>

            <Link to={`/explore/${tripId}`} className="w-full bg-blue-600 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
              <Plus className="w-5 h-5" /> Propune atracții noi
            </Link>

            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mt-4">Locații propuse în grup ({proposedAttractions.length})</h3>

            <div className="space-y-4 w-full">
              {proposedAttractions.map((activity) => {
                const persistentVote = votesData[activity.id] || { up: 0, down: 0, voters: {} };
                const userVote = persistentVote.voters?.[auth.currentUser?.uid || ""] || null;

                return (
                  <div key={activity.id} className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0"><ImageWithFallback src={activity.image} className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{activity.name}</h4>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{activity.location}</p>
                      
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleVote(activity.id, "up")} className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${userVote === "up" ? "bg-green-500 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500"}`}><ThumbsUp className="w-3 h-3" /> {persistentVote.up || 0}</button>
                        <button onClick={() => handleVote(activity.id, "down")} className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${userVote === "down" ? "bg-red-500 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500"}`}><ThumbsDown className="w-3 h-3" /> {persistentVote.down || 0}</button>
                      </div>
                    </div>
                    {currentUserRole === "admin" && (
                      <button onClick={() => setDeleteDialog({ isOpen: true, type: "activity", activityId: activity.id })} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-12">
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 p-4 rounded-2xl text-center text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">
              ✨ Itinerariu validat prin vot majoritar
            </div>

            {itinerary.length === 0 ? (
              <p className="text-center text-gray-400 italic py-10 text-sm">Nicio atracție propusă nu a primit suficiente voturi pentru a popula zilele.</p>
            ) : itinerary.map((day) => (
              <div key={day.day} className="w-full flex flex-col items-center gap-6">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 rounded-[1.5rem] w-full flex flex-col items-center relative text-center shadow-md">               
                  <div className="text-sm font-medium opacity-90 mb-1">Ziua {day.day}</div>
                  <div className="text-2xl font-bold mb-3">{formatCalendarDate(day.day)}</div>
                  
                  <div className="bg-black/15 border border-white/10 px-6 py-2 rounded-xl w-full max-w-[240px] flex flex-col items-center gap-0.5 mb-4">
                    <span className="text-xs font-semibold opacity-95">{day.activities.length} activități selectate în top</span>
                    <span className="text-base font-bold tracking-wide">{calculateDayTimeRange(day.activities)}</span>
                  </div>

                  <a href={generateGoogleMapsRouteUrl(day.activities)} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"><Map className="w-3.5 h-3.5 text-blue-600" /> Vezi traseul pe hartă</a>
                </div>

                <div className="w-full space-y-6 flex flex-col items-center">
                  {day.activities.map((activity, idx) => {
                    const cleanMapUrl = `https://www.google.com/maps/search/?api=1&query=${getCleanQuery(activity)}`;
                    return (
                      <div key={activity.id} className="w-full bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden relative max-w-sm">
                        <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-md text-white font-black text-xs w-6 h-6 rounded-full flex items-center justify-center border border-white/20">{idx + 1}</div>
                        <div className="h-48 w-full relative"><ImageWithFallback src={activity.image} className="w-full h-full object-cover" /></div>
                        
                        <div className="p-5 flex flex-col items-center text-center w-full">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 px-2">{activity.name}</h3>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 px-4 line-clamp-2">{activity.description}</p>
                          
                          <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100/50 dark:border-gray-800/80">
                            <a href={cleanMapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-2.5 hover:underline" title="Deschide în Google Maps"><MapPin className="w-4 h-4 shrink-0" /> <span className="text-xs font-bold truncate max-w-[200px]">{activity.location}</span></a>
                            <div className="flex justify-center items-center gap-6 text-xs font-semibold text-gray-500 border-t border-gray-200/50 pt-2">
                              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" /> {activity.time}</div>
                              <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-green-500" /> {activity.price || "Gratuit"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={deleteDialog.isOpen} title="Șterge propunerea" message="Ești sigur? Locația va fi eliminată definitiv din pool-ul de votare." onConfirm={confirmDelete} onCancel={() => setDeleteDialog({ isOpen: false, type: null, activityId: null })} />
    </div>
  );
}