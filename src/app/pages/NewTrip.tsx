import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, MapPin, Calendar, Compass, ChevronRight, Users, Check, Mail, Plus, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Importăm Firebase
import { db, auth } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function NewTrip() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // State pentru loading buton

  // LOGICA GEONAMES
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
          `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(destination)}&maxRows=10&username=${USERNAME}&lang=ro&style=full`
        );
        const data = await response.json();
        if (data.geonames) setSearchResults(data.geonames);
      } catch (error) {
        console.error("GeoNames error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [destination]);

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleAddEmail = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (emailInput && emailInput.includes("@") && !invitedEmails.includes(emailInput)) {
      setInvitedEmails([...invitedEmails, emailInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setInvitedEmails(prev => prev.filter(e => e !== email));
  };

  // LOGICA FIREBASE FIRESTORE
  // În NewTrip.tsx, în handleCreate, modifică obiectul tripData:
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      toast.error("Trebuie să fii logat!");
      return;
    }

    setIsCreating(true);

    try {
      const cityName = destination.split(',')[0].trim();

      const tripData = {
        name,
        destination,
        startDate,
        endDate,
        ownerId: auth.currentUser.uid,
        participants: [auth.currentUser.uid, ...selectedFriends],
        invitedEmails,
        // URL NOU ȘI FUNCȚIONAL: Căutăm orașul + cuvântul 'travel'
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
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">Planifică o aventură</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-md text-center">Creează o nouă călătorie și invita prietenii tăi!</p>
        
        <form onSubmit={handleCreate} className="flex flex-col gap-5 w-full">
          {/* Nume */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Numele Călătoriei
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Eurotrip 2026..." 
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all disabled:opacity-50"
              required
              disabled={isCreating}
            />
          </div>

          {/* Destinație */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" /> Destinația Principală
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                {isSearching ? <Loader2 className="w-4 h-4 text-blue-600 animate-spin" /> : null}
              </div>
              <input 
                type="text" 
                value={destination}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Orice oraș sau insulă din lume..." 
                className={`w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${isSearching ? 'pl-10' : ''} disabled:opacity-50`}
                required
                disabled={isCreating}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>

            {/* Dropdown Orașe GeoNames */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 max-h-64 overflow-y-auto">
                {searchResults.map((result) => {
                  const fullName = `${result.name}, ${result.countryName || result.adminName1}`;
                  return (
                    <button
                      key={result.geonameId}
                      type="button"
                      onClick={() => {
                        setDestination(fullName);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 font-bold transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-sm leading-tight">{result.name}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black mt-0.5">
                            {result.countryName || result.adminName1}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Perioada */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Perioada
            </label>
            <div className="flex gap-3 w-full">
              <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1 uppercase tracking-wide">Plecare</span>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-gray-400 dark:text-white focus:outline-none" 
                  required
                  disabled={isCreating}
                />
              </div>
              <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1 uppercase tracking-wide">Întoarcere</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full bg-transparent font-bold text-gray-400 dark:text-white focus:outline-none" 
                  required
                  disabled={isCreating}
                />
              </div>
            </div>
          </div>

          {/* Email Invitations */}
          <div className="mt-2 flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Invită prin email
            </label>
            <div className="flex gap-2 w-full">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Adresă de email..."
                className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm disabled:opacity-50"
                disabled={isCreating}
              />
              <button
                type="button"
                onClick={handleAddEmail}
                disabled={!emailInput || !emailInput.includes("@") || isCreating}
                className="bg-blue-600 text-white p-3 rounded-xl active:scale-95 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-bold p-4 mt-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
              isFormValid 
                ? "bg-blue-600 text-white active:scale-95 active:bg-blue-700" 
                : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none"
            }`}
          >
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Creează călătoria"}
            {!isCreating && <ChevronRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}