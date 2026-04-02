import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router"; // Adăugat useSearchParams
import { Compass, Mail, Lock, User, ChevronRight, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { auth, db } from "../../firebase"; 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Citim direct din URL
  
  // Verificăm dacă în URL scrie ?mode=signup
  const mode = searchParams.get("mode");

  // Inițializăm isLogin: dacă mode e "signup", atunci isLogin e false
  const [isLogin, setIsLogin] = useState(mode !== "signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sincronizăm starea dacă userul schimbă între login/register în timp ce pagina e deschisă
  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Te-ai conectat cu succes!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          photoURL: "",
          createdAt: serverTimestamp(),
          savedAttractions: []
        });

        toast.success("Cont creat cu succes!");
      }
      navigate("/");
    } catch (error: any) {
      console.error("Eroare Firebase Auth:", error.code);
      switch (error.code) {
        case 'auth/invalid-email': setAuthError("Adresa de email nu este validă."); break;
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
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-purple-950 to-fuchsia-950 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center transition-all duration-300">
        
        <div className="w-16 h-16 bg-white/10 dark:bg-blue-950/40 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
          <Compass className="w-8 h-8 text-white dark:text-blue-300" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight transition-all">
          {isLogin ? "Bine ai venit!" : "Creează cont"}
        </h1>
        <p className="text-blue-100/70 dark:text-gray-400 mb-10 text-center text-md font-medium px-2">
          {isLogin 
            ? "Conectează-te pentru a continua planificarea călătoriilor tale." 
            : "Alătură-te comunității și începe să explorezi lumea."}
        </p>

        {authError && (
          <div className="w-full bg-red-950/50 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-start gap-3 text-sm animate-pulse">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-semibold">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {!isLogin && (
            <div className="flex items-center bg-black/20 dark:bg-black/40 rounded-2xl p-4 border border-white/5 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <User className="w-5 h-5 text-blue-200 dark:text-gray-500 mr-3.5" />
              <input
                type="text"
                autoComplete="name"
                placeholder="Nume complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent w-full font-bold text-white outline-none placeholder:text-blue-200/50 dark:placeholder:text-gray-500 placeholder:font-normal"
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="flex items-center bg-black/20 dark:bg-black/40 rounded-2xl p-4 border border-white/5 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <Mail className="w-5 h-5 text-blue-200 dark:text-gray-500 mr-3.5" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Adresă de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full font-bold text-white outline-none placeholder:text-blue-200/50 dark:placeholder:text-gray-500 placeholder:font-normal"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center bg-black/20 dark:bg-black/40 rounded-2xl p-4 border border-white/5 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
            <Lock className="w-5 h-5 text-blue-200 dark:text-gray-500 mr-3.5" />
            <input
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full font-bold text-white outline-none placeholder:text-blue-200/50 dark:placeholder:text-gray-500 placeholder:font-normal"
              required
              disabled={isLoading}
            />
          </div>

          {isLogin && (
            <div className="flex justify-end w-full mt-1 relative z-10 px-1">
              <button type="button" className="text-sm font-bold text-blue-300 dark:text-blue-400 hover:text-white transition-colors">
                Ai uitat parola?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-black py-5 rounded-2xl mt-4 active:scale-95 active:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed uppercase text-xs tracking-widest"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se procesează...
              </>
            ) : (
              <>
                {isLogin ? "Conectare" : "Înregistrare Cont Nou"}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-3 w-full transition-all border-t border-white/10 pt-8">
          <span className="text-blue-100/60 dark:text-gray-400 text-sm font-medium">
            {isLogin ? "Nu ai un cont?" : "Ai deja un cont?"}
          </span>
          <button
            onClick={() => {
              setAuthError(null);
              setIsLogin(!isLogin);
            }}
            type="button"
            className="font-bold text-white bg-white/10 px-6 py-3 rounded-full border border-white/10 hover:bg-white/20 active:scale-95 transition-all text-sm tracking-wide"
            disabled={isLoading}
          >
            {isLogin ? "Creează unul acum" : "Conectează-te"}
          </button>
        </div>
      </div>
    </div>
  );
}