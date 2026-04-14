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
  getDocs, 
  where,
  orderBy, // ADĂUGAT
  limit,   // ADĂUGAT
  documentId // ADĂUGAT PENTRU FIX NUME
} from "firebase/firestore";

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
}

const getCityPhotoUrl = (cityName: string) => {
  return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(cityName + " city travel landscape")}&w=1200&h=800&c=1&p=0`;
};

export function TripPlanning() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<any>(null);
  const [tripImage, setTripImage] = useState<string>(""); 
  const [members, setMembers] = useState<Member[]>([]);
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAvailableAttractions, setTotalAvailableAttractions] = useState(0); 
  const [activities, setActivities] = useState<any[]>([]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isPendingInvite, setIsPendingInvite] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<"admin" | "member">("member");
  const [votedMembersCount, setVotedMembersCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    const tripRef = doc(db, "trips", id);

    const unsubTrip = onSnapshot(tripRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const cityName = (data.destination || 'travel').split(',')[0].trim();
        
        if (data.image && !data.image.includes("loremflickr") && !data.image.includes("picsum.photos") && !data.image.includes("teleport")) {
          setTripImage(data.image);
        } else {
          setTripImage(getCityPhotoUrl(cityName));
        }

        const cacheKey = `explore_cache_${cityName}`;
        const savedCache = localStorage.getItem(cacheKey);
        if (savedCache) {
          try {
            const parsedData = JSON.parse(savedCache);
            setTotalAvailableAttractions(parsedData.length);
          } catch (e) { console.error("Cache error", e); }
        }

        setTrip({ id: docSnap.id, ...data });

        if (auth.currentUser?.uid === data.ownerId) {
          setCurrentUserRole("admin");
        } else {
          setCurrentUserRole("member");
        }

        const allParticipantUids = Array.from(new Set([data.ownerId, ...(data.participants || [])]));
        
        if (allParticipantUids.length > 0) {
          const usersRef = collection(db, "users");
          // FIX: Căutăm după documentId() pentru a găsi sigur profilul adminului
          const q = query(usersRef, where(documentId(), "in", allParticipantUids));
          const usersSnap = await getDocs(q);
          
          const membersList: Member[] = usersSnap.docs.map(uDoc => {
            const userData = uDoc.data();
            return {
              id: uDoc.id,
              name: userData.name || userData.displayName || "Utilizator",
              avatar: userData.photoURL || "",
              role: uDoc.id === data.ownerId ? "admin" : "member"
            };
          });

          allParticipantUids.forEach(uid => {
            if (!membersList.find(m => m.id === uid)) {
              const isOwner = uid === data.ownerId;
              membersList.push({
                id: uid,
                name: isOwner ? (data.ownerName || "Administrator") : "Membru în curs...",
                avatar: "",
                role: isOwner ? "admin" : "member"
              });
            }
          });

          membersList.sort((a, b) => (a.role === 'admin' ? -1 : 1));
          setMembers(membersList);
        }
      } else {
        toast.error("Călătoria nu a fost găsită.");
        navigate("/");
      }
    });

    const itineraryRef = collection(db, "trips", id, "itinerary");
    const unsubItinerary = onSnapshot(itineraryRef, (snapshot) => {
      const items = snapshot.docs.map(d => d.data());
      setItineraryItems(items);
      setLoading(false);
    });

    const votesRef = collection(db, "trips", id, "attractionVotes");
    const unsubVotes = onSnapshot(votesRef, (snapshot) => {
      const uniqueVoters = new Set<string>();
      snapshot.docs.forEach(vDoc => {
        const vData = vDoc.data();
        if (vData.voters) {
          Object.keys(vData.voters).forEach(uid => uniqueVoters.add(uid));
        }
      });
      setVotedMembersCount(uniqueVoters.size);
    });

    // --- LOGICĂ NOUĂ: FETCH ACTIVITATE RECENTĂ ---
    const activityRef = collection(db, "trips", id, "activity");
    const qActivity = query(activityRef, orderBy("timestamp", "desc"), limit(5));
    const unsubActivity = onSnapshot(qActivity, (snapshot) => {
      const logs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setActivities(logs);
    });

    return () => {
      unsubTrip();
      unsubItinerary();
      unsubVotes();
      unsubActivity(); // Cleanup
    };
  }, [id, navigate]);

  // Restul funcțiilor rămân identice...
  useEffect(() => {
    if (!trip?.destination || totalAvailableAttractions > 0) return;
    const fetchTotalAttractions = async () => {
      const cityName = trip.destination.split(",")[0].trim();
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) return;
        const { lat, lon } = geoData[0];
        const API_KEY = "6627c045fcd14d76b5b547c8f3c54d17";
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.attraction,catering.restaurant,entertainment.museum,heritage&filter=circle:${lon},${lat},15000&limit=50&lang=ro&apiKey=${API_KEY}`);
        const data = await response.json();
        if (data.features) setTotalAvailableAttractions(data.features.length);
      } catch (error) { console.error(error); }
    };
    fetchTotalAttractions();
  }, [trip?.destination, totalAvailableAttractions]);

  const totalActivities = itineraryItems.length;
  const attractionTarget = totalAvailableAttractions || 20; 
  const attractionProgress = Math.min(Math.round((totalActivities / attractionTarget) * 100), 100);
  const itineraryProgress = Math.min(Math.round((totalActivities / 10) * 100), 100);

  useEffect(() => {
    if (searchParams.get("invite") === "true") setIsPendingInvite(true);
  }, [searchParams]);

  const handleAcceptInvite = async () => {
    if (!id || !auth.currentUser) return;
    try {
      await updateDoc(doc(db, "trips", id), { participants: arrayUnion(auth.currentUser.uid) });
      setIsPendingInvite(false);
      toast.success("Ai intrat în grup!");
    } catch (e) { toast.error("Eroare."); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/trip/${id}?invite=true`);
    toast.success("Link copiat!");
    setShowInviteModal(false);
  };

  const getInitials = (name: string) => (name || "U").split(" ").map((n) => n[0]).join("").toUpperCase();
  const getAvatarColor = (index: number) => ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"][index % 5];

  if (loading || !trip) return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-20">
      {isPendingInvite && (
        <div className="bg-white dark:bg-gray-900 px-4 py-4 w-full shadow-sm z-10 relative flex flex-col items-center gap-3 border-b border-gray-100 dark:border-gray-800">
          <p className="text-gray-900 dark:text-gray-100 font-bold text-center text-[15px]">Ai fost invitat în această călătorie!</p>
          <div className="flex gap-3 w-full max-w-md">
            <button onClick={handleAcceptInvite} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md"><Check className="w-5 h-5" />Acceptă</button>
            <button onClick={() => { setIsPendingInvite(false); navigate("/"); }} className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"><X className="w-5 h-5" />Respinge</button>
          </div>
        </div>
      )}

      <div className="relative h-64 bg-gray-900">
        <div className="absolute inset-0 opacity-40 flex">
          <ImageWithFallback src={tripImage || trip.image} alt={trip.destination} className="w-full h-full min-w-full min-h-full object-cover" />
        </div>
        <div className="relative w-full px-4 h-full flex flex-col justify-end pb-6 pt-4 items-center text-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="text-white flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-2 text-center">{trip.name}</h1>
              <div className="flex flex-col gap-2 text-blue-100 dark:text-blue-200 text-sm items-center">
                <div className="flex items-center gap-2 justify-center"><MapPin className="w-4 h-4" />{trip.destination}</div>
                <div className="flex items-center gap-2 justify-center"><Calendar className="w-4 h-4" />{trip.startDate} - {trip.endDate}</div>
                <div className="flex items-center gap-2 justify-center"><Users className="w-4 h-4" />{members.length} Membri</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center w-full max-w-xs mx-auto">
              <button onClick={() => setShowInviteModal(true)} className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1 shadow-sm"><Share2 className="w-4 h-4" /><span>Distribuie</span></button>
              {currentUserRole === "admin" && <button onClick={() => navigate(`/trip/${id}/trip-settings`)} className="bg-white/20 text-white font-bold backdrop-blur-sm px-4 py-2 rounded-xl active:bg-white/30 transition-colors active:scale-95 flex items-center justify-center gap-2 flex-1 shadow-sm"><Settings className="w-4 h-4" /><span>Setări</span></button>}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-6 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm mb-6 w-full max-w-md p-1.5 flex flex-row gap-1 border dark:border-gray-800 transition-colors">
          <button className="flex-1 px-2 py-2.5 font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-center text-[13px]">Prezentare</button>
          <Link to={`/explore/${trip.id}`} className="flex-1 px-2 py-2.5 font-bold text-gray-600 dark:text-gray-400 rounded-lg text-center text-[13px]">Explorează</Link>
          <Link to={`/itinerary/${trip.id}`} className="flex-1 px-2 py-2.5 font-bold text-gray-600 dark:text-gray-400 rounded-lg text-center text-[13px]">Itinerariu</Link>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md items-center">
          <div className="space-y-6 w-full">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex flex-col items-center w-full border dark:border-gray-800 transition-colors">
              <h2 className="text-xl mb-4 text-gray-900 dark:text-white font-bold text-center">Progres planificare</h2>
              <div className="space-y-4 w-full">
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Atracții adăugate</span><span className="text-sm text-gray-900 dark:text-gray-100 font-bold">{totalActivities}/{attractionTarget}</span></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full"><div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${attractionProgress}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Membrii care au votat</span><span className="text-sm text-gray-900 dark:text-gray-100 font-bold">{votedMembersCount}/{members.length}</span></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full"><div className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(Math.round((votedMembersCount / (members.length || 1)) * 100), 100)}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2"><span className="text-sm text-gray-600 dark:text-gray-400 font-bold">Itinerariu complet</span><span className="text-sm text-gray-900 dark:text-gray-100 font-bold">{itineraryProgress}%</span></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden w-full"><div className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500" style={{ width: `${itineraryProgress}%` }} /></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 w-full flex flex-col items-center border dark:border-gray-800 transition-colors">
              <div className="flex flex-col items-center justify-center mb-4 gap-2 w-full relative">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">Membri ({members.length})</h2>
                {currentUserRole === "admin" && <button onClick={() => setShowInviteModal(true)} className="text-blue-600 dark:text-blue-400 absolute right-0 top-0 p-1"><UserPlus className="w-5 h-5" /></button>}
              </div>
              <div className="space-y-6 w-full flex flex-col items-center">
                {members.map((member, index) => (
                  <div key={member.id} className="flex flex-col items-center gap-3 group">
                    <div className="relative">
                      {member.role === "admin" && <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-orange-500 to-yellow-600 rounded-full blur-[2px] opacity-70 animate-pulse" />}
                      <div className={`w-12 h-12 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-bold relative z-10 border-2 border-white dark:border-gray-950 transition-transform group-hover:scale-105`}>
                        {getInitials(member.name)}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-gray-900 dark:text-gray-100 font-bold">{member.name}</p>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{member.role === "admin" ? "Administrator Călătorie" : "Membru Grup"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">Activitate recentă</h2>
              <div className="space-y-6 items-center">
                {activities.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center italic py-4">Nu există activitate recentă.</p>
                ) : activities.map((act) => (
                  <div key={act.id} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(act.userName ? act.userName.charCodeAt(0) : 0)} flex items-center justify-center text-white font-black text-xs`}>
                      {getInitials(act.userName || "U")}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium">
                        <span className="font-black">{act.userName}</span> {act.action}{" "}
                        <span className="text-blue-600 dark:text-blue-400 font-black">{act.targetName}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">recent</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-950 via-purple-900 to-fuchsia-950 rounded-xl shadow-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] rounded-full" />
              <h2 className="font-black mb-8 uppercase text-center text-blue-500">Următorii Pași</h2>
              <div className="space-y-6">
                {[
                  { t: "Adaugă 5 atracții", d: "Construiește baza planului." },
                  { t: "Invită prietenii", d: "O aventură se împarte cu echipa." },
                  { t: "Votați prioritățile", d: "Alegeți ce merită văzut." }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 font-black text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase">{step.t}</p>
                      <p className="text-sm text-gray-400 font-medium">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/explore/${trip.id}`} className="mt-10 w-full font-black text-sm bg-white text-gray-950 py-5 rounded-2xl hover:bg-blue-50 transition-all text-center flex items-center justify-center gap-3 uppercase shadow-xl">
                Lansează explorarea <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 border dark:border-gray-800">
            <h2 className="text-2xl mb-4 text-gray-900 dark:text-white font-bold">Invită membri</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Distribuie acest link:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4 break-all text-sm text-gray-700 dark:text-gray-300 font-mono border dark:border-gray-700">{`${window.location.origin}/trip/${id}?invite=true`}</div>
            <div className="flex gap-3">
              <button onClick={() => setShowInviteModal(false)} className="flex-1 px-4 py-2 border font-bold border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">Închide</button>
              <button onClick={handleShare} className="flex-1 px-4 py-2 font-bold bg-blue-600 text-white rounded-lg shadow-md">Copiază link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}