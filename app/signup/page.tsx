"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    // Panggil Google (Sama persis kayak login, karena Google otomatis handle pendaftaran)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("Gagal koneksi ke Google: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative z-10">
        
        {/* Header Teks */}
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-[10px] font-black tracking-widest text-green-500 uppercase">
              Instant Membership
            </span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter text-white mb-2">
            JOIN THE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
              TRIBE.
            </span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Satu klik untuk akses ribuan event seru tanpa ribet ngisi formulir.
          </p>
        </div>

        {/* Tombol Google */}
        <div className="mt-8">
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-3 py-4 px-4 border border-white/10 text-sm font-bold rounded-2xl text-white bg-white/5 hover:bg-white/10 hover:scale-[1.02] hover:border-white/20 transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
               <span className="animate-pulse">Menghubungkan...</span>
            ) : (
              <>
                {/* Logo Google */}
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1">
                   <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-full h-full"/>
                </div>
                <span>Daftar dengan Google</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-white hover:text-green-400 transition-colors">
              Login disini
            </Link>
          </p>
        </div>

      </div>
      
      {/* Footer Copyright */}
      <div className="absolute bottom-8 text-center">
         <p className="text-[10px] font-black tracking-widest text-white/20 uppercase">EventKuy © 2026</p>
      </div>
    </div>
  );
}