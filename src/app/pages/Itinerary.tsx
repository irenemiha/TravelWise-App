import { useParams, Link } from "react-router";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Download,
  Share2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Loader2,
  Edit2,
  ThumbsUp,
  ThumbsDown,
  Wand2,
  Map,
  ChevronDown
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ConfirmDialog } from "../components/ConfirmDialog";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy, 
  deleteDoc, 
  updateDoc, 
  where, 
  getDocs, 
  writeBatch,
  setDoc 
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

const getDistance = (act1: Activity, act2: Activity) => {
  if (!act1.lat || !act1.lng || !act2.lat || !act2.lng) return 0;
  const radlat1 = (Math.PI * act1.lat) / 180;
  const radlat2 = (Math.PI * act2.lat) / 180;
  const theta = act1.lng - act2.lng;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  return dist * 60 * 1.1515 * 1.609344;
};

const optimizeRouteByProximityAndVotes = (activities: Activity[], votesData: any): Activity[] => {
  if (activities.length <= 2) return activities;

  const validPoints = activities.filter((a) => a.lat !== undefined && a.lng !== undefined);
  const invalidPoints = activities.filter((a) => a.lat === undefined || a.lng === undefined);

  if (validPoints.length === 0) return activities;

  const optimized: Activity[] = [];
  let current = validPoints.shift()!;
  optimized.push(current);

  const PROXIMITY_THRESHOLD_KM = 1.5;

  while (validPoints.length > 0) {
    const candidates = validPoints.map((point, index) => {
      const dist = getDistance(current, point);
      const votes = votesData[point.id] || { up: 0, down: 0 };
      const score = (votes.up || 0) - (votes.down || 0);
      return { point, index, dist, score };
    });

    const closePoints = candidates.filter(c => c.dist <= PROXIMITY_THRESHOLD_KM);
    let selectedCandidate;

    if (closePoints.length > 0) {
      closePoints.sort((a, b) => b.score - a.score);
      selectedCandidate = closePoints[0];
    } else {
      candidates.sort((a, b) => a.dist - b.dist);
      selectedCandidate = candidates[0];
    }

    current = validPoints.splice(selectedCandidate.index, 1)[0];
    optimized.push(current);
  }

  return [...optimized, ...invalidPoints];
};

