import { useParams, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Heart,
  Info,
  MessageCircle,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { mockAttractionsData, mockTrips, Attraction, addChatMessage } from "../store";

export function Explore() {
  const { id } = useParams();
  const tripId = id || "1";
  const trip = mockTrips.find(t => t.id === tripId) || mockTrips[0];
  const initialAttractions = mockAttractionsData[tripId] || [];

  const [attractions, setAttractions] = useState<Attraction[]>(initialAttractions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    setAttractions(mockAttractionsData[tripId] || []);
  }, [tripId]);

  const handleShareToChat = (attraction: Attraction) => {
    addChatMessage(tripId, {
      id: Date.now().toString(),
      text: `Uitați ce am găsit: ${attraction.name}! Ce ziceți, mergem?`,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sharedAttractionId: attraction.id
    });
    // Optional: add a tiny visual feedback here or just navigate to chat
    navigate(`/chat/${tripId}`);
  };

  const handleVote = (attractionId: string, voteType: "up" | "down") => {
    setAttractions((prev) =>
      prev.map((attr) => {
        if (attr.id === attractionId) {
          const newVotes = { ...attr.votes };
          const oldVote = attr.userVote;

          // Remove old vote if exists
          if (oldVote === "up") newVotes.up--;
          if (oldVote === "down") newVotes.down--;

          // Add new vote if different from old
          const newVote = oldVote === voteType ? null : voteType;
          if (newVote === "up") newVotes.up++;
          if (newVote === "down") newVotes.down++;

          return { ...attr, votes: newVotes, userVote: newVote };
        }
        return attr;
      })
    );
  };

  const toggleSave = (attractionId: string) => {
    setAttractions((prev) =>
      prev.map((attr) =>
        attr.id === attractionId ? { ...attr, saved: !attr.saved } : attr
      )
    );
  };

  const categories = [
    "all",
    ...Array.from(new Set(initialAttractions.map((a) => a.category))),
  ];

  const filteredAttractions = attractions.filter((attr) => {
    const matchesSearch =
      attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || attr.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col items-center">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 w-full flex flex-col items-center">
        <div className="w-full max-w-md px-4 py-4 flex flex-col items-center">
          <div className="flex flex-col gap-4 mb-4 w-full">
            <div className="flex flex-col items-center text-center">
              <Link
                to={`/trip/${id}`}
                className="text-blue-600 hover:text-blue-700 font-bold mb-2 inline-block"
              >
                ← Înapoi
              </Link>
              <h1 className="text-2xl font-bold mb-1 text-gray-900">
                Explorează {trip.destination.split(',')[0]}
              </h1>
              <p className="text-sm text-gray-600">
                Descoperă și votează atracțiile preferate
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută atracții..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full justify-center max-w-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-bold px-4 py-2 rounded-xl transition-colors flex-grow text-center ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 active:bg-gray-50"
                  }`}
                >
                  {category === "all" ? "Toate" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6 flex flex-col items-center">
        {/* Stats Bar */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-8 justify-center">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-blue-600">
                  {attractions.filter((a) => a.saved).length}
                </div>
                <div className="text-xs text-gray-600 font-bold">Salvate</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-blue-600">
                  {attractions.reduce((acc, a) => acc + a.votes.up, 0)}
                </div>
                <div className="text-xs text-gray-600 font-bold">Voturi</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-blue-600">
                  {filteredAttractions.length}
                </div>
                <div className="text-xs text-gray-600 font-bold">Rezultate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attractions List */}
        <div className="flex flex-col gap-6 w-full items-center">
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow w-full flex flex-col items-center text-center"
            >
              <div className="relative h-48 w-full">
                <ImageWithFallback
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleSave(attraction.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      attraction.saved
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                  {attraction.category}
                </div>
              </div>

              <div className="p-5 flex flex-col items-center w-full">
                <h3 className="text-xl mb-2 text-gray-900 font-bold">
                  {attraction.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 text-center">
                  {attraction.description}
                </p>

                {/* Rating and Details */}
                <div className="flex flex-col items-center gap-2 mb-4 text-sm text-gray-600 w-full">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">
                      {attraction.rating} ({attraction.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4 w-full">
                    <div className="flex items-center justify-center gap-1 font-bold">
                      <Clock className="w-4 h-4" />
                      <span>{attraction.duration}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{attraction.price}</span>
                    </div>
                  </div>
                </div>

                {/* Voting Section */}
                <div className="border-t pt-4 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex justify-center gap-4 w-full">
                      <button
                        onClick={() => handleVote(attraction.id, "up")}
                        className={`font-bold flex items-center justify-center gap-2 px-6 py-2 rounded-xl transition-colors flex-1 ${
                          attraction.userVote === "up"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-green-50"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>{attraction.votes.up}</span>
                      </button>
                      <button
                        onClick={() => handleVote(attraction.id, "down")}
                        className={`font-bold flex items-center justify-center gap-2 px-6 py-2 rounded-xl transition-colors flex-1 ${
                          attraction.userVote === "down"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600 hover:bg-red-50"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        <span>{attraction.votes.down}</span>
                      </button>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button 
                        onClick={() => toast.info(`Mai multe detalii despre ${attraction.name} vor fi disponibile curând!`)}
                        className="p-2 active:bg-gray-100 rounded-lg transition-colors flex-1 flex justify-center items-center gap-2 font-bold text-gray-600 border border-gray-200 active:scale-95"
                      >
                        <Info className="w-5 h-5" />
                        Detalii
                      </button>
                      <button 
                        onClick={() => handleShareToChat(attraction)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors flex-1 flex justify-center items-center gap-2 font-bold text-blue-600 border border-blue-200"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAttractions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center flex flex-col items-center w-full">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-gray-900 font-bold">
              Nicio atracție găsită
            </h3>
            <p className="text-gray-600">
              Încearcă să modifici filtrele sau termenii de căutare
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
