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
  CheckCircle2
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
  
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("admin"); // Mock role
  
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([...initialItinerary]);
  
  // Dialog state
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

  // Edit state
  const [editingActivity, setEditingActivity] = useState<{
    dayIndex: number;
    activityId: string;
    data: Partial<Activity>;
  } | null>(null);

  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    setItinerary([...initialItinerary]);
  }, [initialItinerary]);

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  const handleDeleteActivityClick = (dayIndex: number, activityId: string) => {
    setDeleteDialog({
      isOpen: true,
      type: "activity",
      dayIndex,
      activityId,
    });
  };

  const handleDeleteDayClick = (dayIndex: number) => {
    setDeleteDialog({
      isOpen: true,
      type: "day",
      dayIndex,
      activityId: null,
    });
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
    setEditingActivity({
      dayIndex,
      activityId: activity.id,
      data: { ...activity }
    });
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
      case "meal":
        return <Utensils className="w-5 h-5" />;
      case "break":
        return <Coffee className="w-5 h-5" />;
      case "attraction":
        return <Camera className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "meal":
        return "bg-orange-100 text-orange-700";
      case "break":
        return "bg-purple-100 text-purple-700";
      case "attraction":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
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
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full flex flex-col items-center">
        <div className="w-full max-w-md px-4 py-8 flex flex-col items-center text-center">
          <div className="flex flex-col gap-4 w-full items-center relative">
            <button 
              onClick={() => setCurrentUserRole(prev => prev === "admin" ? "member" : "admin")}
              className="absolute top-0 right-0 bg-white/20 text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm active:scale-95 transition-transform"
            >
              Vezi ca: {currentUserRole === "admin" ? "Champion" : "Membru"}
            </button>
            <div className="flex flex-col items-center w-full mt-2">
              <Link
                to={`/trip/${id || "1"}`}
                className="text-blue-100 hover:text-white font-bold mb-4 inline-block active:scale-95 transition-transform"
              >
                ← Înapoi
              </Link>
              <h1 className="text-2xl font-bold mb-1">
                Itinerariu {trip.destination.split(',')[0]}
              </h1>
              <p className="text-sm text-blue-100">
                Planul tău pentru {trip.dates}
              </p>
            </div>
            <div className="flex gap-2 justify-center w-full max-w-xs">
              <button 
                onClick={handleDownload}
                className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1"
              >
                {isDownloaded ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Download className="w-4 h-4" />}
                <span>{isDownloaded ? "Salvată offline" : "Offline"}</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://travelwise.app/itinerary/${trip.id}`);
                  toast.success("Linkul itinerariului a fost copiat!");
                }}
                className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1"
              >
                <Share2 className="w-4 h-4" />
                <span>Distribuie</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6 flex flex-col items-center">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2 w-full">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div className="text-gray-600 text-sm font-bold">Total zile</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {itinerary.length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2 w-full">
              <MapPin className="w-4 h-4 text-purple-600" />
              <div className="text-gray-600 text-sm font-bold">Activități</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {itinerary.reduce((acc, day) => acc + day.activities.length, 0)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 col-span-2 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2 w-full">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div className="text-gray-600 text-sm font-bold">Cost estimat</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              €{totalCost.toFixed(0)}
            </div>
            <div className="text-xs text-gray-500 mt-1 font-bold">
              ~€{(totalCost / 6).toFixed(0)} / pers
            </div>
          </div>
        </div>

        {/* Empty State */}
        {itinerary.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center w-full mb-6">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Fără itinerariu</h3>
            <p className="text-sm text-gray-500">Nu există activități adăugate încă.</p>
          </div>
        )}

        {/* Itinerary Timeline */}
        <div className="space-y-8 w-full flex flex-col items-center">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="bg-white rounded-xl shadow-sm overflow-hidden w-full flex flex-col items-center">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 w-full flex flex-col items-center text-center relative">
                {currentUserRole === "admin" && (
                  <button 
                    onClick={() => handleDeleteDayClick(dayIndex)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors active:scale-90"
                    title="Șterge întreaga zi"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
                <div className="flex flex-col items-center gap-2 w-full mt-2">
                  <div className="flex flex-col items-center w-full">
                    <div className="text-sm text-blue-100 mb-1 font-bold">
                      Ziua {day.day}
                    </div>
                    <h2 className="text-2xl font-bold">{day.date}</h2>
                  </div>
                  <div className="flex flex-col items-center text-center w-full bg-black/10 rounded-lg p-2 mt-2">
                    <div className="text-sm text-blue-100 font-bold">
                      {day.activities.length} activități
                    </div>
                    {day.activities.length > 0 && (
                      <div className="text-lg font-bold">
                        {day.activities[0].time} - {day.activities[day.activities.length - 1].time}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="p-6 w-full flex flex-col items-center">
                <div className="space-y-8 w-full flex flex-col items-center">
                  {day.activities.map((activity) => {
                    const isEditing = editingActivity?.activityId === activity.id;
                    
                    return (
                      <div key={activity.id} className="relative w-full flex flex-col items-center">
                        <div className="flex flex-col items-center w-full gap-4">
                          {/* Time */}
                          <div className="flex flex-col items-center flex-shrink-0 w-full mb-2">
                            <div
                              className={`w-14 h-14 rounded-full ${getActivityColor(
                                activity.type
                              )} flex items-center justify-center relative z-10 shadow-md`}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="text-lg font-bold text-gray-900 mt-2 whitespace-nowrap bg-gray-100 px-4 py-1 rounded-full">
                              {activity.time}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="w-full bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                            {!isEditing && currentUserRole === "admin" && (
                              <div className="absolute top-2 right-2 flex gap-1 z-10">
                                <button 
                                  onClick={() => startEditing(dayIndex, activity)}
                                  className="p-2 bg-white/80 backdrop-blur rounded-full text-blue-600 shadow-sm active:scale-90 transition-transform"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteActivityClick(dayIndex, activity.id)}
                                  className="p-2 bg-white/80 backdrop-blur rounded-full text-red-500 shadow-sm active:scale-90 transition-transform"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            {isEditing ? (
                              <div className="flex flex-col items-center w-full gap-3">
                                <h3 className="font-bold text-gray-900 mb-2">Editează Activitatea</h3>
                                <input 
                                  type="text" 
                                  value={editingActivity.data.name}
                                  onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, name: e.target.value}})}
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  placeholder="Nume activitate"
                                />
                                <input 
                                  type="text" 
                                  value={editingActivity.data.description}
                                  onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, description: e.target.value}})}
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                  placeholder="Descriere"
                                />
                                <div className="grid grid-cols-2 gap-2 w-full">
                                  <input 
                                    type="text" 
                                    value={editingActivity.data.time}
                                    onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, time: e.target.value}})}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-center text-sm outline-none focus:border-blue-500"
                                    placeholder="Ora (ex: 09:00)"
                                  />
                                  <input 
                                    type="text" 
                                    value={editingActivity.data.price}
                                    onChange={(e) => setEditingActivity({...editingActivity, data: {...editingActivity.data, price: e.target.value}})}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-center text-sm outline-none focus:border-blue-500"
                                    placeholder="Preț (ex: €20)"
                                  />
                                </div>
                                <div className="flex gap-2 w-full mt-2">
                                  <button 
                                    onClick={() => setEditingActivity(null)}
                                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
                                  >
                                    <X className="w-4 h-4" /> Anulează
                                  </button>
                                  <button 
                                    onClick={saveEdit}
                                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
                                  >
                                    <Save className="w-4 h-4" /> Salvează
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-4 w-full">
                                <div className="w-full h-40 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                                  <ImageWithFallback
                                    src={activity.image}
                                    alt={activity.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col items-center w-full">
                                  <h3 className="text-xl mb-1 text-gray-900 font-bold">
                                    {activity.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-4 text-center">
                                    {activity.description}
                                  </p>
                                  <div className="flex flex-col items-center gap-3 w-full text-sm text-gray-600 font-bold bg-white p-3 rounded-xl shadow-sm">
                                    <div className="flex items-center justify-center gap-2">
                                      <MapPin className="w-4 h-4 text-blue-600" />
                                      {activity.location}
                                    </div>
                                    <div className="flex items-center justify-center gap-4 w-full border-t pt-3">
                                      <div className="flex items-center justify-center gap-1">
                                        <Clock className="w-4 h-4 text-purple-600" />
                                        {activity.duration}
                                      </div>
                                      <div className="flex items-center justify-center gap-1">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        {activity.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {day.activities.length === 0 && (
                    <div className="text-center py-6 text-gray-500 font-bold">
                      Nicio activitate în această zi.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps CTA */}
        {itinerary.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white mt-8 flex flex-col items-center text-center mb-10 w-full">
            <h2 className="text-xl font-bold mb-3">
              Itinerarul tău este gata!
            </h2>
            <p className="text-sm text-blue-100 mb-6">
              Acum poți descărca itinerarul, distribui cu grupul sau începe să
              faci rezervări pentru activitățile planificate.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={handleDownload}
                className="w-full bg-white font-bold text-blue-600 px-6 py-4 rounded-xl active:bg-blue-50 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isDownloaded ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Download className="w-5 h-5" />}
                {isDownloaded ? "Salvată pentru offline" : "Descarcă pentru offline"}
              </button>
              <button 
                onClick={() => toast.info("Funcționalitatea de rezervări va fi disponibilă în curând!")}
                className="w-full bg-white/20 text-white font-bold backdrop-blur-sm px-6 py-4 rounded-xl active:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Începe rezervările
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.type === "day" ? "Șterge ziua" : "Șterge activitatea"}
        message={deleteDialog.type === "day" 
          ? "Ești sigur că vrei să ștergi această zi întreagă și toate activitățile ei? Această acțiune nu poate fi anulată."
          : "Ești sigur că vrei să ștergi această activitate? Această acțiune nu poate fi anulată."}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, type: null, dayIndex: null, activityId: null })}
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </div>
  );
}
