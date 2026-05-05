import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Send, Image as ImageIcon, Star, Loader2, X } from "lucide-react";

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
  text?: string;
  imageUrl?: string; // Câmp nou pentru poze
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
  const [isUploading, setIsUploading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isChatOpenRef = useRef<boolean>(true);

  // Solicită permisiunea de notificare la deschiderea chatului
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    isChatOpenRef.current = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isChatOpenRef.current = false;
      } else {
        isChatOpenRef.current = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isChatOpenRef.current = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 1. ASCULTĂM DATELE TRIP-ULUI ȘI MESAJELE
  useEffect(() => {
    if (!tripId) return;

    const tripRef = doc(db, "trips", tripId);
    const unsubTrip = onSnapshot(tripRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const cityName = (data.destination || 'travel').split(',')[0].trim();
        
        // --- LOGICĂ IMAGINE BING ---
        const isBroken = !data.image || 
                         data.image === "" || 
                         data.image.includes("loremflickr") || 
                         data.image.includes("picsum.photos") || 
                         data.image.includes("teleport");

        let finalTripImage = data.image;

        if (isBroken) {
          finalTripImage = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cityName + " city travel landscape")}&w=400&h=400&c=1&p=0`;
        }
        
        setTrip({ id: snap.id, ...data, tripImage: finalTripImage });
      }
    });

    const messagesRef = collection(db, "trips", tripId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    let isFirstLoad = true;

    const unsubMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreMessage[];
      
      if (!isFirstLoad && msgs.length > 0 && !isChatOpenRef.current) {
        const lastMessage = msgs[msgs.length - 1];
        const currentUserId = auth.currentUser?.uid;

        if (lastMessage.senderId !== currentUserId && "Notification" in window && Notification.permission === "granted") {
          new Notification(lastMessage.senderName, {
            body: lastMessage.sharedAttractionId ? `📍 Atracție: ${lastMessage.text}` : lastMessage.text,
            icon: "/favicon.ico"
          });
        }
      }

      isFirstLoad = false;
      setMessages(msgs);
      setLoading(false);
    });

    return () => {
      unsubTrip();
      unsubMessages();
    };
  }, [tripId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. LOGICA DE TRIMITERE MESAJ (TEXT)
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    const textToSend = newMessage.trim();
    setNewMessage("");

    try {
      await addDoc(collection(db, "trips", tripId, "messages"), {
        text: textToSend,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "Călător",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      toast.error("Mesajul nu a putut fi trimis.");
    }
  };

  // 3. LOGICA TRIMITERE POZĂ (Base64)
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const user = auth.currentUser;

    if (!file || !user) return;

    if (file.size > 1048487) {
      toast.error("Poza este prea mare! Încearcă una sub 1MB.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      try {
        await addDoc(collection(db, "trips", tripId, "messages"), {
          imageUrl: base64Image,
          senderId: user.uid,
          senderName: user.displayName || "Călător",
          timestamp: serverTimestamp(),
        });
        toast.success("Poză trimisă!");
      } catch (error) {
        toast.error("Eroare la trimiterea pozei.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
  };

  const formatFirestoreTime = (timestamp: any) => {
    if (!timestamp) return "...";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 transition-colors overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 border-b dark:border-gray-800 sticky top-0 z-10 px-4 py-3 flex items-center gap-3 shadow-sm transition-colors">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/70 hover:text-white active:scale-90 transition-all">
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0 shadow-sm flex">
          <ImageWithFallback src={trip?.tripImage} alt={trip?.name} className="w-full h-full min-w-full min-h-full object-cover" />
        </div>

        <div className="flex justify-between w-full items-center min-w-0">
          <div className="flex flex-col min-w-0">
             <h1 className="text-md font-bold text-white truncate tracking-tight">{trip?.name}</h1>
             <span className="text-[10px] text-white/60 font-bold tracking-widest uppercase">{trip?.participants?.length || 0} Membri</span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => {
          const isMe = msg.senderId === auth.currentUser?.uid;
          const isSharedCard = !!msg.sharedAttractionId;

          return (
            <div key={msg.id} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
              {!isMe && <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest ml-2 mb-1">{msg.senderName}</span>}
              
              {/* MODIFICARE: Adăugat cursor-pointer, active status și redirecționare exactă pe ID-ul atracției distribuite */}
              <div 
                onClick={() => {
                  if (isSharedCard) {
                    navigate(`/explore/${tripId}#${msg.sharedAttractionId}`);
                  }
                }}
                className={`max-w-[75%] rounded-2xl shadow-sm overflow-hidden transition-all ${
                  isSharedCard ? 'cursor-pointer hover:opacity-90 active:scale-[0.99]' : ''
                } ${
                  isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700'
                }`}
              >
                {/* MODIFICARE CONȚINUT BULĂ: Randare combinată text + imagine pentru cărțile partajate */}
                {msg.text && (
                  <p className="p-3 text-sm font-medium leading-relaxed">{msg.text}</p>
                )}
                
                {msg.imageUrl && (
                  <div className={msg.text ? "px-1 pb-1" : "p-1"}>
                    <img src={msg.imageUrl} alt="Sent" className="w-full h-auto rounded-xl max-h-80 object-cover" />
                  </div>
                )}
              </div>
              <span className="text-[8px] text-gray-400 font-bold mt-1 px-2">{formatFirestoreTime(msg.timestamp)}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4 flex items-center gap-3 w-full transition-colors pb-safe">
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        
        <button 
          type="button"
          onClick={handleImageClick}
          disabled={isUploading}
          className={`p-2 rounded-full transition-all ${isUploading ? 'animate-pulse text-gray-400' : 'text-blue-600 dark:text-blue-400 active:bg-blue-50 dark:active:bg-blue-900/30'}`}
        >
          {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImageIcon className="w-6 h-6" />}
        </button>

        <form onSubmit={handleSend} className="flex-1 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isUploading ? "Se încarcă poza..." : "Scrie un mesaj..."}
            disabled={isUploading}
            className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-white border-none rounded-full px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim() || isUploading}
            className={`p-3 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim() && !isUploading
                ? 'bg-blue-600 text-white shadow-lg active:scale-90' 
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