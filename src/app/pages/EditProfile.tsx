import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Alexandru Popescu");
  const [email, setEmail] = useState("alexandru.popescu@example.com");
  const [phone, setPhone] = useState("+40 712 345 678");
  const [bio, setBio] = useState("Pasionat de călătorii și fotografie. Explorez lumea pas cu pas.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <div className="bg-white border-b sticky top-0 z-10 flex items-center justify-between p-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 active:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Editează Profil</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 flex flex-col items-center flex-1 w-full max-w-md mx-auto">
        <div className="relative mb-8 mt-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            type="button"
            onClick={() => toast.info("Încărcarea fotografiei va fi disponibilă în curând!")}
            className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full text-white shadow-lg active:scale-95 transition-transform border-2 border-white"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nume Complet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Despre mine</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-xl p-4 font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              Salvează Modificările
              <Check className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}