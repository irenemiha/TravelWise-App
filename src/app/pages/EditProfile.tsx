import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Camera, Check, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// IMPORTURI FIREBASE
import { auth, db } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Modifică useEffect să fie mai „răbdător”
  useEffect(() => {
    async function loadUserData() {
      // Luăm userul direct din Firebase Auth ca să fim siguri
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        // Dacă nici Firebase nu îl vede, mai așteptăm puțin
        return; 
      }

      try {
        console.log("📡 Citesc datele pentru UID:", currentUser.uid);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setName(data.name || "");
          setPhone(data.phone || "");
          setBio(data.bio || "");
        } else {
          setName(currentUser.displayName || "");
        }
        setEmail(currentUser.email || "");
      } catch (error) {
        console.error("❌ Eroare la citire:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  // 2. Modifică handleSave să ignore problemele de context
  const handleSave = async (e?: any) => {
    if (e) e.preventDefault();
    
    const activeUser = auth.currentUser;
    if (!activeUser) return;

    setIsSaving(true);

    try {
      const userRef = doc(db, "users", activeUser.uid);
      
      // Salvăm un obiect CURAT
      const data = {
        name: name.trim(),
        email: activeUser.email,
        phone: phone || "",
        bio: bio || "",
        updatedAt: new Date()
      };

      console.log("📡 Salvez în Firestore la ID-ul:", activeUser.uid);
      
      // setDoc creează colecția "users" dacă nu există!
      await setDoc(userRef, data, { merge: true });

      // Actualizăm și profilul de Auth
      await updateProfile(activeUser, { displayName: name.trim() });

      toast.success("Profil actualizat!");
      navigate("/profile");
    } catch (error: any) {
      console.error("❌ Eroare la salvare:", error);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10 flex items-center justify-between p-4 shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Editează Profil</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 flex flex-col items-center flex-1 w-full max-w-md mx-auto">
        <div className="relative mb-8 mt-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg transition-colors bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {user?.photoURL ? (
              <ImageWithFallback
                src={user.photoURL}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{name ? name[0].toUpperCase() : "U"}</span>
            )}
          </div>
          <button 
            type="button"
            onClick={() => toast.info("Upload-ul va fi disponibil curând!")}
            className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full text-white shadow-lg border-2 border-white dark:border-gray-800"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Am scos onSubmit de aici pentru a evita blocajele de browser */}
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              Nume Complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 opacity-50">
              Email
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              Telefon
            </label>
            <input
              type="tel"
              value={phone}
              placeholder="+40..."
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              Despre mine
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio..."
              rows={3}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 font-bold text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="mt-6">
            <button
              type="button" // SCHIMBAT din submit în button
              onClick={handleSave} // Legat direct de click
              disabled={isSaving}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:bg-gray-400"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Salvează Modificările
                  <Check className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}