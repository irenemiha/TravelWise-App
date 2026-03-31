import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { X, MapPin, Calendar, Compass, ChevronRight, Users, Check, Mail, Plus, Search } from "lucide-react";
import { addTrip } from "../store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Listă de orașe (Exemplu extins - în producție poți folosi un JSON extern sau un API)
const WORLD_CITIES = [
  "Paris, Franța", "Tokyo, Japonia", "New York, SUA", "Londra, UK", "Roma, Italia", 
  "București, România", "Cluj-Napoca, România", "Barcelona, Spania", "Dubai, UAE", 
  "Singapore, Singapore", "Amsterdam, Olanda", "Praga, Cehia", "Viena, Austria", 
  "Berlin, Germania", "Lisabona, Portugalia", "Istanbul, Turcia", "Atena, Grecia"
].sort((a, b) => a.localeCompare(b));

const MOCK_FRIENDS = [
  { id: "f1", name: "Ana", avatar: "https://images.unsplash.com/photo-1651534400411-eaf227f82ee4?q=80&w=150" },
  { id: "f2", name: "Alex", avatar: "https://images.unsplash.com/photo-1635046778483-c190a4bb49c5?q=80&w=150" },
  { id: "f3", name: "Maria", avatar: "https://images.unsplash.com/photo-1754844362137-88441eb7cc6f?q=80&w=150" },
  { id: "f4", name: "Andrei", avatar: "https://images.unsplash.com/photo-1712599982295-1ecff6059a57?q=80&w=150" }
];

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

  // Filtrare orașe bazată pe input
  const filteredCities = useMemo(() => {
    if (!destination) return [];
    return WORLD_CITIES.filter(city => 
      city.toLowerCase().includes(destination.toLowerCase())
    ).slice(0, 8); // Limităm la primele 8 rezultate pentru UX curat
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || !startDate || !endDate) return;

    const formatDate = (dateString: string) => {
      const d = new Date(dateString);
      const months = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${d.getDate()} ${months[d.getMonth()]}`;
    };

    const year = new Date(startDate).getFullYear();
    const formattedDates = `${formatDate(startDate)} - ${formatDate(endDate)} ${year}`;

    addTrip({
      id: Math.random().toString(36).substring(7),
      name,
      destination,
      dates: formattedDates,
      members: 1 + selectedFriends.length + invitedEmails.length,
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1080",
      status: "planning",
      votes: 0,
      attractions: 0,
    });

    navigate("/");
  };

  const isFormValid = name && destination && startDate && endDate;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">Planifică o aventură</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm text-center">Completează detaliile de mai jos.</p>
        
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
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          {/* Destinație cu Dropdown de căutare */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" /> Destinația Principală
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={destination}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Caută un oraș (ex: Paris, Roma...)" 
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>

            {/* Dropdown Orașe */}
            {showDropdown && filteredCities.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setDestination(city);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 font-bold transition-colors flex items-center gap-3"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {city}
                  </button>
                ))}
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
                  className="w-full bg-transparent font-bold text-gray-900 dark:text-white focus:outline-none" 
                  required
                />
              </div>
              <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1 uppercase tracking-wide">Întoarcere</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full bg-transparent font-bold text-gray-900 dark:text-white focus:outline-none" 
                  required
                />
              </div>
            </div>
          </div>

          {/* Prieteni */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500 dark:text-orange-400" /> Invită prieteni
            </label>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 [&::-webkit-scrollbar]:hidden">
              {MOCK_FRIENDS.map(friend => {
                const isSelected = selectedFriends.includes(friend.id);
                return (
                  <button
                    key={friend.id}
                    type="button"
                    onClick={() => toggleFriend(friend.id)}
                    className="flex flex-col items-center gap-2 min-w-[70px] transition-transform active:scale-95"
                  >
                    <div className={`relative w-14 h-14 rounded-full p-1 transition-colors ${isSelected ? 'bg-blue-600 dark:bg-blue-500' : 'bg-transparent'}`}>
                      <ImageWithFallback 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-gray-800"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-1 border-2 border-white dark:border-gray-900">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {friend.name}
                    </span>
                  </button>
                );
              })}
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
                className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
              />
              <button
                type="button"
                onClick={handleAddEmail}
                disabled={!emailInput || !emailInput.includes("@")}
                className="bg-blue-600 text-white p-3 rounded-xl active:scale-95 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {invitedEmails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {invitedEmails.map((email) => (
                  <div key={email} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <span>{email}</span>
                    <button type="button" onClick={() => removeEmail(email)} className="text-blue-400 dark:text-blue-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            )}
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
            Creează călătoria
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}