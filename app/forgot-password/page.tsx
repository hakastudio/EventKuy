"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Cek email Bos! Link reset sudah meluncur.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 text-xs font-black uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Login
        </Link>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
          <div className="mb-8">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="text-cyan-400" size={24} />
            </div>
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">Reset <span className="text-cyan-500">Access.</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase mt-2 tracking-widest">Enter your email to get back in.</p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="email"
                  placeholder="BOS@EXAMPLE.COM"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-slate-800 focus:outline-none focus:border-cyan-500 transition-all uppercase text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-2xl font-black italic uppercase text-xs tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}