import { Bell, Calendar, MapPin, Users, Heart } from "lucide-react";
import { Link } from "react-router";

interface Notification {
  id: string;
  type: "invite" | "update" | "vote" | "like";
  title: string;
  description: string;
  time: string;
  read: boolean;
  link: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "invite",
    title: "Invitație nouă!",
    description: "Andrei te-a invitat în călătoria 'Paris Adventure'.",
    time: "Acum 2 ore",
    read: false,
    link: "/trip/1?invite=true",
  },
  {
    id: "2",
    type: "vote",
    title: "Vot necesar",
    description: "Alegeți atracțiile preferate pentru excursia din Roma.",
    time: "Acum 5 ore",
    read: false,
    link: "/explore/3",
  },
  {
    id: "3",
    type: "update",
    title: "Traseu actualizat",
    description: "Maria a adăugat 2 atracții noi pentru Santorini.",
    time: "Ieri, 14:30",
    read: true,
    link: "/itinerary/2",
  },
  {
    id: "4",
    type: "like",
    title: "Apreciere nouă",
    description: "Anei i-a plăcut propunerea ta de restaurant.",
    time: "Ieri, 09:15",
    read: true,
    link: "/explore/1",
  },
];

export function Notifications() {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "invite":
        return <Users className="w-6 h-6 text-white" />;
      case "update":
        return <MapPin className="w-6 h-6 text-white" />;
      case "vote":
        return <Calendar className="w-6 h-6 text-white" />;
      case "like":
        return <Heart className="w-6 h-6 text-white" />;
      default:
        return <Bell className="w-6 h-6 text-white" />;
    }
  };

  const getGradient = (type: Notification["type"]) => {
    switch (type) {
      case "invite":
        return "bg-gradient-to-br from-blue-500 to-purple-600";
      case "update":
        return "bg-gradient-to-br from-green-400 to-emerald-600";
      case "vote":
        return "bg-gradient-to-br from-orange-400 to-red-500";
      case "like":
        return "bg-gradient-to-br from-pink-400 to-rose-600";
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-500";
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center transition-colors duration-300">
      <div className="w-full flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Notificări</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center transition-colors">
          Fii la curent cu ultimele noutăți despre călătoriile tale
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {mockNotifications.map((notification) => (
          <Link
            key={notification.id}
            to={notification.link}
            className={`w-full bg-white dark:bg-gray-900 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm active:scale-[0.98] transition-all ${
              !notification.read 
                ? "border-2 border-blue-100 dark:border-blue-900/50" 
                : "border border-gray-100 dark:border-gray-800"
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
              {notification.time}
            </span>
          </Link>
        ))}

        {mockNotifications.length === 0 && (
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