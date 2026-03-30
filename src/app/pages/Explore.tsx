import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Heart,
  Info,
  MessageCircle,
  ArrowLeft,
  CalendarPlus, // Iconiță nouă
  X,            // Iconiță nouă
  ChevronDown   // Iconiță nouă
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { mockAttractionsData, mockTrips, Attraction, addChatMessage, addItineraryActivity } from "../store";

export function Explore() {
  const { id } = useParams();
  const tripId = id || "1";
  const trip = mockTrips.find((t) => t.id === tripId) || mockTrips[0];
  const initialAttractions = mockAttractionsData[tripId] || [];

  const [attractions, setAttractions] = useState<Attraction[]>(initialAttractions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  // --- STATE-URI NOI PENTRU DIALOG ---
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  // Găsim călătoriile care au aceeași destinație pentru a le afișa în selector
  const matchingTrips = mockTrips.filter(
    t => t.destination.split(',')[0].trim() === trip.destination.split(',')[0].trim()
  );

  const [addFormData, setAddFormData] = useState({
    targetTripId: tripId,
    day: 1,
    time: "10:00",
    duration: "2h"
  });

  useEffect(() => {
    setAttractions(mockAttractionsData[tripId] || []);
  }, [tripId]);

  const handleOpenAddDialog = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setAddFormData(prev => ({ 
      ...prev, 
      targetTripId: tripId, 
      duration: attraction.duration 
    }));
    setIsAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedAttraction) return;

    const newActivity = {
      id: Date.now().toString(),
      name: selectedAttraction.name,
      time: addFormData.time,
      type: "attraction" as const,
      description: selectedAttraction.description,
      location: selectedAttraction.name,
      duration: addFormData.duration,
      price: selectedAttraction.price,
      image: selectedAttraction.image,
    };

    try {
      addItineraryActivity(addFormData.targetTripId, addFormData.day - 1, newActivity);
      const targetTripName = mockTrips.find(t => t.id === addFormData.targetTripId)?.name || "excursie";
      toast.success(`Adăugat în "${targetTripName}" (Ziua ${addFormData.day})`);
      setIsAddDialogOpen(false);
    } catch (e) {
      toast.error("Eroare la adăugarea în itinerariu.");
    }
  };
  // -----------------------------------

  const handleShareToChat = (attraction: Attraction) => {
    addChatMessage(tripId, {
      id: Date.now().toString(),
      text: `Uitați ce am găsit: ${attraction.name}! Ce ziceți, mergem?`,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sharedAttractionId: attraction.id,
    });
    navigate(`/chat/${tripId}`);
  };

  const handleVote = (attractionId: string, voteType: "up" | "down") => {
    setAttractions((prev) =>
      prev.map((attr) => {
        if (attr.id === attractionId) {
          const newVotes = { ...attr.votes };
          const oldVote = attr.userVote;
          if (oldVote === "up") newVotes.up--;
          if (oldVote === "down") newVotes.down--;
          const newVote = oldVote === voteType ? null : voteType;
          if (newVote === "up") newVotes.up++;
          if (newVote === "down") newVotes.down++;
          return { ...attr, votes: newVotes, userVote: newVote };
        }
        return attr;
      })
    );
  };

  const toggleSave = (attractionId: string) => {
    setAttractions((prev) =>
      prev.map((attr) =>
        attr.id === attractionId ? { ...attr, saved: !attr.saved } : attr
      )
    );
  };

  const categories = ["all", ...Array.from(new Set(initialAttractions.map((a) => a.category)))];

  const filteredAttractions = attractions.filter((attr) => {
    const matchesSearch =
      attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || attr.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen pb-20">
      {/* HEADER STICKY */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 flex items-center px-6 gap-4">
          <Link
            to={`/trip/${id}`}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors active:scale-90"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            Explorează {trip.destination.split(",")[0]}
          </h1>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută atracții..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
              />
            </div>
            
            <div className="flex gap-2 w-full pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-bold py-2.5 rounded-xl transition-all text-sm flex-1 text-center ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                      : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {category === "all" ? "Toate" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 my-6 w-full grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {attractions.filter((a) => a.saved).length}
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Salvate</div>
            </div>
            <div className="text-center border-x border-blue-200 dark:border-blue-800/50">
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {attractions.reduce((acc, a) => acc + a.votes.up, 0)}
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Voturi</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {filteredAttractions.length}
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Locații</div>
            </div>
          </div>

          {/* Attractions List */}
          <div className="flex flex-col gap-8 w-full">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all"
              >
                <div className="relative h-60 w-full">
                  <ImageWithFallback
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleSave(attraction.id)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg active:scale-75 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        attraction.saved ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <div className="absolute top-6 left-4 bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-xl">
                  {attraction.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {attraction.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{attraction.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-m text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                    {attraction.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm font-bold text-gray-400 uppercase tracking-wide">
                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{attraction.duration}</div>
                    <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{attraction.price}</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVote(attraction.id, "up")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                          attraction.userVote === "up"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-500 border border-transparent"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" /> <span className="text-sm font-bold">{attraction.votes.up}</span>
                      </button>
                      <button
                        onClick={() => handleVote(attraction.id, "down")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                          attraction.userVote === "down"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-500 border border-transparent"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" /> <span className="text-sm font-bold">{attraction.votes.down}</span>
                      </button>
                    </div>

                    {/* BUTOANE ACTION - ADAUGAT BUTONUL DE ITINERARIU */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenAddDialog(attraction)}
                        className="flex-1 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
                      >
                        <CalendarPlus className="w-4 h-4" /> Adaugă
                      </button>

                      <button 
                        onClick={() => handleShareToChat(attraction)}
                        className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 dark:shadow-none"
                      >
                        <MessageCircle className="w-4 h-4" /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAttractions.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center opacity-40">
              <MapPin className="w-16 h-16 mb-4" />
              <p className="text-lg font-bold">Nicio atracție găsită</p>
            </div>
          )}
        </div>
      </div>

      {/* DIALOG PENTRU ADĂUGARE ÎN ITINERARIU */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">Adaugă în Itinerar</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedAttraction?.name}</p>
                </div>
                <button onClick={() => setIsAddDialogOpen(false)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 mb-8">
                {/* SELECTOR CALATORIE */}
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 block px-1">Alege Excursia</label>
                  <div className="relative">
                    <select 
                      value={addFormData.targetTripId}
                      onChange={(e) => setAddFormData({...addFormData, targetTripId: e.target.value})}
                      className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer pr-10"
                    >
                      {matchingTrips.map(tripItem => (
                        <option key={tripItem.id} value={tripItem.id}>{tripItem.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* SELECTOR ZI */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 block px-1">Ziua</label>
                    <input 
                      type="number" min="1" max="14"
                      value={addFormData.day}
                      onChange={(e) => setAddFormData({...addFormData, day: parseInt(e.target.value) || 1})}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-bold text-center text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 block px-1">Ora Start</label>
                    <input 
                      type="time"
                      value={addFormData.time}
                      onChange={(e) => setAddFormData({...addFormData, time: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* INPUT DURATA */}
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 block px-1">Durată estimată</label>
                  <input 
                    type="text"
                    placeholder="ex: 2h 30m"
                    value={addFormData.duration}
                    onChange={(e) => setAddFormData({...addFormData, duration: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all"
                >
                  Anulează
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="flex-[1.5] py-4 bg-blue-600 text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-all"
                >
                  Confirmă
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}