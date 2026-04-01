import { Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Star, Heart, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import { toast } from "sonner";

export function SavedAttractions() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. ASCULTĂM LISTA DE ID-URI SALVATE DIN PROFILUL USERULUI
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setSavedIds(userData.savedAttractions || []);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. LOGICĂ DE ELIMINARE DIN FIREBASE
  const toggleSave = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        savedAttractions: arrayRemove(id)
      });
      toast.success("Eliminat de la favorite");
    } catch (error) {
      console.error("Error removing attraction:", error);
      toast.error("Nu s-a putut elimina.");
    }
  };

  // NOTĂ: Într-o aplicație reală, aici am face un fetch suplimentar pentru 
  // detaliile acestor ID-uri dintr-o colecție globală "places" sau API.
  // Momentan, filtrăm mock-ul pentru a păstra UI-ul intact.
  const MOCK_DATA_DETAILS = [
    { id: "a1", name: "Turnul Eiffel", location: "Paris, Franța", rating: 4.8, image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800" },
    { id: "a2", name: "Muzeul Luvru", location: "Paris, Franța", rating: 4.9, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800" },
    { id: "a3", name: "Colosseum", location: "Roma, Italia", rating: 4.7, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800" },
    { id: "a4", name: "Santorini", location: "Grecia", rating: 4.9, image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800" }
  ];

  const displayAttractions = MOCK_DATA_DETAILS.filter(attr => savedIds.includes(attr.id));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10 flex items-center p-4 shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors mr-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white flex-1 text-center pr-10">Atracții Salvate</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col gap-4">
        {displayAttractions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Heart className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nu ai salvat nimic încă</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Explorează destinații și adaugă-le la favorite pentru a le găsi mai ușor aici.</p>
            <button 
              onClick={() => navigate("/")} 
              className="mt-8 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/30 dark:shadow-none active:scale-95 transition-all"
            >
              Descoperă Atracții
            </button>
          </div>
        ) : (
          displayAttractions.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-colors">
              <div className="relative h-48 w-full">
                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-full shadow-md active:scale-90 transition-all backdrop-blur-sm"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 rounded-lg transition-colors">
                    <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-orange-700 dark:text-orange-400">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                  {item.location}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}