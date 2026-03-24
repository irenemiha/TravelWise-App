import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { X, MapPin, Calendar, Compass, ChevronRight, Users, Check, Mail, Plus } from "lucide-react";
import { addTrip } from "../store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_FRIENDS = [
  { id: "f1", name: "Ana", avatar: "https://images.unsplash.com/photo-1651534400411-eaf227f82ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHdvbWFufGVufDF8fHx8MTc3NDMwMzU4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "f2", name: "Alex", avatar: "https://images.unsplash.com/photo-1635046778483-c190a4bb49c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMG1hbnxlbnwxfHx8fDE3NzQzMDM1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "f3", name: "Maria", avatar: "https://images.unsplash.com/photo-1754844362137-88441eb7cc6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHNtaWxpbmclMjBnaXJsfGVufDF8fHx8MTc3NDMwMzU5NHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "f4", name: "Andrei", avatar: "https://images.unsplash.com/photo-1712599982295-1ecff6059a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHNtaWxpbmclMjBndXl8ZW58MXx8fHwxNzc0MzAzNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080" }
];

export function NewTrip() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  
  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

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
      image: "https://images.unsplash.com/photo-1739315014260-b581f8fdfa7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB2YWNhdGlvbiUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3NDI3MzIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: "planning",
      votes: 0,
      attractions: 0,
    });

    navigate("/");
  };

  const isFormValid = name && destination && startDate && endDate;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      <div className="w-full max-w-md bg-white border-b sticky top-0 z-10 flex flex-col items-center shadow-sm">
        <div className="flex items-center justify-between p-4 w-full">
          <Link to="/" className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 text-center flex-1">Călătorie Nouă</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="w-full max-w-md p-6 flex flex-col flex-1">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
          <Compass className="w-8 h-8 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Planifică o aventură</h2>
        <p className="text-gray-500 mb-8 text-sm text-center">Completează detaliile de mai jos pentru a începe planificarea.</p>
        
        <form onSubmit={handleCreate} className="flex flex-col gap-6 w-full flex-1">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" /> Numele Călătoriei
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Eurotrip 2026, Evadare la munte..." 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" /> Destinația Principală
            </label>
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Ex: Paris, Tokyo, Bali..." 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" /> Perioada
            </label>
            <div className="flex gap-4 w-full">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all relative">
                <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wide pointer-events-none">Plecare</span>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-gray-900 focus:outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                  required
                />
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all relative">
                <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wide pointer-events-none">Întoarcere</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full bg-transparent font-bold text-gray-900 focus:outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" /> Invită prieteni
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
                    <div className={`relative w-14 h-14 rounded-full p-1 transition-colors ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`}>
                      <ImageWithFallback 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-full h-full rounded-full object-cover bg-gray-200"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 border-2 border-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                      {friend.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" /> Invită prin email
              </label>
              <div className="flex gap-2 w-full">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEmail(e);
                    }
                  }}
                  placeholder="Adresă de email..."
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  disabled={!emailInput || !emailInput.includes("@")}
                  className="bg-blue-600 text-white p-3 rounded-xl shadow-sm active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:active:scale-100 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {invitedEmails.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {invitedEmails.map((email) => (
                    <div key={email} className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 animate-in fade-in">
                      <span>{email}</span>
                      <button 
                        type="button" 
                        onClick={() => removeEmail(email)}
                        className="text-blue-400 hover:text-blue-600 active:scale-90 transition-transform"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-8 pb-4">
            <button 
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold p-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all ${
                isFormValid 
                  ? "bg-blue-600 text-white shadow-blue-600/30 active:scale-95 active:bg-blue-700" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              Creează călătoria
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}