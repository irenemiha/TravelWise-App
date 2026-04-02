import { useState, useEffect } from "react";
import { Bell, Calendar, MapPin, Users, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc 
} from "firebase/firestore";

interface Notification {
  id: string;
  type: "invite" | "update" | "vote" | "like";
  title: string;
  description: string;
  time: any; // Va fi un Timestamp de la Firebase
  read: boolean;
  link: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. ASCULTĂM NOTIFICĂRILE REALE DIN FIRESTORE
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Luăm doar notificările care aparțin userului logat, ordonate descrescător după timp
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as Notification[];
      
      setNotifications(notifs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. LOGICĂ MARCARE CA CITIT
  const markAsRead = async (notificationId: string) => {
    try {
      const notifRef = doc(db, "notifications", notificationId);
      await updateDoc(notifRef, { read: true });
    } catch (e) {
      console.error("Error updating notification:", e);
    }
  };

  // Helper pentru formatarea timpului din Firebase Timestamp
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "Acum";
    const date = timestamp.toDate();
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 1) return "Recent";
    if (diffInHours < 24) return `Acum ${Math.floor(diffInHours)} ore`;
    return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "invite": return <Users className="w-6 h-6 text-white" />;
      case "update": return <MapPin className="w-6 h-6 text-white" />;
      case "vote": return <Calendar className="w-6 h-6 text-white" />;
      case "like": return <Heart className="w-6 h-6 text-white" />;
      default: return <Bell className="w-6 h-6 text-white" />;
    }
  };

  const getGradient = (type: Notification["type"]) => {
    switch (type) {
      case "invite": return "bg-gradient-to-br from-blue-500 to-purple-600";
      case "update": return "bg-gradient-to-br from-green-400 to-emerald-600";
      case "vote": return "bg-gradient-to-br from-orange-400 to-red-500";
      case "like": return "bg-gradient-to-br from-pink-400 to-rose-600";
      default: return "bg-gradient-to-br from-blue-400 to-blue-500";
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center transition-colors duration-300 pb-20">
      <div className="w-full flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Notificări</h1>
        <p className="text-gray-600 dark:text-gray-400 text-md text-center transition-colors">
          Fii la curent cu ultimele noutăți despre călătoriile tale
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            to={notification.link}
            onClick={() => markAsRead(notification.id)}
            className={`w-full bg-white dark:bg-gray-900 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm active:scale-[0.98] transition-all border-2 ${
              !notification.read 
                ? "border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-500/10" 
                : "border-gray-100 dark:border-gray-800 opacity-80"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${getGradient(notification.type)} shadow-md`}>
              {getIcon(notification.type)}
            </div>
            
            <h3 className={`text-lg mb-1 font-bold ${!notification.read ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-200"}`}>
              {notification.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 font-bold transition-colors">
              {notification.description}
            </p>
            
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full transition-colors">
              {formatTime(notification.time)}
            </span>
          </Link>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm w-full border dark:border-gray-800 transition-colors">
            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Nicio notificare</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Când vei primi invitații sau actualizări, acestea vor apărea aici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}