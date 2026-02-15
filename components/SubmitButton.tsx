"use client";

import { useFormStatus } from "react-dom";
import { Loader2, CreditCard } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand-blue/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Sedang Memproses...
        </>
      ) : (
        <>
          <CreditCard size={20} />
          Bayar Sekarang
        </>
      )}
    </button>
  );
}