export function Itinerary() {
  const { id } = useParams();
  const tripId = id || "";
  
  const [trip, setTrip] = useState<any>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("member"); 
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [votesData, setVotesData] = useState<{[key: string]: any}>({});
  const [isOptimizedRoute, setIsOptimizedRoute] = useState(true);

  // Meniuri dropdown custom pentru modalul de editare
  const [isEditDayDropdownOpen, setIsEditDayDropdownOpen] = useState(false);
  const [isEditTimeDropdownOpen, setIsEditTimeDropdownOpen] = useState(false);
  const editDayRef = useRef<HTMLDivElement>(null);
  const editTimeRef = useRef<HTMLDivElement>(null);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: "activity" | "day" | null;
    dayIndex: number | null;
    activityId: string | null;
  }>({ isOpen: false, type: null, dayIndex: null, activityId: null });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<{
    activityId: string;
    data: Partial<Activity>;
  } | null>(null);

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

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMin = min.toString().padStart(2, '0');
        const timeString = `${formattedHour}:${formattedMin}`;

        const isAlreadyOccupied = itinerary.some(d => 
          d.day === editingActivity?.data.day && 
          d.activities.some(a => a.time === timeString && a.id !== editingActivity?.activityId)
        );

        if (!isAlreadyOccupied) {
          options.push(timeString);
        }
      }
    }
    return options;
  };

  const generateGoogleMapsRouteUrl = (activities: Activity[]) => {
    if (!activities || activities.length === 0) return "#";
    const locations = activities.map(act => {
      if (act.lat && act.lng) return `${act.lat},${act.lng}`;
      return encodeURIComponent(act.location);
    });

    const origin = locations[0];
    const destination = locations[locations.length - 1];
    if (locations.length === 1) return `https://www.google.com/maps/search/?api=1&query=${origin}`;
    
    const waypoints = locations.slice(1, -1).join("|");
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ""}&travelmode=driving`;
  };

  const formatCalendarDate = (dayNum: number) => {
    if (!trip?.startDate) return `Ziua ${dayNum}`;
    try {
      const start = new Date(trip.startDate);
      start.setDate(start.getDate() + (dayNum - 1));
      return start.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) { return `Ziua ${dayNum}`; }
  };

  const calculateDayTimeRange = (activities: Activity[]) => {
    if (!activities || activities.length === 0) return "--:-- - --:--";
    const startTime = activities[0].time || "00:00";
    const endTime = activities[activities.length - 1].time || "00:00";
    return `${startTime} - ${endTime}`;
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
    const q = query(itineraryRef, orderBy("time", "asc"));

    const unsubItinerary = onSnapshot(q, (snapshot) => {
      const allActivities = snapshot.docs.map(d => {
        const data = d.data();
        const activityId = d.id;
        const activityImage = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(data.name || 'place')}&w=800&h=600&c=1&p=0`;

        return { id: activityId, ...data, image: data.image || activityImage } as Activity;
      });

      const grouped: { [key: number]: Activity[] } = {};
      allActivities.forEach(act => {
        if (!grouped[act.day]) grouped[act.day] = [];
        grouped[act.day].push(act);
      });

      const formattedItinerary: ItineraryDay[] = Object.keys(grouped).map(dayNum => {
        const dayActivities = grouped[parseInt(dayNum)] || [];
        let finalActivities = [...dayActivities];

        if (isOptimizedRoute) {
          finalActivities = optimizeRouteByProximityAndVotes(finalActivities, votesData);
        } else {
          finalActivities.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
        }

        return { day: parseInt(dayNum), date: `Ziua ${dayNum}`, activities: finalActivities };
      }).sort((a, b) => a.day - b.day);

      setItinerary(formattedItinerary);
      setLoading(false);
    });

    return () => unsubItinerary();
  }, [tripId, votesData, isOptimizedRoute]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (editDayRef.current && !editDayRef.current.contains(event.target as Node)) setIsEditDayDropdownOpen(false);
      if (editTimeRef.current && !editTimeRef.current.contains(event.target as Node)) setIsEditTimeDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleVote = async (activityId: string, type: "up" | "down") => {
    if (!auth.currentUser || !tripId) return;
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

  const openEditModal = (activity: Activity) => {
    setEditingActivity({ activityId: activity.id, data: { ...activity } });
    setIsEditModalOpen(true);
  };

  const saveActivityEdit = async () => {
    if (editingActivity && tripId) {
      try {
        const actRef = doc(db, "trips", tripId, "itinerary", editingActivity.activityId);
        await updateDoc(actRef, editingActivity.data);
        setIsEditModalOpen(false);
        setEditingActivity(null);
        toast.success("Salvat!");
      } catch (e) { toast.error("Eroare la salvare."); }
    }
  };

  const confirmDelete = async () => {
    if (!tripId) return;
    try {
      if (deleteDialog.type === "activity" && deleteDialog.activityId) {
        await deleteDoc(doc(db, "trips", tripId, "itinerary", deleteDialog.activityId));
      } else if (deleteDialog.type === "day" && deleteDialog.dayIndex !== null) {
        const dayToDelete = itinerary[deleteDialog.dayIndex].day;
        const q = query(collection(db, "trips", tripId, "itinerary"), where("day", "==", dayToDelete));
        const snap = await getDocs(q);
        const batch = writeBatch(db);
        snap.docs.forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
      toast.success("Eliminat!");
    } catch (e) { toast.error("Eroare la ștergere."); }
    setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null });
  };

  const totalDaysCount = itinerary.length;
  const totalActivitiesCount = itinerary.reduce((acc, day) => acc + day.activities.length, 0);

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-34">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-400 hover:text-gray-900 transition-colors active:scale-90"><ArrowLeft className="w-6 h-6 stroke-[2.5]" /></Link>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">Itinerariu {trip?.destination?.split(',')[0]}</h1>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wider uppercase mt-0.5">
                <span>{trip?.participants?.length || 0} Membri</span>
                {calculateTotalDaysDuration() && (
                  <>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    <span className="text-blue-600 dark:text-blue-400">{calculateTotalDaysDuration()}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <div className="flex gap-2 justify-center w-full mb-4">
          <button onClick={() => { setIsDownloaded(true); toast.success("Salvat!"); setTimeout(() => setIsDownloaded(false), 2000); }} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold px-4 py-2.5 rounded-xl flex-1 text-sm shadow-sm flex items-center justify-center gap-2">
            {isDownloaded ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Download className="w-4 h-4" />}
            <span>Salvat</span>
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copiat!"); }} className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-bold px-4 py-2.5 rounded-xl flex-1 text-sm shadow-sm flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Distribuie</span>
          </button>
        </div>

        <button 
          onClick={() => {
            setIsOptimizedRoute(!isOptimizedRoute);
            toast.success(!isOptimizedRoute ? "Traseu optimizat hibrid (Proximitate + Voturi)!" : "Ordonare resetată cronologic.");
          }}
          className={`w-full mb-6 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all border shadow-sm ${
            isOptimizedRoute 
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent" 
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800"
          }`}
        >
          <Wand2 className={`w-4 h-4 ${isOptimizedRoute ? "animate-pulse" : ""}`} />
          <span>{isOptimizedRoute ? "Traseu Hibrid Activat" : "Activează Optimizarea Traseului"}</span>
        </button>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Total zile</span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{totalDaysCount}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-5 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Activități</span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{totalActivitiesCount}</div>
          </div>
        </div>

        <Link to={`/explore/${tripId}`} className="w-full mb-10 bg-blue-600 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
          <Plus className="w-5 h-5" />
          Adaugă atracții
        </Link>

        <div className="space-y-12 w-full flex flex-col items-center">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="w-full flex flex-col items-center gap-6">
              
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 rounded-[1.5rem] w-full flex flex-col items-center relative text-center shadow-md">               
                {currentUserRole === "admin" && (
                  <button 
                    onClick={() => setDeleteDialog({ isOpen: true, type: "day", dayIndex, activityId: null })} 
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
                
                <div className="text-sm font-medium opacity-90 mb-1">Ziua {day.day}</div>
                <div className="text-2xl font-bold mb-3">{formatCalendarDate(day.day)}</div>
                
                <div className="bg-black/15 border border-white/10 px-6 py-2 rounded-xl w-full max-w-[240px] flex flex-col items-center gap-0.5 mb-4">
                  <span className="text-xs font-semibold opacity-95">
                    {day.activities.length} {day.activities.length === 1 ? "activitate" : "activități"}
                  </span>
                  <span className="text-base font-bold tracking-wide">
                    {calculateDayTimeRange(day.activities)}
                  </span>
                </div>

                {day.activities.length > 0 && (
                  <a 
                    href={generateGoogleMapsRouteUrl(day.activities)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Map className="w-3.5 h-3.5 text-blue-600" />
                    Vezi ruta pe hartă
                  </a>
                )}
              </div>

              <div className="w-full space-y-6 flex flex-col items-center">
                {day.activities.map((activity, idx) => {
                  const persistentVote = votesData[activity.id] || { up: 0, down: 0, voters: {} };
                  const userVote = persistentVote.voters?.[auth.currentUser?.uid || ""] || null;

                  return (
                    <div key={activity.id} className="w-full bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden relative group max-w-sm">
                      
                      <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-md text-white font-black text-xs w-6 h-6 rounded-full flex items-center justify-center border border-white/20">
                        {idx + 1}
                      </div>

                      {currentUserRole === "admin" && (
                        <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                          <button 
                            onClick={() => openEditModal(activity)}
                            className="w-8 h-8 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center text-blue-600 transition-all active:scale-90"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setDeleteDialog({ isOpen: true, type: "activity", dayIndex, activityId: activity.id })}
                            className="w-8 h-8 bg-white/90 hover:bg-white shadow-md rounded-full flex items-center justify-center text-red-500 transition-all active:scale-90"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="h-48 w-full relative">
                        <ImageWithFallback src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="p-5 flex flex-col items-center text-center w-full">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 px-2">{activity.name}</h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 px-4 line-clamp-2">{activity.description}</p>
                        
                        <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100/50 dark:border-gray-800/80 mb-4">
                          {/* --- MODIFICAT: DOAR ADRESA DESCHIDE ACUM GOOGLE MAPS LA CLICK --- */}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + " " + activity.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-2.5 hover:underline active:opacity-80 transition-all"
                            title="Deschide în Google Maps"
                          >
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="text-xs font-bold truncate max-w-[200px]">{activity.location}</span>
                          </a>
                          <div className="flex justify-center items-center gap-6 text-xs font-semibold text-gray-500 border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
                            <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" /> {activity.time}</div>
                            <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-green-500" /> {activity.price}</div>
                          </div>
                        </div>

                        <div className="flex gap-2 w-full">
                          <button onClick={() => handleVote(activity.id, "up")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-bold text-sm ${userVote === "up" ? "bg-green-500 text-white shadow-sm" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-green-50 dark:hover:bg-green-950/20"}`}><ThumbsUp className="w-4 h-4" /> {persistentVote.up || 0}</button>
                          <button onClick={() => handleVote(activity.id, "down")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-bold text-sm ${userVote === "down" ? "bg-red-500 text-white shadow-sm" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-red-50 dark:hover:bg-red-950/20"}`}><ThumbsDown className="w-4 h-4" /> {persistentVote.down || 0}</button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* POP-UP / MODAL EDITARE RECONFIGURAT COMPLET CU CUSTOM DROPDOWN-URI ȘI FILTRE VALIDATE */}
      {isEditModalOpen && editingActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-6 w-full max-w-xs border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col items-center text-center">
            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-5">Editează Activitatea</h3>
            <div className="space-y-3 w-full mb-6">
              <input type="text" placeholder="Nume activitate" value={editingActivity.data.name || ""} onChange={(e) => setEditingActivity({ ...editingActivity, data: { ...editingActivity.data, name: e.target.value } })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm outline-none text-gray-800 dark:text-white" />
              <input type="text" placeholder="Descriere" value={editingActivity.data.description || ""} onChange={(e) => setEditingActivity({ ...editingActivity, data: { ...editingActivity.data, description: e.target.value } })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm outline-none text-gray-800 dark:text-white" />
              
              <div className="grid grid-cols-2 gap-2 text-left">
                {/* DROPDOWN CUSTOM: ZIUA */}
                <div ref={editDayRef} className="relative">
                  <button 
                    type="button" 
                    onClick={() => { setIsEditDayDropdownOpen(!isEditDayDropdownOpen); setIsEditTimeDropdownOpen(false); }}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-xs text-gray-800 dark:text-white flex justify-between items-center"
                  >
                    <span>Ziua {editingActivity.data.day}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  {isEditDayDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-xl shadow-xl z-[110] max-h-32 overflow-y-auto p-1 no-scrollbar flex flex-col">
                      {Array.from({ length: getMaxDaysCount() }, (_, i) => i + 1).map(dayNum => (
                        <button key={dayNum} type="button" onClick={() => { setEditingActivity({ ...editingActivity, data: { ...editingActivity.data, day: dayNum } }); setIsEditDayDropdownOpen(false); }} className={`w-full py-2 text-xs font-bold rounded-lg ${editingActivity.data.day === dayNum ? "bg-blue-600 text-white" : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"}`}>Ziua {dayNum}</button>
                      ))}
                    </div>
                  )}
                </div>

                {/* DROPDOWN CUSTOM: ORA (FILTRATĂ SĂ EXCLUDA ORELE DEJA REZERVATE DIN ACEA ZI) */}
                <div ref={editTimeRef} className="relative">
                  <button 
                    type="button" 
                    onClick={() => { setIsEditTimeDropdownOpen(!isEditTimeDropdownOpen); setIsEditDayDropdownOpen(false); }}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-xs text-gray-800 dark:text-white flex justify-between items-center"
                  >
                    <span>{generateTimeOptions().length === 0 ? "Ocupat" : editingActivity.data.time}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  {isEditTimeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-xl shadow-xl z-[110] max-h-32 overflow-y-auto p-1 no-scrollbar flex flex-col">
                      {generateTimeOptions().map(timeString => (
                        <button key={timeString} type="button" onClick={() => { setEditingActivity({ ...editingActivity, data: { ...editingActivity.data, time: timeString } }); setIsEditTimeDropdownOpen(false); }} className={`w-full py-2 text-xs font-bold rounded-lg ${editingActivity.data.time === timeString ? "bg-blue-600 text-white" : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"}`}>{timeString}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <input type="text" placeholder="Preț" value={editingActivity.data.price || ""} onChange={(e) => setEditingActivity({ ...editingActivity, data: { ...editingActivity.data, price: e.target.value } })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm outline-none text-gray-800 dark:text-white" />
            </div>
            <div className="flex gap-2 w-full">
              <button onClick={() => { setIsEditModalOpen(false); setEditingActivity(null); }} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"><X className="w-3.5 h-3.5" /> Anulează</button>
              <button onClick={saveActivityEdit} disabled={generateTimeOptions().length === 0} className={`flex-1 py-3 text-white rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md ${generateTimeOptions().length === 0 ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed" : "bg-blue-600"}`}><Save className="w-3.5 h-3.5" /> Salvează</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={deleteDialog.isOpen} title={deleteDialog.type === "day" ? "Șterge ziua" : "Șterge activitatea"} message="Ești sigur? Acțiunea nu poate fi anulată." onConfirm={confirmDelete} onCancel={() => setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null })} />
    </div>
  );
}