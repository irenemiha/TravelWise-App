import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, MapPin, Calendar, Compass, ChevronRight, Users, Check, Mail, Plus, Search, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Importăm Firebase
import { db, auth } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function NewTrip() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [showCopyBadge, setShowCopyBadge] = useState(false);

  // --- LOGICA COPIERE LINK ---
  const handleCopyInviteLink = () => {
    const baseUrl = window.location.origin;
    const inviteText = `Bună! Te invit să planificăm împreună călătoria "${name || 'nouă'}" pe TravelWise! Alătură-te aici: ${baseUrl}/join/pending`;
    
    navigator.clipboard.writeText(inviteText).then(() => {
      setShowCopyBadge(true);
      setTimeout(() => setShowCopyBadge(false), 2000);
      toast.success("Link copiat!");
    });
  };

  // --- LOGICA GEONAMES ---
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (destination.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const USERNAME = "irenemiha"; 
        const response = await fetch(
          `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(destination)}&maxRows=10&username=${USERNAME}&lang=ro&featureClass=P&style=full`
        );
        const data = await response.json();
        
        if (data.geonames) {
          setSearchResults(data.geonames);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("GeoNames error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [destination]);

  const handleAddEmail = () => {
    if (emailInput && emailInput.includes("@") && !invitedEmails.includes(emailInput)) {
      setInvitedEmails([...invitedEmails, emailInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setInvitedEmails(prev => prev.filter(e => e !== email));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("Trebuie să fii logat!");
      return;
    }
    setIsCreating(true);

    try {
      const tripData = {
        name,
        destination,
        startDate,
        endDate,
        ownerId: auth.currentUser.uid,
        participants: [auth.currentUser.uid],
        invitedEmails,
        image: "",
        status: "planning",
        createdAt: serverTimestamp(),
        votesCount: 0,
        attractionsCount: 0
      };

      await addDoc(collection(db, "trips"), tripData);
      toast.success("Aventura a fost creată!");
      navigate("/"); 
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Eroare la salvare.");
    } finally {
      setIsCreating(false);
    }
  };

  const isFormValid = name && destination && startDate && endDate && !isCreating;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col items-center transition-colors duration-300 min-h-screen relative overflow-x-hidden pb-20">
      
      {/* BADGE ANIMAT - Respectă padding-ul de 6 (inset-x-6) */}
      <AnimatePresence>
        {showCopyBadge && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 inset-x-6 z-[100] max-w-md mx-auto bg-gray-900/90 dark:bg-blue-600/90 backdrop-blur-md text-white py-4 rounded-2xl shadow-2xl flex justify-center items-center gap-3 border border-white/20"
          >
            <Check className="w-5 h-5 text-white" />
            <span className="font-bold text-sm">Link de invitație copiat!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">Planifică o aventură</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-md text-center font-medium">Creează o nouă călătorie și invită-ți prietenii!</p>
        
        <form onSubmit={handleCreate} className="flex flex-col gap-6 w-full">
          {/* Nume */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Numele Călătoriei
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Vacanță în Grecia..." 
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          {/* Destinație */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Destinația Principală
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={destination}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Caută un oraș..." 
                className={`w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${isSearching ? 'pr-12' : ''}`}
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {isSearching ? <Loader2 className="w-4 h-4 text-blue-600 animate-spin" /> : <Search className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.geonameId}
                    type="button"
                    onClick={() => {
                      setDestination(`${result.name}, ${result.countryName}`);
                      setShowDropdown(false);
                      setSearchResults([]);
                    }}
                    className="w-full text-left p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-b border-gray-100 dark:border-gray-800 last:border-none flex items-center gap-3 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{result.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{result.countryName}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Perioada */}
          <div className="flex gap-2 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Plecare</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-4 pr-4 py-4 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all [&::-webkit-calendar-picker-indicator]:ml-0 [&::-webkit-calendar-picker-indicator]:p-0" 
                required 
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Întoarcere</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                min={startDate} 
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-4 pr-4 py-4 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all [&::-webkit-calendar-picker-indicator]:ml-0 [&::-webkit-calendar-picker-indicator]:p-0" 
                required 
              />
            </div>
          </div>

          {/* Invitații */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Invită Prieteni
            </label>
            <div className="flex gap-3 w-full">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmail())}
                  placeholder="Email prieten..."
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                />
                {emailInput && (
                   <button type="button" onClick={handleAddEmail} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 p-1">
                     <Plus className="w-5 h-5" />
                   </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyInviteLink}
                className="bg-blue-600 text-white px-5 rounded-xl active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/20"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>

            {invitedEmails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {invitedEmails.map(email => (
                  <div key={email} className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-blue-200/50 dark:border-blue-700/50">
                    {email}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeEmail(email)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-black py-5 mt-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all uppercase text-xs tracking-[0.2em] ${
              isFormValid 
                ? "bg-blue-600 text-white active:scale-95 shadow-blue-600/30" 
                : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Creează aventura"}
            {!isCreating && <ChevronRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}