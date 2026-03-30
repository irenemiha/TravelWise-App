import { useNavigate, useParams } from "react-router";
import { 
  ChevronLeft, 
  UserMinus, 
  Shield, 
  Link as LinkIcon, 
  MoreVertical, 
  UserCircle,
  Check,
  Copy
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  role: "admin" | "member";
  initials: string;
}

export function ManageMembers() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "Ana Almajanu", role: "admin", initials: "AA" },
    { id: "2", name: "Alexandra Burnichi", role: "member", initials: "AB" },
    { id: "3", name: "Irene Musat", role: "member", initials: "IM" },
  ]);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);

  const inviteLink = `https://travelwise.app/join/trip-${id || '123'}-xyz`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link copiat în clipboard!");
    setShowLinkModal(false);
  };

  const handleChangeRole = (memberId: string, newRole: "admin" | "member") => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    toast.info("Rol actualizat!");
    setMemberToEdit(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 p-4 flex items-center border-b dark:border-gray-800 sticky top-0 z-50 transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white font-black uppercase tracking-tight">Membri Grup</h1>
      </div>

      <div className="p-6 max-w-md mx-auto space-y-4">
        {/* Buton Invitatie */}
        <button 
          onClick={() => setShowLinkModal(true)}
          className="w-full py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-all"
        >
          <LinkIcon className="w-5 h-5" /> Invită Membrii
        </button>

        {/* Lista Membri */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
          {members.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between border-b dark:border-gray-800 last:border-0 h-20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                  member.role === 'admin' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500' 
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-[15px]">{member.name}</p>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                    member.role === 'admin' 
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {member.role === 'admin' ? 'Administrator' : 'Membru'}
                  </span>
                </div>
              </div>

              {/* Zona de Actiuni */}
              <div className="flex items-center">
                <button 
                  onClick={() => setMemberToEdit(member)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl mr-1 transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                
                {member.role !== "admin" ? (
                  <button 
                    onClick={() => setMemberToDelete(member)} 
                    className="p-2 text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                  >
                    <UserMinus className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="w-9" /> 
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL INVITATIE PRIN LINK --- */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 w-full max-w-sm border dark:border-gray-800 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                <LinkIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Link de Invitație</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">Oricine are acest link se poate alătura călătoriei tale.</p>
              
              <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl mb-6 break-all text-xs font-mono text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700">
                {inviteLink}
              </div>

              <div className="flex flex-col w-full gap-2">
                <button onClick={copyToClipboard} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Copy className="w-4 h-4" /> Copiază Link
                </button>
                <button onClick={() => setShowLinkModal(false)} className="w-full py-4 text-gray-500 dark:text-gray-400 font-bold hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Închide</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL SCHIMBARE ROL (ACTION SHEET) --- */}
      {memberToEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-[60]">
          <div className="bg-white dark:bg-gray-900 rounded-t-[32px] w-full max-w-md p-6 border-t dark:border-gray-800 animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-bold mb-4 px-2 text-gray-900 dark:text-white">Rol pentru {memberToEdit.name}</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleChangeRole(memberToEdit.id, "admin")}
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  memberToEdit.role === 'admin' 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <Shield className={memberToEdit.role === 'admin' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'} />
                  <div>
                    <p className={`font-bold text-sm ${memberToEdit.role === 'admin' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>Administrator Călătorie</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-500">Control deplin asupra grupului.</p>
                  </div>
                </div>
                {memberToEdit.role === "admin" && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
              </button>

              <button 
                onClick={() => handleChangeRole(memberToEdit.id, "member")}
                className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                  memberToEdit.role === 'member' 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <UserCircle className={memberToEdit.role === 'member' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'} />
                  <div>
                    <p className={`font-bold text-sm ${memberToEdit.role === 'member' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>Membru Grup</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-500">Poate vota și adăuga idei.</p>
                  </div>
                </div>
                {memberToEdit.role === "member" && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
              </button>
            </div>
            <button onClick={() => setMemberToEdit(null)} className="w-full mt-4 py-4 text-gray-400 dark:text-gray-500 font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Anulează</button>
          </div>
        </div>
      )}

      {/* --- MODAL STERGERE --- */}
      {memberToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-[70]">
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 w-full max-w-xs text-center shadow-2xl border dark:border-gray-800 animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserMinus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-black uppercase tracking-tight">Elimini membrul?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">Sigur vrei să îl elimini pe <strong>{memberToDelete.name}</strong>?</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { setMembers(members.filter(m => m.id !== memberToDelete.id)); setMemberToDelete(null); toast.error("Membru eliminat"); }} 
                className="w-full py-4 bg-red-500 dark:bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-lg shadow-red-200 dark:shadow-none"
              >
                Elimină definitiv
              </button>
              <button 
                onClick={() => setMemberToDelete(null)} 
                className="w-full py-4 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-bold active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}