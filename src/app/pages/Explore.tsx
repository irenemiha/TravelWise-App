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
  LayoutGrid,
  Send
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc
} from "firebase/firestore";

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  votes: { up: number; down: number };
  category: string;
  location: string;
  duration: string;
  price: string;
  saved: boolean;
  userVote: "up" | "down" | null;
}

export function Explore() {
  const { id } = useParams();
  const tripId = id || "";
  const navigate = useNavigate();

  const [trip, setTrip] = useState<any>(null);
  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const [votesData, setVotesData] = useState<{[key: string]: any}>({});

  const [addFormData, setAddFormData] = useState({
    targetTripId: tripId,
    day: 1,
    time: "10:00",
    duration: "2h"
  });

  const [chatFormData, setChatFormData] = useState({
    targetTripId: tripId
  });

  // HELPER: DETERMINISTIC SEED & PRICE
  const getDeterministicSeed = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const generateDeterministicPrice = (id: string, category: string) => {
    const seed = getDeterministicSeed(id);
    const factor = (seed % 100) / 100;
    switch (category) {
      case "Restaurant": return `${Math.floor(15 + factor * 25)}-${Math.floor(45 + factor * 50)} €`;
      case "Muzeu": return `${Math.floor(10 + factor * 10)}-${Math.floor(22 + factor * 15)} €`;
      case "Istoric": return (seed % 3 === 0) ? "Gratuit" : `${Math.floor(8 + factor * 12)} €`;
      case "Atracție": return `${Math.floor(12 + factor * 15)}-${Math.floor(30 + factor * 30)} €`;
      default: return "Gratuit";
    }
  };

  // 1. FETCH DATE TRIP
  useEffect(() => {
    if (!auth.currentUser) return;
    const tripRef = doc(db, "trips", tripId);
    const unsubTrip = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) setTrip({ id: snap.id, ...snap.data() });
    });
    const q = query(collection(db, "trips"), where("participants", "array-contains", auth.currentUser.uid));
    getDocs(q).then(snap => {
      setMyTrips(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubTrip();
  }, [tripId]);

  // 2. ASCULTĂ VOTURILE REALE
  useEffect(() => {
    if (!tripId) return;
    const votesRef = collection(db, "trips", tripId, "attractionVotes");
    const unsubVotes = onSnapshot(votesRef, (snapshot) => {
      const votesMap: any = {};
      snapshot.docs.forEach(doc => { votesMap[doc.id] = doc.data(); });
      setVotesData(votesMap);
    });
    return () => unsubVotes();
  }, [tripId]);

  // 3. LOGICA GEOAPIFY
  useEffect(() => {
    if (!trip?.destination) return;
    const cityName = trip.destination.split(",")[0].trim();
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) throw new Error("City not found");
        const { lat, lon } = geoData[0];
        const API_KEY = "6627c045fcd14d76b5b547c8f3c54d17";
        const response = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.attraction,catering.restaurant,entertainment.museum,heritage&filter=circle:${lon},${lat},15000&limit=50&lang=ro&apiKey=${API_KEY}`
        );
        const data = await response.json();
        const mappedData: Attraction[] = data.features.map((f: any) => {
          const p = f.properties;
          const cats = p.categories || [];
          const attractionId = p.place_id;
          let category = "Atracție";
          if (cats.includes("catering.restaurant")) category = "Restaurant";
          else if (cats.includes("entertainment.museum")) category = "Muzeu";
          else if (cats.includes("heritage")) category = "Istoric";
          const cleanName = (p.name || "Punct turistic").split(/[($]/)[0].trim();
          return {
            id: attractionId,
            name: cleanName,
            description: "Descoperă această locație superbă în " + cityName,
            image: `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cleanName + " " + cityName)}&w=800&h=600&c=1`, 
            rating: parseFloat((4.2 + ((getDeterministicSeed(attractionId) % 8) / 10)).toFixed(1)),
            votes: { up: 0, down: 0 },
            category: category,
            location: cityName,
            duration: category === "Restaurant" ? "1.5h" : "2h",
            price: generateDeterministicPrice(attractionId, category),
            saved: false,
            userVote: null
          };
        });
        setAttractions(mappedData);
      } catch (error) { console.error("Explore error:", error); } 
      finally { setIsLoading(false); }
    };
    fetchPlaces();
  }, [trip?.destination]);

  // --- LOGICA NOUĂ: SCROLL LA ATRACȚIE DIN CHAT ---
  useEffect(() => {
    if (!isLoading && attractions.length > 0) {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            // Efect vizual scurt pentru a evidenția cardul
            element.classList.add("ring-4", "ring-blue-500", "ring-offset-4", "dark:ring-offset-gray-950");
            setTimeout(() => element.classList.remove("ring-4", "ring-blue-500"), 3000);
          }, 800);
        }
      }
    }
  }, [isLoading, attractions]);

  const handleVote = async (attractionId: string, type: "up" | "down") => {
    if (!auth.currentUser || !tripId) return;
    const userId = auth.currentUser.uid;
    const voteDocRef = doc(db, "trips", tripId, "attractionVotes", attractionId);
    const currentData = votesData[attractionId] || { up: 0, down: 0, voters: {} };
    const previousVote = currentData.voters?.[userId] || null;
    let newUp = currentData.up || 0;
    let newDown = currentData.down || 0;
    let newVoters = { ...(currentData.voters || {}) };
    if (previousVote === type) { newUp = type === "up" ? newUp - 1 : newUp; newDown = type === "down" ? newDown - 1 : newDown; delete newVoters[userId]; } 
    else {
      if (previousVote === "up") newUp--; if (previousVote === "down") newDown--;
      if (type === "up") newUp++; else newDown++;
      newVoters[userId] = type;
    }
    await setDoc(voteDocRef, { up: Math.max(0, newUp), down: Math.max(0, newDown), voters: newVoters });
  };

  const handleConfirmAdd = async () => {
    if (!selectedAttraction || !auth.currentUser) return;
    try {
      await addDoc(collection(db, "trips", addFormData.targetTripId, "itinerary"), {
        name: selectedAttraction.name,
        description: selectedAttraction.description,
        location: selectedAttraction.name,
        time: addFormData.time,
        day: addFormData.day,
        duration: addFormData.duration,
        price: selectedAttraction.price,
        type: selectedAttraction.category === "Restaurant" ? "meal" : "attraction",
        image: selectedAttraction.image,
        addedBy: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      toast.success("Adăugat!"); setIsAddDialogOpen(false);
    } catch (e) { toast.error("Eroare salvare."); }
  };

  // --- MODIFICARE: TRIMITE POZA ȘI NUMELE PE CHAT ---
  const handleConfirmSendToChat = async () => {
    if (!selectedAttraction || !auth.currentUser) return;
    try {
      await addDoc(collection(db, "trips", chatFormData.targetTripId, "messages"), {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "Călător",
        text: `Uită-te la această locație: ${selectedAttraction.name}`,
        sharedAttractionId: selectedAttraction.id,
        sharedAttractionName: selectedAttraction.name,
        sharedAttractionImage: selectedAttraction.image,
        timestamp: serverTimestamp()
      });
      toast.success("Trimis pe chat!");
      setIsChatDialogOpen(false);
      navigate(`/chat/${chatFormData.targetTripId}`);
    } catch (e) { toast.error("Eroare la trimitere."); }
  };

  const toggleSave = async (id: string) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    const isCurrentlySaved = attractions.find(a => a.id === id)?.saved;
    setAttractions(prev => prev.map(a => a.id === id ? { ...a, saved: !a.saved } : a));
    try { await updateDoc(userRef, { savedAttractions: isCurrentlySaved ? arrayRemove(id) : arrayUnion(id) }); } 
    catch (e) { console.error("Save error:", e); }
  };

  const handleOpenAddDialog = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setAddFormData(prev => ({ ...prev, targetTripId: tripId, duration: attraction.duration }));
    setIsAddDialogOpen(true);
  };

  const handleOpenChatDialog = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setChatFormData({ targetTripId: tripId });
    setIsChatDialogOpen(true);
  };

  const categories = ["all", "Restaurant", "Muzeu", "Istoric", "Atracție"];
  const filteredAttractions = attractions.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === "all" || a.category === selectedCategory));

  if (!trip) return <div className="h-screen flex items-center justify-center dark:bg-gray-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen text-gray-900 dark:text-white pb-20">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 flex items-center px-6 gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 active:scale-90 transition-all"><ArrowLeft className="w-6 h-6 stroke-[2.5]" /></Link>
          <h1 className="text-xl font-bold truncate">Explorează {trip.destination.split(',')[0]}</h1>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Caută locații..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 shadow-sm" />
            </div>
            <div className="flex justify-between w-full px-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${selectedCategory === cat ? "bg-blue-600 text-white scale-110" : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 shadow-sm"}`}>
                  {cat === "all" ? <LayoutGrid className="w-5 h-5" /> : cat === "Restaurant" ? <Utensils className="w-5 h-5" /> : cat === "Muzeu" ? <Library className="w-5 h-5" /> : cat === "Istoric" ? <History className="w-5 h-5" /> : <Palmtree className="w-5 h-5" />}
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
              <div className="py-20 flex flex-col items-center gap-4 text-gray-400"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /><p className="font-bold uppercase text-[10px] tracking-widest text-center px-10">Căutăm cele mai bune locuri...</p></div>
            ) : filteredAttractions.map((attr) => {
              const persistentVote = votesData[attr.id] || { up: 0, down: 0, voters: {} };
              const userVote = persistentVote.voters?.[auth.currentUser?.uid || ""] || null;
              return (
              // --- ADAUGAT id={attr.id} PENTRU SCROLL ---
              <div id={attr.id} key={attr.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 scroll-mt-24">
                <div className="relative h-64 w-full">
                  <ImageWithFallback src={attr.image} alt={attr.name} className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={() => toggleSave(attr.id)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg active:scale-125 transition-all">
                    <Heart className={`w-6 h-6 ${attr.saved ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                  </button>
                  <div className="absolute top-6 left-4 bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">{attr.category}</div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <h3 className="text-xl font-extrabold leading-tight flex-1">{attr.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-lg shrink-0">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-black text-yellow-700 dark:text-yellow-500">{attr.rating}</span>
                    </div>
                  </div>
                  <p className="text-md text-gray-500 dark:text-gray-400 mb-4 font-medium">{attr.description}</p>
                  
                  <div className="flex items-center justify-between gap-6 mb-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col"><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Durată</span><span className="text-sm font-bold flex items-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5" />{attr.duration}</span></div>
                      <div className="flex flex-col"><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Preț</span><span className={`text-sm font-bold flex items-center gap-1 mt-0.5 ${attr.price === 'Gratuit' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}><DollarSign className="w-3.5 h-3.5" />{attr.price}</span></div>
                    </div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attr.name + " " + attr.location)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm active:scale-90 transition-all">
                      <MapPin className="w-5 h-5 fill-current" />
                    </a>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button onClick={() => handleVote(attr.id, "up")} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all font-bold font-mono tracking-tighter ${userVote === "up" ? "bg-green-500 text-white shadow-md" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-green-50"}`}>
                      <ThumbsUp className="w-4 h-4" /> {persistentVote.up || 0}
                    </button>
                    <button onClick={() => handleVote(attr.id, "down")} className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all font-bold font-mono tracking-tighter ${userVote === "down" ? "bg-red-500 text-white shadow-md" : "bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-red-50"}`}>
                      <ThumbsDown className="w-4 h-4" /> {persistentVote.down || 0}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleOpenAddDialog(attr)} className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"><CalendarPlus className="w-4 h-4" /> Adaugă</button>
                    <button onClick={() => handleOpenChatDialog(attr)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"><MessageCircle className="w-4 h-4" /> Chat</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* DIALOGS... (Păstrate identic) */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 w-full max-w-sm border border-gray-100 dark:border-gray-800 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div><h3 className="text-xl font-extrabold tracking-tight">Planificare</h3><p className="text-sm text-gray-500 mt-1">{selectedAttraction?.name}</p></div>
                <button onClick={() => setIsAddDialogOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Călătoria vizată</label>
                  <select value={addFormData.targetTripId} onChange={(e) => setAddFormData({...addFormData, targetTripId: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold outline-none text-gray-900 dark:text-white">
                    {myTrips.map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Ziua</label>
                    <input type="number" min="1" value={addFormData.day} onChange={(e) => setAddFormData({...addFormData, day: parseInt(e.target.value) || 1})} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold text-center outline-none text-gray-900 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Ora Start</label>
                    <input type="time" value={addFormData.time} onChange={(e) => setAddFormData({...addFormData, time: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold outline-none text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsAddDialogOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest">Anulează</button>
                <button onClick={handleConfirmAdd} className="flex-[1.5] py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg">Confirmă</button>
              </div>
          </div>
        </div>
      )}

      {isChatDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 w-full max-w-sm border border-gray-100 dark:border-gray-800 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div><h3 className="text-xl font-extrabold tracking-tight">Trimite pe Chat</h3><p className="text-sm text-gray-500 mt-1">{selectedAttraction?.name}</p></div>
                <button onClick={() => setIsChatDialogOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6 mb-4">
                <div className="space-y-2">
                  <label className="text-[12px] uppercase font-black text-gray-400 tracking-widest px-1">Alege Chat-ul Trip-ului</label>
                  <select value={chatFormData.targetTripId} onChange={(e) => setChatFormData({ targetTripId: e.target.value })} className="w-full mt-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 font-bold outline-none text-gray-900 dark:text-white">
                    {myTrips.map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsChatDialogOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest">Anulează</button>
                <button onClick={handleConfirmSendToChat} className="flex-[1.5] py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Trimite</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}