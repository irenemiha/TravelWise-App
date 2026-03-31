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
  MessageCircle,
  ArrowLeft,
  CalendarPlus,
  X,
  ChevronDown,
  Loader2,
  Utensils,
  Palmtree,
  Library,
  History,
  LayoutGrid
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { mockAttractionsData, mockTrips, Attraction, addChatMessage, addItineraryActivity } from "../store";

export function Explore() {
  const { id } = useParams();
  const tripId = id || "1";
  const trip = mockTrips.find((t) => t.id === tripId) || mockTrips[0];
  const cityName = trip.destination.split(",")[0].trim();

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
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
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        // 1. Coordonate oraș
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("City not found");
        const { lat, lon } = geoData[0];

        // 2. Geoapify Fetch
        const API_KEY = "6627c045fcd14d76b5b47c8f3c54d17";
        const categories = "tourism.attraction,catering.restaurant,entertainment.museum,heritage";
        
        const response = await fetch(
          `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},15000&limit=50&apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error("Geoapify Error");
        const data = await response.json();

        const mappedData: Attraction[] = data.features.map((f: any) => {
          const p = f.properties;
          
          // Determinăm categoria pentru o căutare mai precisă de imagini
          let category = "Atracție";
          let imgSearchTerm = p.name || "landmark";
          
          if (p.categories.includes("catering.restaurant")) {
            category = "Restaurant";
            imgSearchTerm = `${p.name || 'restaurant'} food`;
          } else if (p.categories.includes("entertainment.museum")) {
            category = "Muzeu";
            imgSearchTerm = `${p.name || 'museum'} art`;
          } else if (p.categories.includes("heritage")) {
            category = "Istoric";
            imgSearchTerm = `${p.name || 'historical site'}`;
          }

          // Generăm URL-ul imaginii (folosim source.unsplash.com sau images.unsplash.com)
          // Adăugăm un ID random sau numele locației pentru a nu avea aceeași poză peste tot
          const imageUrl = `https://images.unsplash.com/featured/800x600?${encodeURIComponent(imgSearchTerm + " " + cityName)}`;

          return {
            id: p.place_id,
            name: p.name || p.street || "Locație interesantă",
            description: p.address_line2 || `Descoperă farmecul locației ${p.name || 'din apropiere'} în inima orașului ${cityName}.`,
            image: imageUrl, // Aici am activat pozele dinamice
            rating: parseFloat((4.0 + Math.random() * 0.9).toFixed(1)),
            votes: { up: Math.floor(Math.random() * 80), down: Math.floor(Math.random() * 5) },
            category: category,
            location: cityName,
            duration: category === "Restaurant" ? "1.5h" : "2.5h",
            price: category === "Restaurant" ? "$$" : "Gratuit",
            saved: false,
            userVote: null
          };
        }).filter((a: any) => a.name !== "Locație interesantă");

        setAttractions(mappedData);
      } catch (error) {
        console.warn("Geoapify failed, using mock fallback.");
        const mockFallback = Object.values(mockAttractionsData).flat().filter(a => 
           a.location.toLowerCase().includes(cityName.toLowerCase())
        );
        setAttractions(mockFallback.map(a => ({ ...a, userVote: null })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [cityName]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "all": return <LayoutGrid className="w-5 h-5" />;
      case "Restaurant": return <Utensils className="w-5 h-5" />;
      case "Muzeu": return <Library className="w-5 h-5" />;
      case "Istoric": return <History className="w-5 h-5" />;
      default: return <Palmtree className="w-5 h-5" />;
    }
  };

  const handleOpenAddDialog = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setAddFormData(prev => ({ ...prev, targetTripId: tripId, duration: attraction.duration }));
    setIsAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedAttraction) return;
    const newActivity = { id: Date.now().toString(), name: selectedAttraction.name, time: addFormData.time, type: "attraction" as const, description: selectedAttraction.description, location: selectedAttraction.name, duration: addFormData.duration, price: selectedAttraction.price, image: selectedAttraction.image };
    addItineraryActivity(addFormData.targetTripId, addFormData.day - 1, newActivity);
    toast.success(`Adăugat!`);
    setIsAddDialogOpen(false);
  };

  const handleVote = (id: string, type: "up" | "down") => {
    setAttractions(prev => prev.map(a => {
      if (a.id === id) {
        const newVotes = { ...a.votes };
        let newUserVote = a.userVote;
        if (a.userVote === type) {
          newUserVote = null;
          type === "up" ? newVotes.up-- : newVotes.down--;
        } else {
          if (a.userVote === "up") newVotes.up--;
          if (a.userVote === "down") newVotes.down--;
          newUserVote = type;
          type === "up" ? newVotes.up++ : newVotes.down++;
        }
        return { ...a, votes: newVotes, userVote: newUserVote };
      }
      return a;
    }));
  };

  const toggleSave = (id: string) => {
    setAttractions(prev => prev.map(a => a.id === id ? { ...a, saved: !a.saved } : a));
  };

  const categories = ["all", "Restaurant", "Muzeu", "Istoric", "Atracție"];
  const filteredAttractions = attractions.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (selectedCategory === "all" || a.category === selectedCategory)
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen text-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 flex items-center px-6 gap-4">
          <Link to={`/trip/${id}`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 active:scale-90 transition-all">
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </Link>
          <h1 className="text-xl font-bold truncate">Explorează {cityName}</h1>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text" placeholder="Caută locații reale..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 shadow-sm"
              />
            </div>
            
            <div className="flex justify-between w-full px-2">
              {categories.map((cat) => (
                <button
                  key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
                    selectedCategory === cat 
                    ? "bg-blue-600 text-white scale-110" 
                    : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 shadow-sm"
                  }`}
                >
                  {getCategoryIcon(cat)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-4 my-8 w-full grid grid-cols-3 gap-2 text-center backdrop-blur-sm">
              <div><div className="text-lg font-black text-blue-600 dark:text-blue-400">{attractions.filter(a => a.saved).length}</div><div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Favorite</div></div>
              <div className="border-x border-blue-200 dark:border-blue-800/50"><div className="text-lg font-black text-blue-600 dark:text-blue-400">{attractions.length}</div><div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Locații</div></div>
              <div><div className="text-lg font-black text-blue-600 dark:text-blue-400">{filteredAttractions.length}</div><div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Rezultate</div></div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center gap-4 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="font-bold uppercase text-[10px] tracking-widest text-center px-10">Sincronizăm locațiile reale...</p>
              </div>
            ) : filteredAttractions.map((attr) => (
              <div key={attr.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 w-full">
                  <ImageWithFallback src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                  <button onClick={() => toggleSave(attr.id)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg active:scale-125 transition-all">
                    <Heart className={`w-6 h-6 ${attr.saved ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                  </button>
                  <div className="absolute top-6 left-4 bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">{attr.category}</div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <h3 className="text-xl font-extrabold leading-tight flex-1">{attr.name}</h3>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-black text-yellow-700 dark:text-yellow-500">{attr.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-md text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{attr.description}</p>
                  <div className="flex items-center justify-between gap-6 mb-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col"><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Durată</span><span className="text-sm font-bold flex items-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5" />{attr.duration}</span></div>
                      <div className="flex flex-col"><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Preț</span><span className="text-sm font-bold flex items-center gap-1 mt-0.5"><DollarSign className="w-3.5 h-3.5" />{attr.price}</span></div>
                    </div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attr.name + " " + cityName)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm active:scale-90 transition-all"><MapPin className="w-5 h-5 fill-current" /></a>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleVote(attr.id, "up")} 
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all font-bold font-mono tracking-tighter ${
                          attr.userVote === "up" 
                          ? "bg-green-500 text-white shadow-md shadow-green-200" 
                          : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-green-50"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" /> {attr.votes.up}
                      </button>
                      <button 
                        onClick={() => handleVote(attr.id, "down")} 
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all font-bold font-mono tracking-tighter ${
                          attr.userVote === "down" 
                          ? "bg-red-500 text-white shadow-md shadow-red-200" 
                          : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-red-50"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" /> {attr.votes.down}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleOpenAddDialog(attr)} className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"><CalendarPlus className="w-4 h-4" /> Adaugă</button>
                      <button onClick={() => navigate(`/chat/${tripId}`)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"><MessageCircle className="w-4 h-4" /> Chat</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 w-full max-w-sm border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200 shadow-2xl">
             <div className="flex justify-between items-start mb-6">
                <div><h3 className="text-xl font-extrabold tracking-tight">Planificare</h3><p className="text-sm text-gray-500 mt-1">{selectedAttraction?.name}</p></div>
                <button onClick={() => setIsAddDialogOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Călătoria vizată</label>
                  <div className="relative">
                    <select value={addFormData.targetTripId} onChange={(e) => setAddFormData({...addFormData, targetTripId: e.target.value})} className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold outline-none focus:ring-2 focus:ring-blue-600 pr-10 text-black dark:text-white">
                      {matchingTrips.map(t => (<option key={t.id} value={t.id}>{t.name || t.name}</option>))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Ziua</label>
                    <input type="number" min="1" max="14" value={addFormData.day} onChange={(e) => setAddFormData({...addFormData, day: parseInt(e.target.value) || 1})} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold text-center outline-none text-black dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Ora Start</label>
                    <input type="time" value={addFormData.time} onChange={(e) => setAddFormData({...addFormData, time: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold outline-none text-black dark:text-white" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsAddDialogOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest active:scale-95 transition-all">Anulează</button>
                <button onClick={handleConfirmAdd} className="flex-[1.5] py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all">Confirmă</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}