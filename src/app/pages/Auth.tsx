import { useState } from "react";
import { useNavigate } from "react-router";
import { Compass, Mail, Lock, User, ChevronRight, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

// Importăm serviciul de auth și baza de date configurate anterior
import { auth, db } from "../../firebase"; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
// Importăm funcțiile necesare pentru Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        // --- LOGARE ---
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Te-ai conectat cu succes!");
      } else {
        // --- ÎNREGISTRARE ---
        // 1. Creăm contul în Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Actualizăm Display Name-ul în profilul Auth
        await updateProfile(user, { displayName: name });

        // 3. Salvăm datele utilizatorului în Firestore
        // Folosim UID-ul utilizatorului ca ID pentru document
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          photoURL: "", // Placeholder pentru viitor
          createdAt: serverTimestamp(),
          savedAttractions: [] // Inițializăm lista de atracții salvate
        });

        toast.success("Cont creat și profil salvat!");
      }
      navigate("/");
    } catch (error: any) {
      console.error("Eroare Firebase Auth:", error.code);
      switch (error.code) {
        case 'auth/invalid-email': setAuthError("Adresa de email nu este validă."); break;
        case 'auth/user-disabled': setAuthError("Acest cont a fost dezactivat."); break;
        case 'auth/user-not-found': setAuthError("Nu am găsit niciun cont cu acest email."); break;
        case 'auth/wrong-password': setAuthError("Parola introdusă este incorectă."); break;
        case 'auth/email-already-in-use': setAuthError("Acest email este deja utilizat."); break;
        case 'auth/weak-password': setAuthError("Parola trebuie să aibă minim 6 caractere."); break;
        case 'auth/invalid-credential': setAuthError("Datele de autentificare sunt incorecte."); break;
        default: setAuthError("A apărut o eroare la autentificare.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 dark:from-gray-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-500">
      
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300">
        
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-all">
          {isLogin ? "Bine ai venit!" : "Creează un cont"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm">
          {isLogin 
            ? "Conectează-te pentru a continua planificarea călătoriilor tale." 
            : "Alătură-te comunității și începe să explorezi lumea."}
        </p>

        {authError && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm animate-pulse">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-medium">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {!isLogin && (
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Nume complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent w-full font-bold text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal"
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Adresă de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full font-bold text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full font-bold text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal"
              required
              disabled={isLoading}
            />
          </div>

          {isLogin && (
            <div className="flex justify-end w-full mt-1 relative z-10">
              <button type="button" className="text-sm font-bold text-blue-600 dark:text-blue-400 active:text-blue-800 dark:active:text-blue-300 transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                Ai uitat parola?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 active:scale-95 active:bg-blue-700 dark:active:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 dark:shadow-blue-500/10 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                {isLogin ? "Conectare" : "Înregistrare"}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-2 transition-all">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {isLogin ? "Nu ai un cont?" : "Ai deja un cont?"}
          </span>
          <button
            onClick={() => {
              setAuthError(null);
              setIsLogin(!isLogin);
            }}
            type="button"
            className="font-bold text-blue-600 dark:text-blue-400 active:text-blue-800 dark:active:text-blue-300 transition-colors text-sm hover:text-blue-700 dark:hover:text-blue-300"
            disabled={isLoading}
          >
            {isLogin ? "Creează unul acum" : "Conectează-te"}
          </button>
        </div>
      </div>
    </div>
  );
}