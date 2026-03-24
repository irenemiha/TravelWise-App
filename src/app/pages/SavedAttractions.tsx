import { Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Star, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const MOCK_SAVED = [
  {
    id: "a1",
    name: "Turnul Eiffel",
    location: "Paris, Franța",
    rating: 4.8,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a2",
    name: "Muzeul Luvru",
    location: "Paris, Franța",
    rating: 4.9,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a3",
    name: "Colosseum",
    location: "Roma, Italia",
    rating: 4.7,
    reviews: 2890,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "a4",
    name: "Santorini",
    location: "Grecia",
    rating: 4.9,
    reviews: 4100,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
  }
];

export function SavedAttractions() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(MOCK_SAVED);

  const toggleSave = (id: string) => {
    // În mod real ar face call către API, aici doar ștergem local ca demo
    setSaved(saved.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <div className="bg-white border-b sticky top-0 z-10 flex items-center p-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-10">Atracții Salvate</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col gap-4">
        {saved.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Nu ai salvat nimic încă</h2>
            <p className="text-gray-500 text-sm">Explorează destinații și adaugă-le la favorite pentru a le găsi mai ușor aici.</p>
            <button onClick={() => navigate("/")} className="mt-8 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-transform">
              Descoperă Atracții
            </button>
          </div>
        ) : (
          saved.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full shadow-md active:scale-90 transition-transform"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-orange-700">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 font-medium">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
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