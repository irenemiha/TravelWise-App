import { useParams, Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useNavigate } from "react-router";
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
  Loader2,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";

// IMPORTURI FIREBASE
import { db, auth } from "../../firebase";
import { 
  doc, 
  onSnapshot, 
  collection, 
  query, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  getDocs, 
  where 
} from "firebase/firestore";

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
}

export function TripPlanning() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State-uri pentru date reale
  const [trip, setTrip] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isPendingInvite, setIsPendingInvite] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("member");
  const [votedMembersCount, setVotedMembersCount] = useState(0);

  // 1. ASCULTĂM DATELE CĂLĂTORIEI
  useEffect(() => {
    if (!id) return;

    const tripRef = doc(db, "trips", id);

    // 1. LISTENER DATE CĂLĂTORIE ȘI MEMBRI
    const unsubTrip = onSnapshot(tripRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const tripId = docSnap.id;
        const cityName = (data.destination || 'travel').split(',')[0].trim();
        
        const seed = tripId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const finalImage = `https://loremflickr.com/1200/800/${encodeURIComponent(cityName)},landscape/all?lock=${seed}`;
        
        setTrip({ id: docSnap.id, ...data, image: finalImage });

        if (auth.currentUser?.uid === data.ownerId) {
          setCurrentUserRole("admin");
        } else {
          setCurrentUserRole("member");
        }

        if (data.participants && data.participants.length > 0) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "in", data.participants));
          const usersSnap = await getDocs(q);
          const membersList = usersSnap.docs.map(uDoc => ({
            id: uDoc.id,
            name: uDoc.data().name || "Utilizator",
            avatar: uDoc.data().photoURL || "",
            role: uDoc.id === data.ownerId ? "admin" : "member" as "admin" | "member"
          }));
          setMembers(membersList);
        }
      } else {
        toast.error("Călătoria nu a fost găsită.");
        navigate("/");
      }
    });

    // 2. LISTENER ITINERARIU
    const itineraryRef = collection(db, "trips", id, "itinerary");
    const unsubItinerary = onSnapshot(itineraryRef, (snapshot) => {
      const items = snapshot.docs.map(d => d.data());
      setItineraryItems(items);
      setLoading(false);
    });

    // 3. NOU: LISTENER VOTURI (PENTRU METRICA DE MEMBRI)
    const votesRef = collection(db, "trips", id, "attractionVotes");
    const unsubVotes = onSnapshot(votesRef, (snapshot) => {
      const uniqueVoters = new Set<string>();
      
      snapshot.docs.forEach(vDoc => {
        const vData = vDoc.data();
        if (vData.voters) {
          // Adăugăm toți utilizatorii care au dat up/down la această atracție
          Object.keys(vData.voters).forEach(uid => uniqueVoters.add(uid));
        }
      });

      setVotedMembersCount(uniqueVoters.size);
    });

    return () => {
      unsubTrip();
      unsubItinerary();
      unsubVotes(); // Curățăm și noul listener
    };
  }, [id, navigate]);

  // LOGICĂ PROGRES REALĂ
  const totalActivities = itineraryItems.length;
  const attractionTarget = 20;
  const attractionProgress = Math.min(Math.round((totalActivities / attractionTarget) * 100), 100);
  
  // Calcul zile (bazat pe datele trip-ului)
  const getProgressValues = () => {
    if (!trip) return { itineraryProgress: 0, votingProgress: 40 };
    // Calcul simplificat: dacă avem peste 5 activități, considerăm itinerariul 50% gata
    const itineraryProgress = Math.min(Math.round((totalActivities / 10) * 100), 100);
    const votingProgress = 60; // Hardcoded pentru demo sau calculat din voturi real
    return { itineraryProgress, votingProgress };
  };

  const { itineraryProgress, votingProgress } = getProgressValues();

  useEffect(() => {
    if (searchParams.get("invite") === "true") {
      setIsPendingInvite(true);
    }
  }, [searchParams]);

  const handleAcceptInvite = async () => {
    if (!id || !auth.currentUser) return;
    try {
      const tripRef = doc(db, "trips", id);
      await updateDoc(tripRef, {
        participants: arrayUnion(auth.currentUser.uid)
      });
      setIsPendingInvite(false);
      toast.success("Ai intrat în grup!");
    } catch (e) {
      toast.error("Eroare la acceptare.");
    }
  };

  const handleRejectInvite = () => {
    setIsPendingInvite(false);
    navigate("/");
    toast.error("Ai respins invitația.");
  };

  const handleShare = () => {
    const inviteLink = `${window.location.origin}/trip/${id}?invite=true`;
    navigator.clipboard.writeText(inviteLink);
    toast.success("Linkul de invitație a fost copiat!");
    setShowInviteModal(false);
  };

  const handleSettings = () => {
    navigate(`/trip/${id}/trip-settings`);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];
    return colors[index % colors.length];
  };

  if (loading || !trip) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      {/* Invitation Banner */}
      {isPendingInvite && (
        <div className="bg-white dark:bg-gray-900 px-4 py-4 w-full shadow-sm z-10 relative flex flex-col items-center gap-3 border-b border-gray-100 dark:border-gray-800">
          <p className="text-gray-900 dark:text-gray-100 font-bold text-center text-[15px]">
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
              className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
              Respinge
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-64 bg-gray-900">
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
              <div className="flex flex-col gap-2 text-blue-100 dark:text-blue-200 text-sm items-center">
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4" />
                  {trip.destination}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" />
                  {trip.startDate} - {trip.endDate}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Users className="w-4 h-4" />
                  {members.length} membri
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
          </div>
        </div>
      </div>

      <div className="w-full p-6 flex flex-col items-center">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm mb-6 w-full max-w-md p-1.5 flex flex-row gap-1 border dark:border-gray-800 transition-colors">
          <button className="flex-1 px-2 py-2.5 font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate">
            Prezentare
          </button>
          <Link
            to={`/explore/${trip.id}`}
            className="flex-1 px-2 py-2.5 font-bold text-gray-600 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate"
          >
            Explorează
          </Link>
          <Link
            to={`/itinerary/${trip.id}`}
            className="flex-1 px-2 py-2.5 font-bold text-gray-600 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 rounded-lg text-center text-[13px] active:scale-95 transition-transform truncate"
          >
            Itinerariu
          </Link>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md items-center">
          <div className="space-y-6 w-full">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 flex flex-col items-center text-center border dark:border-gray-800 transition-colors">
              <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white text-center">Acțiuni rapide</h2>
              <div className="flex flex-col gap-4 w-full">
                <Link
                  to={`/explore/${trip.id}`}
                  className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg active:scale-95 active:border-blue-600 dark:active:border-blue-500 active:bg-blue-50 dark:active:bg-blue-900/20 transition-all group flex flex-col items-center text-center w-full"
                >
                  <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <h3 className="mb-1 text-gray-900 dark:text-gray-100 font-bold text-center">Explorează atracții</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Descoperă obiective turistice</p>
                </Link>
                <Link
                  to={`/explore/${trip.id}`}
                  className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg active:scale-95 active:border-purple-600 dark:active:border-purple-500 active:bg-purple-50 dark:active:bg-purple-900/20 transition-all group flex flex-col items-center text-center w-full"
                >
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <h3 className="mb-1 text-gray-900 dark:text-gray-100 font-bold text-center">Votează atracții</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Alege preferatele tale</p>
                </Link>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex flex-col items-center w-full border dark:border-gray-800 transition-colors">
              <h2 className="text-xl mb-4 text-gray-900 dark:text-white font-bold text-center">Progres planificare</h2>
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Atracții adăugate</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-bold">{totalActivities}/{attractionTarget}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${attractionProgress}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Membrii care au votat</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-bold">
                      {votedMembersCount}/{trip?.participants?.length || 0}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full">
                    <div 
                      className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(Math.round((votedMembersCount / (trip?.participants?.length || 1)) * 100), 100)}%` }} 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Itinerariu complet</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 font-bold">{itineraryProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500" style={{ width: `${itineraryProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Members Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 w-full flex flex-col items-center border dark:border-gray-800 transition-colors">
              <div className="flex flex-col items-center justify-center mb-4 gap-2 w-full relative">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">Membri</h2>
                {currentUserRole === "admin" && (
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold absolute right-0 top-0 p-1"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="space-y-6 w-full flex flex-col items-center">
                {members.map((member, index) => (
                  <div key={member.id} className="flex flex-col items-center gap-3 group">
                    <div className="relative">
                      {member.role === "admin" && (
                        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-orange-500 to-yellow-600 rounded-full blur-[2px] opacity-70 animate-pulse" />
                      )}
                      <div className={`w-12 h-12 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-bold relative z-10 border-2 border-white dark:border-gray-950 transition-transform group-hover:scale-105`}>
                        {getInitials(member.name)}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-gray-900 dark:text-gray-100 font-bold">{member.name}</p>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                        {member.role === "admin" ? "Administrator" : "Membru Grup"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 border dark:border-gray-800 animate-in zoom-in duration-200">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white font-bold">Invită membri</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Distribuie acest link cu prietenii tăi:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4 break-all text-sm text-gray-700 dark:text-gray-300 font-mono border dark:border-gray-700">
              {`${window.location.origin}/trip/${id}?invite=true`}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border font-bold border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
              >
                Închide
              </button>
              <button
                onClick={handleShare}
                className="flex-1 px-4 py-2 font-bold bg-blue-600 text-white rounded-lg active:scale-95 transition-all shadow-md"
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