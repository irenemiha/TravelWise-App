import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Send, Image as ImageIcon, Star, Loader2 } from "lucide-react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc 
} from "firebase/firestore";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Definim interfața pentru mesajele din Firestore
interface FirestoreMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  sharedAttractionId?: string;
}

export function TripChat() {
  const { id } = useParams();
  const tripId = id || "";
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState<any>(null);
  const [messages, setMessages] = useState<FirestoreMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. ASCULTĂM DATELE TRIP-ULUI ȘI MESAJELE
  useEffect(() => {
    if (!tripId) return;

    // Referință către Trip-ul curent
    const tripRef = doc(db, "trips", tripId);
    const unsubTrip = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) {
        setTrip({ id: snap.id, ...snap.data() });
      }
    });

    // Referință către sub-colecția de mesaje
    const messagesRef = collection(db, "trips", tripId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreMessage[];
      
      setMessages(msgs);
      setLoading(false);
    });

    return () => {
      unsubTrip();
      unsubMessages();
    };
  }, [tripId]);

  // Scroll automat la ultimul mesaj
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. LOGICA DE TRIMITERE MESAJ
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    const textToSend = newMessage.trim();
    setNewMessage(""); // Resetăm input-ul imediat pentru UX rapid

    try {
      await addDoc(collection(db, "trips", tripId, "messages"), {
        text: textToSend,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "Călător",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Mesajul nu a putut fi trimis.");
    }
  };

  // Helper pentru formatarea orei din Timestamp-ul Firestore
  const formatFirestoreTime = (timestamp: any) => {
    if (!timestamp) return "...";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-950 transition-colors h-screen">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Călătoria nu a fost găsită</h2>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          Înapoi acasă
        </button>
      </div>
    );
  }

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
          <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">{trip.participants?.length || 0} membri</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === auth.currentUser?.uid;
          return (
            <div key={msg.id} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && (
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-wider ml-1 mb-1">
                  {msg.senderName}
                </span>
              )}
              <div 
                className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                  isMe 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm'
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold mt-1 px-1">
                {formatFirestoreTime(msg.timestamp)}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 flex items-center gap-3 w-full shadow-[0_-4px_10px_rgba(0,0,0,0.02)] dark:shadow-none mt-auto transition-colors">
        <button 
          type="button"
          onClick={() => toast.info("Funcția de trimitere poze vine în curând!")}
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
            className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white border-none rounded-full px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors shadow-inner"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim() 
                ? 'bg-blue-600 dark:bg-blue-600 text-white active:scale-90 shadow-lg shadow-blue-600/20' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}