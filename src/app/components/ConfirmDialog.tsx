import { X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmă",
  cancelText = "Anulează",
  isDestructive = true,
}: ConfirmDialogProps) {
  
  // Blocăm scroll-ul paginii când modalul este deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onCancel} // Închide la click pe fundal
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden transform transition-all border border-transparent dark:border-gray-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Previne închiderea când dai click pe dialog
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              {title}
            </h3>
            <button
              onClick={onCancel}
              className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium text-sm">
            {message}
          </p>
          
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-4 px-4 rounded-2xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:bg-gray-200 dark:active:bg-gray-700 active:scale-95 transition-all text-sm tracking-wider"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-4 px-4 rounded-2xl font-bold active:scale-95 transition-all text-sm tracking-wider ${
                isDestructive
                  ? "bg-red-500 text-white active:bg-red-600 shadow-lg shadow-red-200 dark:shadow-none"
                  : "bg-blue-600 text-white active:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}