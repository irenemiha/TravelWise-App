import { Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Star, Heart, Loader2, Clock, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayRemove, collection, query, where, limit, getDocs } from "firebase/firestore";
import { toast } from "sonner";

export interface SavedAttraction {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  category: string;
}

export function SavedAttractions() {
  const navigate = useNavigate();
  const [savedAttractions, setSavedAttractions] = useState<SavedAttraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastTripId, setLastTripId] = useState<string | null>(null);

  // 1. DETERMINĂM UN TRIP ID VALID PENTRU NAVIGARE
  // Avem nevoie de un tripId pentru a trimite userul la /explore/:tripId#id
  useEffect(() => {
    const fetchLastTrip = async () => {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "trips"), 
        where("participants", "array-contains", auth.currentUser.uid),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        setLastTripId(snap.docs[0].id);
      }
    };
    fetchLastTrip();
  }, []);

  // 2. ASCULTĂM ID-URILE ȘI PRELUĂM DETALIILE REALE
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const ids = userData.savedAttractions || [];
        
        if (ids.length === 0) {
          setSavedAttractions([]);
          setLoading(false);
          return;
        }

        // Preluăm detaliile pentru fiecare ID de la Geoapify
        const API_KEY = "6627c045fcd14d76b5b547c8f3c54d17";
        try {
          const detailsPromises = ids.map(async (placeId: string) => {
            const res = await fetch(`https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${API_KEY}`);
            const data = await res.json();
            if (data.features && data.features.length > 0) {
              const p = data.features[0].properties;
              const cleanName = (p.name || "Punct turistic").split(/[($]/)[0].trim();
              
              // Seed determinist pentru imagine și rating (să fie la fel ca în Explore)
              const seed = placeId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
              
              return {
                id: placeId,
                name: cleanName,
                location: p.city || p.state || "Destinație",
                rating: parseFloat((4.2 + ((seed % 8) / 10)).toFixed(1)),
                image: `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cleanName)}&w=800&h=600&c=1`,
                category: p.categories?.[0] || "Atracție"
              };
            }
            return null;
          });

          const results = await Promise.all(detailsPromises);
          setSavedAttractions(results.filter(r => r !== null) as SavedAttraction[]);
        } catch (err) {
          console.error("Error fetching place details:", err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 3. LOGICĂ DE ELIMINARE
  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevenim navigarea când apăsăm pe inimioară
    e.stopPropagation();
    
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        savedAttractions: arrayRemove(id)
      });
      toast.success("Eliminat de la favorite");
    } catch (error) {
      toast.error("Eroare la eliminare.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">Încărcăm favoritele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300 pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800 sticky top-0 z-50 flex items-center p-4 shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 active:scale-90 transition-all mr-2"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center pr-10 tracking-tight">Atracții Salvate</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col gap-6">
        {savedAttractions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800">
              <Heart className="w-10 h-10 text-gray-200 dark:text-gray-700" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Lista este goală</h2>
            <p className="text-gray-500 dark:text-gray-400 text-md px-10 font-medium">Obiectivele tale preferate vor apărea aici după ce explorezi noi locații.</p>
            <button 
              onClick={() => navigate("/")} 
              className="mt-10 bg-blue-600 text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
            >
              Descoperă locuri noi
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {savedAttractions.map((item) => (
              <Link 
                key={item.id} 
                // Navigăm către Explore cu Hash-ul obiectivului
                to={lastTripId ? `/explore/${lastTripId}#${item.id}` : "/"}
                className="group bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-all active:scale-[0.98] hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  <button 
                    onClick={(e) => handleRemove(e, item.id)}
                    className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-full shadow-lg active:scale-125 transition-all backdrop-blur-md border border-white/20"
                  >
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </button>

                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-400/30 shadow-lg">
                      {item.category.split('.')[0]}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight truncate flex-1 pr-4">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-xl transition-colors shrink-0 border border-yellow-100/50 dark:border-yellow-900/50">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-black text-yellow-700 dark:text-yellow-500">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter transition-colors">
                      <MapPin className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400" />
                      {item.location}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-700 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}