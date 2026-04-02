import { motion } from "framer-motion";
import { Compass, ChevronRight, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Folosim navigate din react-router

export function SplashScreen() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Declanșăm apariția butoanelor după 1.5 secunde de animație
    const timer = setTimeout(() => setShowButtons(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-950 via-purple-950 to-fuchsia-950 flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Zona Logo-ului - Rămâne centrală */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/20"
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-black text-3xl mt-6 tracking-[0.2em] uppercase text-center"
        >
          TravelWise
        </motion.h1>
      </div>

      {/* Zona de Acțiuni - Apare prin slide up după delay */}
      <div className="w-full max-w-md pb-10">
        {showButtons && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <button 
              onClick={() => navigate("/login")} // Trimite la Auth.tsx
              className="w-full bg-white text-blue-600 font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all uppercase text-xs tracking-widest"
            >
              <UserPlus className="w-4 h-4" />
              Creează cont nou
            </button>

            <button 
              onClick={() => navigate("/login")}
              className="w-full bg-white/10 border border-white/20 text-white font-bold py-5 rounded-2xl backdrop-blur-md active:scale-95 transition-all uppercase text-xs tracking-widest"
            >
              Am deja cont
            </button>

            <p className="text-white/60 text-center mt-2 text-[12px] uppercase font-bold tracking-widest">
              Planifică aventura perfectă
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}