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
  Loader2,
  Utensils,
  Palmtree,
  Library,
  History,
  LayoutGrid,
  Send,
  Sparkles,
  CheckCircle2,
  Lock // Adăugat pentru iconița de sesiune blocată
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect, useRef } from "react";

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
  lat: number;  
  lng: number;
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
  
  const [userSavedIds, setUserSavedIds] = useState<string[]>([]);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [votesData, setVotesData] = useState<{[key: string]: any}>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [addedActivitiesNames, setAddedActivitiesNames] = useState<string[]>([]);
  const [recommendedAttractions, setRecommendations] = useState<Attraction[]>([]);

  // Stări pentru salvarea activităților manuale de la tastatură
  const [isSaving, setIsSaving] = useState(false);
  const [isCustomActivityModalOpen, setIsCustomActivityModalOpen] = useState(false);
  const [customActivity, setCustomActivity] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    type: "attraction"
  });

  const [chatFormData, setChatFormData] = useState({
    targetTripId: tripId
  });

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
      case "Restaurante": return `${Math.floor(15 + factor * 25)}-${Math.floor(45 + factor * 50)} €`;
      case "Muzee": return `${Math.floor(10 + factor * 10)}-${Math.floor(22 + factor * 15)} €`;
      case "Istoric": return (seed % 3 === 0) ? "Gratuit" : `${Math.floor(8 + factor * 12)} €`;
      case "Atracții": return `${Math.floor(12 + factor * 15)}-${Math.floor(30 + factor * 30)} €`;
      default: return "Gratuit";
    }
  };

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
    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubUser = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setUserSavedIds(snap.data().savedAttractions || []);
      }
    });
    return () => { unsubTrip(); unsubUser(); };
  }, [tripId]);

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

  useEffect(() => {
    if (!tripId) return;
    const itineraryRef = collection(db, "trips", tripId, "itinerary");
    
    const unsubItineraryCheck = onSnapshot(itineraryRef, (snapshot) => {
      const names: string[] = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.name) names.push(data.name);
      });
      setAddedActivitiesNames(names);
    });
    return () => unsubItineraryCheck();
  }, [tripId]);

  useEffect(() => {
    if (!trip?.destination) return;
    const cityName = trip.destination.split(",")[0].trim();
    const cacheKey = `explore_cache_${cityName}`;

    const fetchPlaces = async () => {
      const savedCache = localStorage.getItem(cacheKey);
      if (savedCache) {
        const parsedData = JSON.parse(savedCache);
        const syncedWithHearts = parsedData.map((attr: Attraction) => ({
          ...attr,
          saved: userSavedIds.includes(attr.id)
        }));
        setAttractions(syncedWithHearts);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) throw new Error("City not found");
        const { lat, lon } = geoData[0];
        
        const API_KEY = "6627c045fcd14d76b5b547c8f3c54d17";
        const response = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.attraction,catering.restaurant,entertainment.museum,heritage&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=50&lang=ro&apiKey=${API_KEY}`
        );
        const data = await response.json();
        
        if (!data || !data.features) {
          setAttractions([]);
          setIsLoading(false);
          return;
        }

        const filteredFeatures = data.features.filter((f: any) => {
           const cityProp = f.properties.city || "";
           const countyProp = f.properties.county || "";
           return cityProp.toLowerCase().includes(cityName.toLowerCase()) || 
                  countyProp.toLowerCase().includes(cityName.toLowerCase());
        });

        const mappedData: Attraction[] = filteredFeatures.map((f: any) => {
          const p = f.properties;
          const cats = p.categories || [];
          const attractionId = p.place_id;
          let category = "Atracții";
          if (cats.includes("catering.restaurant")) category = "Restaurante";
          else if (cats.includes("entertainment.museum")) category = "Muzee";
          else if (cats.includes("heritage")) category = "Istoric";
          const cleanName = (p.name || "Punct turistic").split(/[($]/)[0].trim();
          
          const defaultLat = parseFloat(lat);
          const defaultLng = parseFloat(lon);

          return {
            id: attractionId,
            name: cleanName,
            description: "Descoperă această locație superbă în " + cityName,
            image: `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cleanName + " " + cityName)}&w=1200&h=800&c=1&p=0`, 
            rating: parseFloat((4.2 + ((getDeterministicSeed(attractionId) % 8) / 10)).toFixed(1)),
            votes: { up: 0, down: 0 },
            category: category,
            location: cityName,
            duration: category === "Restaurant" ? "1.5h" : "2h",
            price: generateDeterministicPrice(attractionId, category),
            saved: userSavedIds.includes(attractionId),
            userVote: null,
            lat: f.geometry?.coordinates ? Number(f.geometry.coordinates[1]) : defaultLat,
            lng: f.geometry?.coordinates ? Number(f.geometry.coordinates[0]) : defaultLng
          };
        });

        localStorage.setItem(cacheKey, JSON.stringify(mappedData));
        setAttractions(mappedData);
      } catch (error) { 
        console.error("Explore error:", error); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchPlaces();
  }, [trip?.destination, userSavedIds.length]);

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId || attractions.length === 0) {
      setRecommendations([]);
      return;
    }

    const likedCategories = new Set<string>();
    attractions.forEach(attr => {
      const persistentVote = votesData[attr.id];
      if (persistentVote?.voters?.[currentUserId] === "up") {
        likedCategories.add(attr.category);
      }
    });

    if (likedCategories.size === 0) {
      setRecommendations([]);
      return;
    }

    const freshRecommendations = attractions.filter(attr => {
      const persistentVote = votesData[attr.id];
      const hasLiked = persistentVote?.voters?.[currentUserId] === "up";
      const isAlreadyAdded = addedActivitiesNames.includes(attr.name);
      return likedCategories.has(attr.category) && !hasLiked && !isAlreadyAdded;
    }).slice(0, 4);

    setRecommendations(freshRecommendations);
  }, [votesData, attractions, addedActivitiesNames]);

  const scrollToLocation = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      setSearchQuery("");
      setIsDropdownOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-4", "ring-blue-500", "ring-offset-4", "dark:ring-offset-gray-950");
        setTimeout(() => element.classList.remove("ring-4", "ring-blue-500"), 3000);
      }, 100);
    }
  };

  const handleOriginalVote = async (attractionId: string, type: "up" | "down") => {
    // SECURITY GUARD: Dacă votul e închis, blocăm acțiunea de votare la nivel de cod
    if (trip?.votingStatus === "finished") {
      toast.error("Votarea a fost încheiată pentru această călătorie.");
      return;
    }
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

  const handleDirectAddProposal = async (attr: Attraction) => {
    // SECURITY GUARD: Blocăm propunerea dacă sesiunea e închisă
    if (trip?.votingStatus === "finished") {
      toast.error("Planul este finalizat. Nu mai poți trimite propuneri.");
      return;
    }
    if (!auth.currentUser || !tripId) return;
    try {
      const cityName = trip?.destination?.split(',')[0].trim() || "";
      const structuredLocation = attr.name.toLowerCase().includes(cityName.toLowerCase())
        ? attr.name
        : `${attr.name}, ${cityName}`;

      await addDoc(collection(db, "trips", tripId, "itinerary"), {
        name: attr.name,
        description: attr.description,
        location: structuredLocation, 
        duration: attr.duration,
        price: attr.price,
        type: attr.category === "Restaurante" ? "meal" : "attraction",
        image: attr.image,
        addedBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        lat: Number(attr.lat),
        lng: Number(attr.lng),
        day: 0,
        time: ""
      });
      toast.success(`Ai propus ${attr.name} pentru votare!`);
    } catch (e) { toast.error("Eroare la trimiterea propunerii."); }
  };

  const handleSaveCustomActivity = async () => {
    if (trip?.votingStatus === "finished") return;
    if (!customActivity.name || !customActivity.location) {
      toast.error("Numele și locația sunt obligatorii!");
      return;
    }

    setIsSaving(true);

    try {
      const cityName = trip?.destination?.split(',')[0].trim() || "";
      const searchQuery = `${customActivity.location}, ${cityName}`;
      
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const geoData = await geoRes.json();

      let finalLat = 0;
      let finalLng = 0;

      if (geoData && geoData.length > 0) {
        finalLat = parseFloat(geoData[0].lat);
        finalLng = parseFloat(geoData[0].lon);
      } else {
        finalLat = trip?.lat ? Number(trip.lat) : 47.4979; 
        finalLng = trip?.lng ? Number(trip.lng) : 19.0402;
      }

      const finalLocationText = customActivity.location.toLowerCase().includes(cityName.toLowerCase())
        ? customActivity.location
        : `${customActivity.location}, ${cityName}`;

      await addDoc(collection(db, "trips", tripId, "itinerary"), {
        name: customActivity.name,
        description: customActivity.description || "Activitate adăugată manual",
        location: finalLocationText, 
        duration: "2h",
        price: customActivity.price || "Gratuit",
        type: customActivity.type, 
        image: `https://tse1.mm.bing.net/th?q=${encodeURIComponent(customActivity.name + " " + cityName)}&w=1200&h=800&c=1&p=0`,
        addedBy: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        lat: finalLat,
        lng: finalLng,
        day: 0,
        time: ""
      });

      toast.success("Propunere manuală înregistrată!");
      setIsCustomActivityModalOpen(false); 
      
      setCustomActivity({
        name: "",
        description: "",
        location: "",
        price: "",
        type: "attraction"
      });

    } catch (error) {
      toast.error("A apărut o eroare la salvare.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmSendToChat = async () => {
    if (!selectedAttraction || !auth.currentUser) return;
    try {
      await addDoc(collection(db, "trips", chatFormData.targetTripId, "messages"), {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "Călător",
        text: `Uită-te la această locație: ${selectedAttraction.name}`,
        imageUrl: selectedAttraction.image, 
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
    const isCurrentlySaved = userSavedIds.includes(id);
    try {
      if (isCurrentlySaved) {
        await updateDoc(userRef, { savedAttractions: arrayRemove(id) });
        toast.info("Eliminat din favorite");
      } else {
        await updateDoc(userRef, { savedAttractions: arrayUnion(id) });
        toast.success("Salvat la favorite!");
      }
    } catch (e) { toast.error("Eroare la salvare."); }
  };

  const handleOpenChatDialog = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setChatFormData({ targetTripId: tripId });
    setIsChatDialogOpen(true);
  };

  const categories = ["all", "Restaurante", "Muzee", "Istoric", "Atracții"];
  const filteredAttractions = attractions.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === "all" || a.category === selectedCategory));

  if (!trip) return <div className="h-screen flex items-center justify-center dark:bg-gray-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  // Variabilă helper booleană pentru a verifica starea sesiunii
  const isVotingClosed = trip?.votingStatus === "finished";

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 text-gray-900 dark:text-white pb-20">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto h-16 px-6 flex items-center gap-4">
          <Link to={`/trip/${tripId}`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 active:scale-90 transition-all"><ArrowLeft className="w-6 h-6 stroke-[2.5]" /></Link>
          <h1 className="text-xl font-bold truncate">Explorează {trip.destination.split(',')[0]}</h1>
        </div>
      </header>

      {/* --- BANNER INTEGRAT PENTRU STATE LOCK DE COMBATERE CONFURIE (DACA VOTUL E INCHIS) --- */}
      {isVotingClosed && (
        <div className="max-w-md mx-auto mt-4 px-6 animate-in slide-in-from-top-3 duration-300">
          <div className="bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <div className="text-left">
              <h4 className="text-xs font-black uppercase text-red-800 dark:text-red-400 tracking-wider">Planificare Finalizată</h4>
              <p className="text-[11px] text-red-600 dark:text-red-400/90 font-medium mt-0.5">Sesiunea de votare a fost blocată de administrator. Interfața este acum în modul de citire.</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="w-full relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Caută locații..." value={searchQuery} onFocus={() => setIsDropdownOpen(true)} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }} className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-900 shadow-sm transition-all" />
            </div>
            
            {/* MODIFICAT DINAMIC: Dezactivăm și schimbăm stilul butonului custom dacă votul e închis */}
            <button 
              onClick={() => !isVotingClosed && setIsCustomActivityModalOpen(true)} 
              disabled={isVotingClosed}
              className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all ${
                isVotingClosed 
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none" 
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white active:scale-95"
              }`}
            >
              {isVotingClosed ? "Adăugare manuală blocată" : "+ Adaugă atracție manuală (Custom)"}
            </button>

            <div className="flex w-full justify-between gap-4 overflow-x-auto py-2 px-1 scrollbar-hide no-scrollbar">
              {categories.map((cat) => (
                <div key={cat} className="flex flex-col items-center gap-2 shrink-0">
                  <button onClick={() => setSelectedCategory(cat)} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${selectedCategory === cat ? "bg-blue-600 text-white scale-110 shadow-lg" : "bg-white dark:bg-gray-900 text-gray-400 border border-gray-100 dark:border-gray-800"}`}>
                    {cat === "all" ? <LayoutGrid className="w-5 h-5" /> : cat === "Restaurante" ? <Utensils className="w-5 h-5" /> : cat === "Muzee" ? <Library className="w-5 h-5" /> : cat === "Istoric" ? <History className="w-5 h-5" /> : <Palmtree className="w-5 h-5" />}
                  </button>
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${selectedCategory === cat ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>{cat === "all" ? "Toate" : cat}</span>
                </div>
              ))}
            </div>
          </div>

          {recommendedAttractions.length > 0 && (
            <div className="w-full mt-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-3 px-1">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-400">Recomandat pentru tine</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-hide no-scrollbar w-full px-1">
                {recommendedAttractions.map((rec) => (
                  <div key={rec.id} onClick={() => scrollToLocation(rec.id)} className="flex gap-3 bg-white dark:bg-gray-900 border border-gray-100 p-3 rounded-2xl shadow-sm shrink-0 w-[260px] cursor-pointer active:scale-95">
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0"><ImageWithFallback src={rec.image} alt={rec.name} className="w-full h-full object-cover" /></div>
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <h4 className="text-sm font-extrabold truncate text-gray-900 dark:text-white">{rec.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase mt-0.5">{rec.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 rounded-2xl p-4 my-8 w-full grid grid-cols-3 gap-2 text-center">
            <div><div className="text-lg font-black text-blue-600">{userSavedIds.length}</div><div className="text-[10px] text-gray-500 uppercase font-bold">Favorite</div></div>
            <div className="border-x border-blue-200"><div className="text-lg font-black text-blue-600">{attractions.length}</div><div className="text-[10px] text-gray-500 uppercase font-bold">Locații</div></div>
            <div><div className="text-lg font-black text-blue-600">{filteredAttractions.length}</div><div className="text-[10px] text-gray-500 uppercase font-bold">Rezultate</div></div>
          </div>

          <div className="flex flex-col gap-8 w-full">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center gap-4 text-gray-400"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /><p className="font-bold uppercase text-[10px] tracking-widest text-center">Căutăm locuri...</p></div>
            ) : filteredAttractions.map((attr) => {
              const persistentVote = votesData[attr.id] || { up: 0, down: 0, voters: {} };
              const userVote = persistentVote.voters?.[auth.currentUser?.uid || ""] || null;
              const isAlreadyAdded = addedActivitiesNames.includes(attr.name);

              return (
              <div id={attr.id} key={attr.id} className="bg-white rounded-[2.5rem] dark:bg-gray-900 shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 w-full flex">
                  <ImageWithFallback src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                  <button onClick={() => toggleSave(attr.id)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg"><Heart className={`w-6 h-6 ${userSavedIds.includes(attr.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} /></button>
                  <div className="absolute top-6 left-4 bg-black/40 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">{attr.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <h3 className="text-xl font-extrabold leading-tight flex-1">{attr.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-lg"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-black text-yellow-700">{attr.rating}</span></div>
                  </div>
                  <p className="text-md text-gray-500 mb-4 font-medium">{attr.description}</p>
                  <div className="flex items-center justify-between gap-6 mb-6">
                    <div className="flex gap-4">
                      <div><span className="text-[10px] text-gray-400 font-bold uppercase">Durată</span><span className="text-sm font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{attr.duration}</span></div>
                      <div><span className="text-[10px] text-gray-400 font-bold uppercase">Preț</span><span className="text-sm font-bold flex items-center gap-1 text-blue-600"><DollarSign className="w-3.5 h-3.5" />{attr.price}</span></div>
                    </div>
                  </div>
                  
                  {/* MODIFICAT DINAMIC: Dezactivăm visual opțiunile de vot dacă sesiunea e marcată închisă */}
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => handleOriginalVote(attr.id, "up")} 
                      disabled={isVotingClosed}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${
                        isVotingClosed ? "bg-gray-50/50 text-gray-300 dark:bg-gray-800/40 cursor-not-allowed" :
                        userVote === "up" ? "bg-green-500 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> {persistentVote.up || 0}
                    </button>
                    <button 
                      onClick={() => handleOriginalVote(attr.id, "down")} 
                      disabled={isVotingClosed}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${
                        isVotingClosed ? "bg-gray-50/50 text-gray-300 dark:bg-gray-800/40 cursor-not-allowed" :
                        userVote === "down" ? "bg-red-500 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" /> {persistentVote.down || 0}
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* MODIFICAT DINAMIC: Dezactivăm butonul principal de trimitere propuneri */}
                    <button 
                      onClick={() => handleDirectAddProposal(attr)} 
                      disabled={isAlreadyAdded || isVotingClosed} 
                      className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${
                        isVotingClosed
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none active:scale-100"
                          : isAlreadyAdded 
                            ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none active:scale-100" 
                            : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      }`}
                    >
                      {isVotingClosed ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Vot închis</span>
                        </>
                      ) : isAlreadyAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Propus</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-4 h-4" />
                          <span>Propune</span>
                        </>
                      )}
                    </button>
                    <button onClick={() => handleOpenChatDialog(attr)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"><MessageCircle className="w-4 h-4" /> Chat</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* MODAL PENTRU ADĂUGARE ACTIVITĂȚI MANUALE (CUSTOM) */}
      {isCustomActivityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 w-full max-w-sm border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-4">
              <h3 className="text-lg font-bold">Atracție Custom (Manuală)</h3>
              <button onClick={() => setIsCustomActivityModalOpen(false)} className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 w-full mb-6 text-left">
              <div>
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Nume Locație</label>
                <input type="text" placeholder="Ex: Ateneul Român, Cafenea etc." value={customActivity.name} onChange={(e) => setCustomActivity({ ...customActivity, name: e.target.value })} className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border p-3.5 rounded-xl font-semibold text-sm outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Adresă / Locație specifică</label>
                <input type="text" placeholder="Ex: Strada Benjamin Franklin 1-3" value={customActivity.location} onChange={(e) => setCustomActivity({ ...customActivity, location: e.target.value })} className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border p-3.5 rounded-xl font-semibold text-sm outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Descriere scurtă</label>
                <input type="text" placeholder="O scurtă descriere a obiectivului..." value={customActivity.description} onChange={(e) => setCustomActivity({ ...customActivity, description: e.target.value })} className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border p-3.5 rounded-xl font-semibold text-sm outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Tip Activitate</label>
                  <select value={customActivity.type} onChange={(e) => setCustomActivity({ ...customActivity, type: e.target.value })} className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border p-3.5 rounded-xl font-semibold text-xs outline-none text-gray-800 dark:text-white">
                    <option value="attraction">Atracție</option>
                    <option value="meal">Restaurant / Masă</option>
                    <option value="transport">Transport</option>
                    <option value="break">Timp liber</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest px-1">Preț estimat</label>
                  <input type="text" placeholder="Ex: 15 € sau Gratuit" value={customActivity.price} onChange={(e) => setCustomActivity({ ...customActivity, price: e.target.value })} className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border p-3.5 rounded-xl font-semibold text-center text-sm outline-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <button onClick={() => setIsCustomActivityModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest">Anulează</button>
              <button 
                onClick={handleSaveCustomActivity}
                disabled={isSaving}
                className="flex-[1.5] py-4 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 disabled:bg-blue-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Se caută pe hartă...</span>
                  </>
                ) : (
                  <span>Confirmă</span>
                )}
              </button>
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
                <button onClick={handleConfirmSendToChat} className="flex-[1.5] py-4 bg-blue-600 text-white rounded-2xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Trimite</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}