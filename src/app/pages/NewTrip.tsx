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
  const [showShareModal, setShowShareModal] = useState(false); // Stare pentru modala nouă

  // --- LOGICA TEXT INVITATIE ---
  const getInviteData = () => {
    const baseUrl = window.location.origin;
    const text = `Bună! Te invit să planificăm împreună călătoria "${name || 'nouă'}" pe TravelWise! Alătură-te aici: ${baseUrl}/join/pending`;
    return {
      text,
      encodedText: encodeURIComponent(text)
    };
  };

  const handleCopyInviteLink = () => {
    const { text } = getInviteData();
    navigator.clipboard.writeText(text).then(() => {
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
            className="fixed bottom-24 inset-x-6 z-[200] max-w-md mx-auto bg-gray-900/90 dark:bg-blue-600/90 backdrop-blur-md text-white py-4 rounded-2xl shadow-2xl flex justify-center items-center gap-3 border border-white/20"
          >
            <Check className="w-5 h-5 text-white" />
            <span className="font-bold text-sm">Link de invitație copiat!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FERESTRA MODALĂ DE SHARE CU ICONIȚE REALE */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-[110]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] max-w-md w-full p-8 border border-gray-100 dark:border-gray-800 shadow-2xl relative flex flex-col"
            >
              <button 
                type="button"
                onClick={() => setShowShareModal(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Trimite Invitația</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">Alege platforma prin care dorești să îți inviți prietenii în grup:</p>

              {/* Opțiuni Social Media reordonate cu logo-uri native */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* WhatsApp */}
                <a 
                  href={`https://api.whatsapp.com/send?text=${getInviteData().encodedText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 transition-all font-bold text-xs tracking-wider"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.851-4.38 9.854-9.765.001-2.606-1.013-5.059-2.86-6.909-1.848-1.85-4.305-2.87-6.917-2.871-5.442 0-9.856 4.382-9.859 9.766-.001 1.75.474 3.456 1.378 4.983L1.725 22.29l4.922-1.288zm12.414-7.228c-.24-.12-1.415-.697-1.635-.778-.22-.081-.381-.12-.54.12-.16.24-.613.778-.753.939-.14.162-.28.182-.52.062-.24-.12-.102-.37-.73-.929-.488-.436-.817-.973-.913-1.134-.096-.162-.01-.25.07-.33.072-.073.16-.182.24-.272.08-.09.107-.152.16-.302.054-.152.027-.284-.014-.365-.04-.082-.38-1.16-.52-1.5-.137-.333-.277-.288-.381-.293l-.324-.005c-.112 0-.294.041-.448.209-.154.168-.587.573-.587 1.399 0 .826.6 1.621.684 1.732.083.112 1.181 1.803 2.862 2.528.4.172.712.275.956.353.402.128.769.11 1.057.067.322-.048 1.415-.578 1.616-1.138.2-.56.2-1.04.14-1.139-.06-.1-.22-.16-.46-.28z"/>
                  </svg>
                  WhatsApp
                </a >

                {/* Instagram */}
                <button 
                  type="button"
                  onClick={() => {
                    handleCopyInviteLink();
                    toast.info("Deschide Insta și inserează textul!");
                  }}
                  className="p-4 bg-gradient-to-tr from-amber-500/10 via-red-500/10 to-purple-500/10 hover:from-amber-500/20 hover:via-red-500/20 hover:to-purple-500/20 border border-red-100/40 dark:border-purple-900/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-rose-600 dark:text-rose-400 transition-all font-bold text-xs tracking-wider"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </button>

                {/* Telegram */}
                <a 
                  href={`https://t.me/share/url?url=${window.location.origin}/join/pending&text=${encodeURIComponent(`Bună! Te invit în călătoria "${name || 'nouă'}"!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 dark:hover:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-sky-500 dark:text-sky-400 transition-all font-bold text-xs tracking-wider"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0011.944 0zm5.556 8.133l-1.897 8.941c-.143.64-.52.795-1.05.498l-2.89-2.13-1.394 1.34c-.154.155-.284.285-.584.285l.207-2.93 5.333-4.816c.232-.206-.05-.32-.36-.114l-6.59 4.148-2.837-.887c-.617-.193-.63-.617.13-.915l11.074-4.268c.513-.186.962.12.76.993z"/>
                  </svg>
                  Telegram
                </a>

                {/* Email */}
                <a 
                  href={`mailto:?subject=${encodeURIComponent(`Invitație călătorie ${name}`)}&body=${getInviteData().encodedText}`}
                  className="p-4 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-purple-600 dark:text-purple-400 transition-all font-bold text-xs tracking-wider"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </div>

              {/* Zona de copiere rapidă în interiorul modalei */}
              <button 
                type="button"
                onClick={handleCopyInviteLink}
                className="w-full bg-blue-600 text-white p-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 shrink-0 shadow-md flex items-center justify-center gap-3"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="text-md font-bold text-white truncate max-w-[240px]">Copiază link-ul de invitație</span>
              </button>
            </motion.div>
          </div>
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

              {/* ACUM DESCHIDE MODALA DE SOCIAL SHARE */}
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
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