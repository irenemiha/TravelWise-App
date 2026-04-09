import { useParams, Link } from "react-router";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Download,
  Share2,
  ChevronRight,
  Coffee,
  Utensils,
  Camera,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Map as MapIcon,
  Loader2,
  ExternalLink
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
  writeBatch 
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
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export function Itinerary() {
  const { id } = useParams();
  const tripId = id || "";
  
  const [trip, setTrip] = useState<any>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("member"); 
  const [isDownloaded, setIsDownloaded] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    type: "activity" | "day" | null;
    dayIndex: number | null;
    activityId: string | null;
  }>({
    isOpen: false,
    type: null,
    dayIndex: null,
    activityId: null,
  });

  const [editingActivity, setEditingActivity] = useState<{
    dayIndex: number;
    activityId: string;
    data: Partial<Activity>;
  } | null>(null);

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

    const itineraryRef = collection(db, "trips", tripId, "itinerary");
    const q = query(itineraryRef, orderBy("time", "asc"));

    const unsubItinerary = onSnapshot(q, (snapshot) => {
      const allActivities = snapshot.docs.map(d => {
        const data = d.data();
        const activityId = d.id;
        const seed = activityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Imagine Bing fără margini (p=0)
        const activityImage = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(data.name || 'place')}&w=800&h=600&c=1&p=0`;

        return { 
          id: activityId, 
          ...data,
          image: data.image || activityImage 
        } as Activity;
      });
      
      const grouped: { [key: number]: Activity[] } = {};
      allActivities.forEach(act => {
        if (!grouped[act.day]) grouped[act.day] = [];
        grouped[act.day].push(act);
      });

      const formattedItinerary: ItineraryDay[] = Object.keys(grouped).map(dayNum => ({
        day: parseInt(dayNum),
        date: `Ziua ${dayNum}`,
        activities: grouped[parseInt(dayNum)]
      })).sort((a, b) => a.day - b.day);

      setItinerary(formattedItinerary);
      setLoading(false);
    });

    return () => {
      unsubTrip();
      unsubItinerary(); // CORECTAT: Era unsubMessages
    };
  }, [tripId]);

  // --- LOGICA HARTA (CORECTATĂ) ---
  const handleOpenFullMap = () => {
    const cityName = trip?.destination?.split(',')[0].trim() || "";
    const allLocations = itinerary.flatMap(day => 
      day.activities.map(act => `${act.location}, ${cityName}`)
    );

    if (allLocations.length === 0) {
      toast.error("Adaugă atracții pentru a genera ruta!");
      return;
    }

    const origin = encodeURIComponent(allLocations[0]);
    const destination = encodeURIComponent(allLocations[allLocations.length - 1]);
    const waypoints = allLocations.slice(1, -1).map(loc => encodeURIComponent(loc)).join('|');
    
    // URL OFICIAL GOOGLE MAPS DIRECTIONS
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
    window.open(mapsUrl, '_blank');
  };

  const startEditing = (dayIndex: number, activity: Activity) => {
    setEditingActivity({
      dayIndex,
      activityId: activity.id,
      data: { ...activity }
    });
  };

  const saveEdit = async () => {
    if (editingActivity && tripId) {
      try {
        const actRef = doc(db, "trips", tripId, "itinerary", editingActivity.activityId);
        await updateDoc(actRef, editingActivity.data);
        setEditingActivity(null);
        toast.success("Actualizat!");
      } catch (e) {
        toast.error("Eroare la salvare.");
      }
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
    } catch (e) {
      toast.error("Eroare la ștergere.");
    }
    setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null });
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "meal": return <Utensils className="w-5 h-5" />;
      case "break": return <Coffee className="w-5 h-5" />;
      case "attraction": return <Camera className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "meal": return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
      case "break": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
      case "attraction": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-34">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-400 hover:text-gray-900 transition-colors active:scale-90"><ArrowLeft className="w-6 h-6 stroke-[2.5]" /></Link>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">Itinerariu {trip?.destination?.split(',')[0]}</h1>
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

        <Link to={`/explore/${tripId}`} className="w-full mb-6 bg-blue-600 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
          <Plus className="w-5 h-5" />
          Adaugă atracții
        </Link>

        <div className="space-y-8 w-full flex flex-col items-center">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden w-full border border-gray-100 dark:border-gray-800">
              <div className="bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 text-white p-5 flex items-center justify-between">               
                <div className="text-xl font-bold tracking-widest uppercase">Ziua {day.day}</div>
                {currentUserRole === "admin" && (
                  <button onClick={() => setDeleteDialog({ isOpen: true, type: "day", dayIndex, activityId: null })} className="p-2 bg-red-500/20 rounded-xl">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>

              <div className="p-4 space-y-10 flex flex-col items-center">
                {day.activities.map((activity) => {
                  const isEditing = editingActivity?.activityId === activity.id;
                  return (
                    <div key={activity.id} className="w-full flex flex-col items-center">
                      <div className="flex flex-col items-center w-full gap-2 mb-4">
                        <div className={`w-12 h-12 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center shadow-lg`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="text-md font-black text-blue-600 dark:text-blue-400">{activity.time}</div>
                      </div>

                      <div className="w-full bg-white dark:bg-gray-800/40 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col items-center">
                        {!isEditing && (
                          <div className="w-full h-40 flex relative">
                            <ImageWithFallback src={activity.image} alt={activity.name} className="w-full h-full min-w-full min-h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}

                        <div className="p-5 w-full flex flex-col items-center">
                          {isEditing ? (
                            <div className="w-full space-y-3">
                              <input type="text" value={editingActivity.data.name} onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, name: e.target.value}})} className="w-full bg-gray-50 dark:bg-gray-900 border p-3 rounded-xl font-bold dark:text-white" />
                              <div className="flex gap-2">
                                <button onClick={() => setEditingActivity(null)} className="flex-1 p-3 bg-gray-100 rounded-xl">X</button>
                                <button onClick={saveEdit} className="flex-1 p-3 bg-blue-600 text-white rounded-xl">OK</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{activity.name}</h3>
                              <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl space-y-3">
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location + " " + (trip?.destination?.split(',')[0] || ""))}`} 
                                  target="_blank" rel="noopener noreferrer" 
                                  className="flex items-center justify-center gap-2 group"
                                >
                                  <MapPin className="w-5 h-5 text-blue-600 fill-current" />
                                  <span className="text-lg text-blue-600 dark:text-blue-300 font-extrabold group-hover:underline">{activity.location}</span>
                                </a>
                                <div className="flex justify-center gap-6 border-t dark:border-gray-700 pt-3 text-[12px] font-black uppercase text-gray-500">
                                  <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-purple-600" /> {activity.duration}</div>
                                  <div className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-600" /> {activity.price}</div>
                                </div>
                              </div>
                              {currentUserRole === "admin" && (
                                <div className="flex gap-2 mt-4">
                                  <button onClick={() => startEditing(dayIndex, activity)} className="flex-1 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-xs font-black uppercase">Edit</button>
                                  <button onClick={() => setDeleteDialog({ isOpen: true, type: "activity", dayIndex, activityId: activity.id })} className="flex-1 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full text-xs font-black uppercase">Șterge</button>
                                </div>
                              )}
                            </>
                          )}
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

      <div className="fixed bottom-22 w-full px-6 flex justify-center z-40">
        <button onClick={handleOpenFullMap} className="w-full max-w-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-[11px]">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-full w-full rounded-full bg-blue-400 animate-ping opacity-75"></span>
            <MapIcon className="w-5 h-5 relative z-10" />
          </div>
          <span>Vezi ruta pe hartă</span>
        </button>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.type === "day" ? "Șterge ziua" : "Șterge activitatea"}
        message="Ești sigur? Acțiunea nu poate fi anulată."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null })}
      />
    </div>
  );
}