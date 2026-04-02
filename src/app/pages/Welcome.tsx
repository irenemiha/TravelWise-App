import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { SplashScreen } from "../components/SplashScreen"; 

export function Welcome() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full bg-blue-600 overflow-hidden">
      <SplashScreen />

      <div className={`absolute inset-x-0 bottom-12 px-8 z-50 transition-all duration-1000 transform ${
        showButtons ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* BUTON: CREEAZĂ CONT NOU - Trimite isLogin: false */}
          <button 
            onClick={() => navigate("/login?mode=signup")}
            className="w-full bg-white text-blue-600 font-black py-5 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
          >
            Creează cont nou
            <ArrowRight className="w-4 h-4" />
          </button>
          
          {/* BUTON: AM DEJA CONT - Trimite isLogin: true */}
          <button 
            onClick={() => navigate("/login?mode=login")}
            className="w-full bg-blue-700/40 text-white border border-white/20 backdrop-blur-md font-bold py-5 rounded-2xl active:scale-95 transition-all uppercase text-[11px] tracking-widest"
          >
            Am deja cont
          </button>
        </div>
      </div>
    </div>
  );
}