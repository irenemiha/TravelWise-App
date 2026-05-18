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
  Trash2,
  X,
  Save,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Loader2,
  Edit2
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

  // State-ul pentru Pop-up-ul de editare dedicat (Modal)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<{
    activityId: string;
    data: Partial<Activity>;
  } | null>(null);

  const formatCalendarDate = (dayNum: number) => {
    if (!trip?.startDate) return `Ziua ${dayNum}`;
    try {
      const start = new Date(trip.startDate);
      start.setDate(start.getDate() + (dayNum - 1));
      return start.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return `Ziua ${dayNum}`;
    }
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

    const itineraryRef = collection(db, "trips", tripId, "itinerary");
    const q = query(itineraryRef, orderBy("time", "asc"));

    const unsubItinerary = onSnapshot(q, (snapshot) => {
      const allActivities = snapshot.docs.map(d => {
        const data = d.data();
        const activityId = d.id;
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
      unsubItinerary();
    };
  }, [tripId]);

  const openEditModal = (activity: Activity) => {
    setEditingActivity({
      activityId: activity.id,
      data: { ...activity }
    });
    setIsEditModalOpen(true);
  };

  const saveActivityEdit = async () => {
    if (editingActivity && tripId) {
      try {
        const actRef = doc(db, "trips", tripId, "itinerary", editingActivity.activityId);
        await updateDoc(actRef, editingActivity.data);
        setIsEditModalOpen(false);
        setEditingActivity(null);
        toast.success("Activitatea a fost salvată!");
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

  const totalDaysCount = itinerary.length;
  const totalActivitiesCount = itinerary.reduce((acc, day) => acc + day.activities.length, 0);

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
        {/* Butoane superioare standard */}
        <div className="flex gap-2 justify-center w-full mb-6">
          <button onClick={() => { setIsDownloaded(true); toast.success("Salvat!"); setTimeout(() => setIsDownloaded(false), 2000); }} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold px-4 py-2.5 rounded-xl flex-1 text-sm shadow-sm flex items-center justify-center gap-2">
            {isDownloaded ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Download className="w-4 h-4" />}
            <span>Salvat</span>
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copiat!"); }} className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-bold px-4 py-2.5 rounded-xl flex-1 text-sm shadow-sm flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Distribuie</span>
          </button>
        </div>

        {/* Sumar Static (Zile & Activități - image_f96f50.png) */}
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

        {/* Listă Zile Itinerariu */}
        <div className="space-y-12 w-full flex flex-col items-center">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="w-full flex flex-col items-center gap-6">
              
              {/* HEADER DE ZI NOU (image_f973ca.png) */}
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
                
                {/* Capsulă info centrală cu opacitate */}
                <div className="bg-black/15 border border-white/10 px-6 py-2.5 rounded-xl w-full max-w-[240px] flex flex-col items-center gap-0.5">
                  <span className="text-xs font-semibold opacity-95">
                    {day.activities.length} {day.activities.length === 1 ? "activitate" : "activități"}
                  </span>
                  <span className="text-base font-bold tracking-wide">
                    {calculateDayTimeRange(day.activities)}
                  </span>
                </div>
              </div>

              {/* LISTA DE CARDURI MINIMALISTE DIN INTERIORUL ZILEI */}
              <div className="w-full space-y-6 flex flex-col items-center">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="w-full bg-white dark:bg-gray-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden relative group max-w-sm">
                    
                    {/* Butoane edit/șterge absolute în colțul dreapta-sus al imaginii (image_f97e93.png) */}
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

                    {/* Imaginea */}
                    <div className="h-48 w-full relative">
                      <ImageWithFallback src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Conținut textual simplu și curat */}
                    <div className="p-5 flex flex-col items-center text-center w-full">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 px-2">{activity.name}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 px-4 line-clamp-2">{activity.description}</p>
                      
                      {/* Sub-containerul pentru locație, durată și preț */}
                      <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100/50 dark:border-gray-800/80">
                        <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-2.5">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span className="text-xs font-bold truncate max-w-[200px]">{activity.location}</span>
                        </div>
                        <div className="flex justify-center items-center gap-6 text-xs font-semibold text-gray-500 border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
                          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" /> {activity.time}</div>
                          <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-green-500" /> {activity.price}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* POP-UP / MODAL DEDICAT PENTRU EDITARE ACTIVITATE (image_f8216.png) */}
      {isEditModalOpen && editingActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-6 w-full max-w-xs border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col items-center text-center">
            
            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-5">Editează Activitatea</h3>
            
            <div className="space-y-3 w-full mb-6">
              {/* Input Nume */}
              <input 
                type="text" 
                placeholder="Nume activitate"
                value={editingActivity.data.name || ""} 
                onChange={(e) => setEditingActivity({
                  ...editingActivity, 
                  data: { ...editingActivity.data, name: e.target.value }
                })} 
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
              
              {/* Input Descriere */}
              <input 
                type="text" 
                placeholder="Descriere"
                value={editingActivity.data.description || ""} 
                onChange={(e) => setEditingActivity({
                  ...editingActivity, 
                  data: { ...editingActivity.data, description: e.target.value }
                })} 
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
              
              {/* Row pentru Timp și Preț */}
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="10:00"
                  value={editingActivity.data.time || ""} 
                  onChange={(e) => setEditingActivity({
                    ...editingActivity, 
                    data: { ...editingActivity.data, time: e.target.value }
                  })} 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
                <input 
                  type="text" 
                  placeholder="Preț"
                  value={editingActivity.data.price || ""} 
                  onChange={(e) => setEditingActivity({
                    ...editingActivity, 
                    data: { ...editingActivity.data, price: e.target.value }
                  })} 
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700 p-3 rounded-xl font-semibold text-center text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
              </div>
            </div>

            {/* Butoanele inferioare cu iconițe deduse din design */}
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => { setIsEditModalOpen(false); setEditingActivity(null); }} 
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Anulează
              </button>
              <button 
                onClick={saveActivityEdit} 
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5" /> Salvează
              </button>
            </div>
          </div>
        </div>
      )}

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