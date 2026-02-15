"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { User, Lock, Briefcase, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`
          }
        }
      });

      if (error) {
        alert("Gagal Daftar: " + error.message);
      } else {
        alert("Registrasi Berhasil! Silakan cek email Anda untuk verifikasi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black italic uppercase text-white tracking-tighter mb-2"
          >
            Join <span className="text-blue-500">EventKuy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm font-medium"
          >
            Buat akun untuk mulai berkarya atau bersenang-senang.
          </motion.p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              className="w-full p-4 pl-12 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all placeholder:text-gray-500 font-bold text-sm" 
              value={fullName}
              onChange={e => setFullName(e.target.value)} 
              required 
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-4 pl-12 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all placeholder:text-gray-500 font-bold text-sm" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative group"
          >
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password (Min. 6 Karakter)" 
              className="w-full p-4 pl-12 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all placeholder:text-gray-500 font-bold text-sm" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
              minLength={6}
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative group"
          >
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 pl-12 bg-black/20 border border-white/10 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-black/40 transition-all appearance-none cursor-pointer font-bold text-sm"
            >
              <option value="user" className="bg-[#0A0C10]">User (Penikmat Event)</option>
              <option value="organizer" className="bg-[#0A0C10]">Organizer (Pembuat Event)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </div>
          </motion.div>

          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading} 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-2xl font-black italic uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] mt-4"
          >
            {loading ? "Creating Account..." : "Daftar Sekarang"}
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors ml-1">
              Login disini
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}