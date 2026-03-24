import { useState } from "react";
import { useNavigate } from "react-router";
import { Compass, Mail, Lock, User, ChevronRight } from "lucide-react";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? "Bine ai revenit!" : "Creează un cont"}
        </h1>
        <p className="text-gray-500 mb-8 text-center text-sm">
          {isLogin 
            ? "Conectează-te pentru a continua planificarea călătoriilor tale." 
            : "Alătură-te comunității și începe să explorezi lumea."}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {!isLogin && (
            <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Nume complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent w-full font-bold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal"
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Adresă de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full font-bold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal"
              required
            />
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl p-3 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
            <Lock className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="password"
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full font-bold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal"
              required
            />
          </div>

          {isLogin && (
            <div className="flex justify-end w-full mt-1">
              <button type="button" className="text-sm font-bold text-blue-600 active:text-blue-800 transition-colors">
                Ai uitat parola?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4 active:scale-95 active:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
          >
            {isLogin ? "Conectare" : "Înregistrare"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-2">
          <span className="text-gray-500 text-sm">
            {isLogin ? "Nu ai un cont?" : "Ai deja un cont?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-blue-600 active:text-blue-800 transition-colors text-sm"
          >
            {isLogin ? "Creează unul acum" : "Conectează-te"}
          </button>
        </div>
      </div>
    </div>
  );
}