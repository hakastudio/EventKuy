"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) alert(error.message);
    else {
      alert("Password berhasil diganti! Login sekarang Bos.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="bg-black/40 border border-white/10 p-10 rounded-[40px] w-full max-w-md">
        <h1 className="text-2xl font-black italic uppercase text-white mb-6 tracking-tighter">New <span className="text-cyan-500">Security.</span></h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="NEW PASSWORD"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-cyan-400 transition-all">
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
}