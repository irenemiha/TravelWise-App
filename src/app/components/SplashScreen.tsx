import { motion } from "framer-motion";
import { Compass, ChevronRight } from "lucide-react";

interface SplashScreenProps {
  showLoginButton?: boolean;
}

export function SplashScreen({ showLoginButton = false }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-slate-950 flex flex-col items-center justify-center p-6">
      
      {/* Zona Logo-ului */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20"
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-black text-3xl mt-6 tracking-[0.2em] uppercase"
        >
          TravelWise
        </motion.h1>
      </div>

      {/* Butonul care apare doar dacă nu suntem logați */}
      {showLoginButton && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm mb-10"
        >
          <button 
            onClick={() => window.location.href = "/login"} // Forțăm navigarea la Auth
            className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-blue-50 active:scale-95 transition-all"
          >
            Începe acum
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-white/60 text-center mt-4 text-sm">
            Planifică-ți următoarea aventură în grup
          </p>
        </motion.div>
      )}
    </div>
  );
}