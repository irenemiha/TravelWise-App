import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Send, Image as ImageIcon, Star } from "lucide-react";
import { mockTrips, mockMessagesData, mockAttractionsData, addChatMessage, Message } from "../store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function TripChat() {
  const { id } = useParams();
  const tripId = id || "1";
  const navigate = useNavigate();
  const trip = mockTrips.find((t) => t.id === tripId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(mockMessagesData[tripId] || []);
  }, [tripId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-950 transition-colors">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Călătoria nu a fost găsită</h2>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          Înapoi acasă
        </button>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addChatMessage(tripId, newMsg);
    setMessages([...(mockMessagesData[tripId] || [])]);
    setNewMessage("");
  };

  const renderSharedAttraction = (attractionId: string) => {
    const attraction = (mockAttractionsData[tripId] || []).find(a => a.id === attractionId);
    if (!attraction) return null;

    return (
      <Link to={`/explore/${tripId}`} className="mt-2 block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 active:scale-95 transition-transform text-left">
        <div className="h-32 w-full relative">
          <ImageWithFallback src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 dark:text-white">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {attraction.rating}
          </div>
        </div>
        <div className="p-3">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{attraction.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{attraction.description}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10 p-4 flex items-center justify-between shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{trip.name}</h1>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">{trip.members} membri</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div key={msg.id} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold ml-1 mb-1">{msg.senderName}</span>
              )}
              <div 
                className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                  isMe 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm'
                }`}
              >
                {msg.text && <p className="text-sm font-medium">{msg.text}</p>}
                {msg.sharedAttractionId && renderSharedAttraction(msg.sharedAttractionId)}
              </div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 flex items-center gap-3 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.02)] dark:shadow-none mt-auto transition-colors">
        <button 
          type="button"
          onClick={() => toast.info("Încărcarea imaginilor va fi disponibilă în curând!")}
          className="text-blue-600 dark:text-blue-400 p-2 active:bg-blue-50 dark:active:bg-blue-900/30 rounded-full transition-colors"
        >
          <ImageIcon className="w-6 h-6" />
        </button>
        <form onSubmit={handleSend} className="flex-1 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Scrie un mesaj..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white border-none rounded-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim() 
                ? 'bg-blue-600 dark:bg-blue-600 text-white active:scale-90 shadow-md shadow-blue-600/20' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}