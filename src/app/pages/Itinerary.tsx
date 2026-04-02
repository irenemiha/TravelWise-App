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
  image?: string; // Am adăugat câmpul opțional pentru imagine
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
        // Generăm aceeași imagine ca în Explore folosind ID-ul activității ca seed
        const seed = activityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const activityImage = `https://loremflickr.com/800/600/travel,${encodeURIComponent(data.name || 'place')}?lock=${seed}`;

        return { 
          id: activityId, 
          ...data,
          image: data.image || activityImage // Folosește imaginea salvată sau cea generată
        };
      }) as Activity[];
      
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

  const handleOpenFullMap = () => {
    const allLocations = itinerary.flatMap(day => 
      day.activities.map(act => act.location)
    );
    if (allLocations.length === 0) {
      toast.error("Adaugă atracții pentru a genera ruta!");
      return;
    }
    const origin = encodeURIComponent(allLocations[0]);
    const destination = encodeURIComponent(allLocations[allLocations.length - 1]);
    const waypoints = allLocations.slice(1, -1).map(loc => encodeURIComponent(loc)).join('|');
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
    window.open(mapsUrl, '_blank');
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    toast.success("Itinerariu salvat offline!");
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Itinerariu ${trip?.destination}`,
      text: `Uite planul nostru pentru ${trip?.destination}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiat!");
    }
  };

  const handleDeleteActivityClick = (dayIndex: number, activityId: string) => {
    setDeleteDialog({ isOpen: true, type: "activity", dayIndex, activityId });
  };

  const handleDeleteDayClick = (dayIndex: number) => {
    setDeleteDialog({ isOpen: true, type: "day", dayIndex, activityId: null });
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
      toast.success("Eliminat cu succes.");
    } catch (e) {
      toast.error("Eroare la ștergere.");
    }
    setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null });
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
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-36">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors active:scale-90 flex-shrink-0">
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </Link>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-2">Itinerariu {trip?.destination?.split(',')[0]}</h1>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-2 py-1.5 rounded-lg flex-shrink-0">{trip?.startDate}</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <div className="flex gap-2 justify-center w-full mb-4">
          <button onClick={handleDownload} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800 font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 flex-1 text-sm shadow-sm">
            {isDownloaded ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Download className="w-4 h-4 text-blue-600" />}
            <span>Salvat</span>
          </button>
          <button onClick={handleShare} className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800 font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 flex-1 text-sm shadow-sm">
            <Share2 className="w-4 h-4" />
            <span>Distribuie</span>
          </button>
        </div>

        <Link to={`/explore/${tripId}`} className="w-full mb-6 bg-blue-600 dark:bg-blue-600 text-white font-bold px-6 py-4 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl">
          <Plus className="w-5 h-5" />
          Adaugă atracții din explorare
        </Link>

        <div className="space-y-8 w-full flex flex-col items-center">
          {itinerary.length === 0 && <p className="text-gray-400 text-sm italic mt-10">Încă nu ai adăugat activități.</p>}
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden w-full flex flex-col items-center border border-transparent dark:border-gray-800">
              <div className="bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 text-white p-5 w-full flex items-center justify-between relative">               
                <div className="w-10 h-10" /> 
                <div className="text-xl text-white font-bold tracking-widest uppercase">
                  Ziua {day.day}
                </div>
                <div className="flex justify-end min-w-10">
                  {currentUserRole === "admin" && (
                    <button 
                      onClick={() => handleDeleteDayClick(dayIndex)} 
                      className="p-2.5 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all active:scale-90 border border-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 w-full flex flex-col items-center">
                <div className="space-y-10 w-full flex flex-col items-center">
                  {day.activities.map((activity) => {
                    const isEditing = editingActivity?.activityId === activity.id;
                    function startEditing(dayIndex: number, activity: Activity): void {
                      throw new Error("Function not implemented.");
                    }

                    return (
                      <div key={activity.id} className="relative w-full flex flex-col items-center">
                        <div className="flex flex-col items-center w-full gap-4">
                          {/* Indicator de timp */}
                          <div className="flex flex-col items-center flex-shrink-0 w-full mb-2">
                            <div className={`w-12 h-12 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center relative z-10 shadow-lg border-2 border-white dark:border-gray-900`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="text-md font-black text-blue-600 dark:text-blue-400 mt-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 rounded-full tracking-tighter">{activity.time}</div>
                          </div>

                          {/* Card Activitate */}
                          <div className="w-full bg-white dark:bg-gray-800/40 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden group transition-transform active:scale-[0.98]">
                            
                            {/* IMAGINEA OBIECTIVULUI */}
                            {!isEditing && (
                              <Link 
                                to={`/explore/${tripId}#${activity.id}`}
                                className="w-full h-40 relative block overflow-hidden"
                              >
                                <ImageWithFallback 
                                  src={activity.image} 
                                  alt={activity.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                                  <ExternalLink className="w-4 h-4" />
                                </div>
                              </Link>
                            )}

                            <div className="p-5 w-full">
                              {isEditing ? (
                                <div className="flex flex-col items-center w-full gap-3">
                                  <input type="text" value={editingActivity.data.name} onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, name: e.target.value}})} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-center font-bold dark:text-white" />
                                  <div className="flex gap-2 w-full mt-2">
                                    <button onClick={() => setEditingActivity(null)} className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold">X</button>
                                    <button onClick={saveEdit} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">OK</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center w-full">
                                  <Link to={`/explore/${tripId}#${activity.id}`}>
                                    <h3 className="text-xl mb-1 text-gray-900 dark:text-white font-black hover:text-blue-600 transition-colors tracking-tight">
                                      {activity.name}
                                    </h3>
                                  </Link>
                                  <p className="text-md text-gray-500 dark:text-gray-400 mb-4 text-center line-clamp-2 px-2">
                                    {activity.description}
                                  </p>
                                  <div className="flex flex-col items-center gap-3 w-full text-[12px] text-gray-600 dark:text-gray-400 font-black bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="w-full">
                                      <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + " " + activity.location)}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center justify-center gap-3 group active:scale-95 transition-transform"
                                      >
                                        {/* Iconița MapPin */}
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 shadow-sm transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                                          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-300 fill-current" />
                                        </div>

                                        {/* Textul Locației - Mărit la text-base (16px) sau text-lg (18px) */}
                                        <span className="text-base sm:text-lg text-blue-600 dark:text-blue-200 font-extrabold tracking-tight underline-offset-4 group-hover:underline">
                                          {activity.location}
                                        </span>
                                      </a>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 w-full border-t dark:border-gray-700 pt-3">
                                      <div className="flex items-center gap-1.5 uppercase tracking-tighter">
                                        <Clock className="w-4 h-4 text-purple-600" />
                                        {activity.duration}
                                      </div>
                                      <div className="flex items-center gap-1.5 uppercase tracking-tighter">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        {activity.price}
                                      </div>
                                    </div>
                                  </div>

                                  {currentUserRole === "admin" && (
                                    <div className="flex mt-4 gap-2">
                                      <button onClick={() => startEditing(dayIndex, activity)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[12px] font-black uppercase tracking-widest active:scale-90 transition-all border border-blue-100 dark:border-blue-800">
                                        <Edit2 className="w-4 h-4" /> Edit
                                      </button>
                                      <button onClick={() => handleDeleteActivityClick(dayIndex, activity.id)} className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full text-[12px] font-black uppercase tracking-widest active:scale-90 transition-all border border-red-100 dark:border-red-900/50">
                                        <Trash2 className="w-4 h-4" /> Șterge
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-22 flex items-center w-full z-40 px-6 justify-center pointer-events-none">
        <button
          onClick={handleOpenFullMap}
          className="pointer-events-auto group w-full max-w-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all duration-300 uppercase tracking-[0.2em] text-[11px] border border-white/20 dark:border-gray-200"
        >
          <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
              <MapIcon className="w-5 h-5 relative z-10" />
          </div>
          <span className="text-md">Vezi ruta pe hartă</span>
        </button>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.type === "day" ? "Șterge ziua" : "Șterge activitatea"}
        message="Ești sigur? Această acțiune nu poate fi anulată."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null })}
      />
    </div>
  );
}