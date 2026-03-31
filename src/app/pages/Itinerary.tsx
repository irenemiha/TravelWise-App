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
  Map as MapIcon // Importat pentru butonul de harta
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { 
  mockItineraries,
  mockTrips,
  deleteItineraryActivity, 
  updateItineraryActivity, 
  deleteItineraryDay,
  Activity,
  ItineraryDay
} from "../store";

export function Itinerary() {
  const { id } = useParams();
  const tripId = id || "1";
  const trip = mockTrips.find(t => t.id === tripId) || mockTrips[0];
  const initialItinerary = mockItineraries[tripId] || [];
  
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("admin"); 
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([...initialItinerary]);
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

  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    setItinerary([...initialItinerary]);
  }, [initialItinerary]);

  // FUNCȚIE PENTRU GENERARE RUTA GOOGLE MAPS
  const handleOpenFullMap = () => {
    const allLocations = itinerary.flatMap(day => 
      [...day.activities]
        .sort((a, b) => a.time.localeCompare(b.time))
        .map(act => act.location)
    );

    if (allLocations.length === 0) {
      toast.error("Nu ai activități în itinerariu pentru a genera o hartă!");
      return;
    }

    const origin = encodeURIComponent(allLocations[0]);
    const destination = encodeURIComponent(allLocations[allLocations.length - 1]);
    const waypoints = allLocations.slice(1, -1).map(loc => encodeURIComponent(loc)).join('|');
    
    const mapsUrl = waypoints 
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`
      : `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    window.open(mapsUrl, '_blank');
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    toast.success("Itinerariu salvat offline!");
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Itinerariu ${trip.destination.split(',')[0]}`,
      text: `Uite planul nostru pentru călătoria în ${trip.destination}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share anulat");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiat în clipboard!");
    }
  };

  const handleDeleteActivityClick = (dayIndex: number, activityId: string) => {
    setDeleteDialog({ isOpen: true, type: "activity", dayIndex, activityId });
  };

  const handleDeleteDayClick = (dayIndex: number) => {
    setDeleteDialog({ isOpen: true, type: "day", dayIndex, activityId: null });
  };

  const confirmDelete = () => {
    if (deleteDialog.type === "activity" && deleteDialog.dayIndex !== null && deleteDialog.activityId) {
      deleteItineraryActivity(tripId, deleteDialog.dayIndex, deleteDialog.activityId);
    } else if (deleteDialog.type === "day" && deleteDialog.dayIndex !== null) {
      deleteItineraryDay(tripId, deleteDialog.dayIndex);
    }
    setItinerary([...mockItineraries[tripId]]);
    setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null });
  };

  const startEditing = (dayIndex: number, activity: Activity) => {
    setEditingActivity({ dayIndex, activityId: activity.id, data: { ...activity } });
  };

  const saveEdit = () => {
    if (editingActivity) {
      updateItineraryActivity(tripId, editingActivity.dayIndex, editingActivity.activityId, editingActivity.data);
      setItinerary([...mockItineraries[tripId]]);
      setEditingActivity(null);
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

  const totalCost = itinerary.reduce(
    (acc, day) =>
      acc +
      day.activities.reduce((dayAcc, activity) => {
        const price = activity.price.replace(/[€,]/g, "");
        return dayAcc + (price === "Gratuit" ? 0 : parseFloat(price) || 0);
      }, 0),
    0
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen pb-16">
      
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${id || "1"}`} className="text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors active:scale-90 flex-shrink-0">
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </Link>
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-2">Itinerariu {trip.destination.split(',')[0]}</h1>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-2 py-1.5 rounded-lg flex-shrink-0">{trip.dates}</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
        
        {/* Actions */}
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

        {/* Timeline */}
        <div className="space-y-8 w-full flex flex-col items-center">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden w-full flex flex-col items-center border border-transparent dark:border-gray-800">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 w-full flex flex-col items-center text-center relative">
                {currentUserRole === "admin" && (
                  <button onClick={() => handleDeleteDayClick(dayIndex)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-90">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
                <div className="flex flex-col items-center gap-2 w-full mt-2">
                  <div className="text-sm text-blue-100 mb-1 font-bold">Ziua {day.day}</div>
                  <h2 className="text-2xl font-bold">{day.date}</h2>
                </div>
              </div>

              {/* Activities */}
              <div className="p-6 w-full flex flex-col items-center">
                <div className="space-y-8 w-full flex flex-col items-center">
                  {[...day.activities]
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((activity) => {
                      const isEditing = editingActivity?.activityId === activity.id;
                      return (
                        <div key={activity.id} className="relative w-full flex flex-col items-center">
                          <div className="flex flex-col items-center w-full gap-4">
                            <div className="flex flex-col items-center flex-shrink-0 w-full mb-2">
                              <div className={`w-14 h-14 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center relative z-10 shadow-md`}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white mt-2 bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-full">{activity.time}</div>
                            </div>
                            <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center relative overflow-hidden">
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
                                  <h3 className="text-xl mb-1 text-gray-900 dark:text-white font-bold">{activity.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">{activity.description}</p>
                                  <div className="flex flex-col items-center gap-3 w-full text-sm text-gray-600 dark:text-gray-400 font-bold bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-transparent dark:border-gray-700">
                                    <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4 text-blue-600" />{activity.location}</div>
                                    <div className="flex items-center justify-center gap-4 w-full border-t dark:border-gray-700 pt-3">
                                      <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-purple-600" />{activity.duration}</div>
                                      <div className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-600" />{activity.price}</div>
                                    </div>
                                  </div>
                                  {!isEditing && currentUserRole === "admin" && (
                                    <div className=" flex mt-4 gap-1 z-10">
                                      <button onClick={() => startEditing(dayIndex, activity)} className="p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full text-blue-600 shadow-sm active:scale-90"><Edit2 className="w-4 h-4" /></button>
                                      <button onClick={() => handleDeleteActivityClick(dayIndex, activity.id)} className="p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full text-red-500 shadow-sm active:scale-90"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                  )}
                                </div>
                              )}
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

      {/* BUTON FIXAT JOS PENTRU HARTA COMPLETA */}
      <div className="fixed bottom-20 flex items-center w-full z-40 px-6 justify-center pointer-events-none">
        <button
          onClick={handleOpenFullMap}
          className="
            pointer-events-auto
            group
            w-full max-w-md
            bg-gray-900/90 dark:bg-white/90
            backdrop-blur-xl
            text-white dark:text-gray-900
            font-black py-4 rounded-2xl
            flex items-center justify-center gap-3 
            shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
            hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)]
            active:scale-95 
            transition-all duration-300
            uppercase tracking-[0.2em] text-[12px]
            border border-white/20 dark:border-gray-200/50
          "
        >
          <div className="relative flex items-center justify-center">
              {/* Un mic punct care pulsează pentru a atrage atenția subtil */}
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
              <MapIcon className="w-5 h-5 relative z-10" />
          </div>
          
          <span className="relative">
              Vizualizează ruta
              {/* Linie decorativă sub text care apare la hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </span>
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