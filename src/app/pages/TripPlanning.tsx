import { useParams, Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  Users,
  UserPlus,
  MapPin,
  Calendar,
  Share2,
  Settings,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { mockTrips } from "../store";

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
}

const mockMembers: Member[] = [
  { id: "1", name: "Ana Almajanu", avatar: "", role: "admin" },
  { id: "2", name: "Alexandra Burnichi", avatar: "", role: "member" },
  { id: "3", name: "Luciana Mosila", avatar: "", role: "member" },
  { id: "4", name: "Irene Musat", avatar: "", role: "member" },
  { id: "5", name: "Anna-Mariia Peduraru", avatar: "", role: "member" },
  { id: "6", name: "Ilinca-Ioana Strutu", avatar: "", role: "member" },
];

export function TripPlanning() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isPendingInvite, setIsPendingInvite] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("admin");

  const trip = mockTrips.find(t => t.id === id) || mockTrips[0];

  useEffect(() => {
    // Show invite banner only if coming from an invite link
    if (searchParams.get("invite") === "true") {
      setIsPendingInvite(true);
    }
  }, [searchParams]);

  const handleAcceptInvite = () => {
    setIsPendingInvite(false);
    toast.success("Ai acceptat invitația cu succes!");
  };

  const handleRejectInvite = () => {
    setIsPendingInvite(false);
    toast.error("Ai respins invitația.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://travelwise.app/join/${trip.name.toLowerCase().replace(/\s+/g, '-')}-xyz123`);
    toast.success("Linkul a fost copiat în clipboard!");
    setShowInviteModal(false);
  };

  const handleSettings = () => {
    toast.info("Deschidere panou de setări...");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Invitation Banner */}
      {isPendingInvite && (
        <div className="bg-white px-4 py-4 w-full shadow-sm z-10 relative flex flex-col items-center gap-3 border-b border-gray-100">
          <p className="text-gray-900 font-bold text-center text-[15px]">
            Ai fost invitat în această călătorie!
          </p>
          <div className="flex gap-3 w-full max-w-md">
            <button 
              onClick={handleAcceptInvite}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
            >
              <Check className="w-5 h-5" />
              Acceptă
            </button>
            <button 
              onClick={handleRejectInvite}
              className="flex-1 bg-red-50 text-red-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
              Respinge
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 opacity-40">
          <ImageWithFallback
            src={trip.image}
            alt={trip.destination}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full px-4 h-full flex flex-col justify-end pb-6 pt-4 items-center text-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="text-white flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2 text-center">{trip.name}</h1>
              <div className="flex flex-col gap-2 text-blue-100 text-sm items-center">
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4" />
                  {trip.destination}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" />
                  {trip.dates}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Users className="w-4 h-4" />
                  {trip.members} membri
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center w-full max-w-xs mx-auto">
              <button 
                onClick={() => setShowInviteModal(true)}
                className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Distribuie</span>
              </button>
              {currentUserRole === "admin" && (
                <button 
                  onClick={handleSettings}
                  className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1 shadow-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span>Setări</span>
                </button>
              )}
            </div>
            <button 
              onClick={() => setCurrentUserRole(prev => prev === "admin" ? "member" : "admin")}
              className="mt-2 text-xs text-blue-200 underline font-medium opacity-80"
            >
              Simulează ca: {currentUserRole === "admin" ? "Membru Grup" : "Product Champion"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-6 flex flex-col items-center">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 w-full max-w-md p-1.5 flex flex-row gap-1">
          <button className="flex-1 px-2 py-2.5 font-bold bg-blue-100 text-blue-700 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate">
            Prezentare
          </button>
          <Link
            to={`/explore/${trip.id}`}
            className="flex-1 px-2 py-2.5 font-bold text-gray-600 active:bg-gray-100 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate"
          >
            Explorează
          </Link>
          <Link
            to={`/itinerary/${trip.id}`}
            className="flex-1 px-2 py-2.5 font-bold text-gray-600 active:bg-gray-100 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate"
          >
            Itinerariu
          </Link>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md items-center">
          {/* Main Content */}
          <div className="space-y-6 w-full">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
              <h2 className="text-lg font-bold mb-4 text-gray-900 text-center">Acțiuni rapide</h2>
              <div className="flex flex-col gap-4 w-full">
                <Link
                  to={`/explore/${trip.id}`}
                  className="p-4 border-2 border-gray-200 rounded-lg active:scale-95 active:border-blue-600 active:bg-blue-50 transition-all group flex flex-col items-center text-center w-full"
                >
                  <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="mb-1 text-gray-900 font-bold text-center">Explorează atracții</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Descoperă obiective turistice
                  </p>
                </Link>
                <Link
                  to={`/explore/${trip.id}`}
                  className="p-4 border-2 border-gray-200 rounded-lg active:scale-95 active:border-purple-600 active:bg-purple-50 transition-all group flex flex-col items-center text-center w-full"
                >
                  <Users className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="mb-1 text-gray-900 font-bold text-center">Votează atracții</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Alege preferatele tale
                  </p>
                </Link>
                <Link
                  to={`/itinerary/${trip.id}`}
                  className="p-4 border-2 border-gray-200 rounded-lg active:scale-95 active:border-green-600 active:bg-green-50 transition-all group flex flex-col items-center text-center w-full"
                >
                  <Calendar className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="mb-1 text-gray-900 font-bold text-center">Vezi itinerarul</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Planul generat automat
                  </p>
                </Link>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="p-4 border-2 border-gray-200 rounded-lg active:scale-95 active:border-orange-600 active:bg-orange-50 transition-all group flex flex-col items-center text-center w-full"
                >
                  <Share2 className="w-8 h-8 text-orange-600 mb-2" />
                  <h3 className="mb-1 text-gray-900 font-bold text-center">Distribuie</h3>
                  <p className="text-sm text-gray-600 text-center">
                    Invită mai mulți prieteni
                  </p>
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center w-full">
              <h2 className="text-xl mb-4 text-gray-900 font-bold text-center">Progres planificare</h2>
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 font-bold">Atracții adăugate</span>
                    <span className="text-sm text-gray-900 font-bold">15/20</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 font-bold">Membri au votat</span>
                    <span className="text-sm text-gray-900 font-bold">4/6</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "66%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 font-bold">Itinerariu complet</span>
                    <span className="text-sm text-gray-900 font-bold">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center w-full">
              <h2 className="text-xl mb-4 text-gray-900 font-bold text-center">Activitate recentă</h2>
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white flex-shrink-0 font-bold">
                    AB
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-900 text-center">
                      <span className="font-bold">Alexandra Burnichi</span> a votat pentru{" "}
                      <span className="text-blue-600 font-bold">Turnul Eiffel</span>
                    </p>
                    <p className="text-sm text-gray-500 text-center">Acum 2 ore</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 font-bold">
                    LM
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-900 text-center">
                      <span className="font-bold">Luciana Mosila</span> a adăugat{" "}
                      <span className="text-blue-600 font-bold">Muzeul Luvru</span>
                    </p>
                    <p className="text-sm text-gray-500 text-center">Acum 5 ore</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0 font-bold">
                    IM
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-900 text-center">
                      <span className="font-bold">Irene Musat</span> a votat pentru{" "}
                      <span className="text-blue-600 font-bold">Arc de Triomphe</span>
                    </p>
                    <p className="text-sm text-gray-500 text-center">Ieri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - converted to vertical flow for mobile */}
          <div className="flex flex-col gap-6 w-full items-center">
            {/* Members */}
            <div className="bg-white rounded-xl shadow-sm p-4 w-full flex flex-col items-center">
              <div className="flex flex-col items-center justify-center mb-4 gap-2 w-full relative">
                <h2 className="text-lg font-bold text-gray-900 text-center">Membri</h2>
                {currentUserRole === "admin" && (
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-bold absolute right-0 top-0 p-1"
                    title="Invită membri"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="space-y-4 w-full flex flex-col items-center">
                {mockMembers.map((member, index) => (
                  <div key={member.id} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full ${getAvatarColor(
                        index
                      )} flex items-center justify-center text-white flex-shrink-0 font-bold relative`}
                    >
                      {getInitials(member.name)}
                      {member.role === "admin" && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 border-2 border-white rounded-full p-0.5">
                          <span className="text-[8px]">👑</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-gray-900 text-center font-bold">{member.name}</p>
                      {member.role === "admin" ? (
                        <p className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold text-center mt-1">Product Champion</p>
                      ) : (
                        <p className="text-xs text-gray-500 font-bold text-center">Membru Grup</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br w-full from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white flex flex-col items-center text-center">
              <h2 className="text-xl mb-4 font-bold">Următorii pași</h2>
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <p className="text-blue-50 text-center font-bold">
                    Explorează și adaugă mai multe atracții
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <p className="text-blue-50 text-center font-bold">
                    Așteaptă ca toți membrii să voteze
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <p className="text-blue-50 text-center font-bold">
                    Generează itinerarul final
                  </p>
                </div>
              </div>
              <Link
                to={`/explore/${trip.id}`}
                className="mt-6 block w-full font-bold bg-white text-blue-600 px-4 py-3 rounded-xl active:bg-blue-50 transition-colors text-center flex items-center justify-center gap-2 shadow-lg"
              >
                Continuă planificarea
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl mb-4 text-gray-900">Invită membri</h2>
            <p className="text-gray-600 mb-4">
              Distribuie acest link cu prietenii tăi:
            </p>
            <div className="bg-gray-100 p-3 rounded-lg mb-4 break-all text-sm text-gray-700">
              https://travelwise.app/join/{trip.name.toLowerCase().replace(/\s+/g, '-')}-xyz123
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border font-bold border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                Închide
              </button>
              <button
                onClick={handleShare}
                className="flex-1 px-4 py-2 font-bold bg-blue-600 text-white rounded-lg active:bg-blue-700 active:scale-95 transition-all"
              >
                Copiază link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
