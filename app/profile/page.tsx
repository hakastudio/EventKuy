"use client";

import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Lock, LogOut, Camera, Save, Loader2, Ticket, Briefcase } from "lucide-react"; // <--- Briefcase sudah ditambah
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State Form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setEmail(user.email || "");
      // Ambil metadata nama (kalau ada)
      setFullName(user.user_metadata?.full_name || "User EventKuy");
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // 1. Update Password (Kalau diisi)
    if (password) {
        const { error } = await supabase.auth.updateUser({ password: password });
        if (error) alert("Gagal update password: " + error.message);
        else alert("Password berhasil diganti!");
    }

    // 2. Update Metadata (Nama)
    const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
    });

    if (!error) {
        alert("Profil berhasil diperbarui!");
        window.location.reload(); // Refresh biar data baru muncul
    } else {
        alert("Gagal update profil.");
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="animate-spin text-brand-blue" /></div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-32 pb-12">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Pengaturan Akun</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* KIRI: KARTU PROFIL */}
            <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
                    <div className="relative inline-block mb-4 group cursor-pointer">
                        <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center text-3xl font-black mx-auto overflow-hidden">
                             {/* Simulasi Avatar */}
                             {user?.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
                             ) : (
                                fullName[0]?.toUpperCase()
                             )}
                        </div>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg">{fullName}</h3>
                    <p className="text-gray-500 text-xs mb-6">{email}</p>

                    <button onClick={handleLogout} className="w-full py-2 border border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-sm">
                        <LogOut size={16} /> Keluar
                    </button>
                </div>

                {/* Menu Samping (Hiasan) */}
                <div className="mt-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                    <Link href="/my-tickets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium transition-all">
                        <Ticket size={18} /> Tiket Saya
                    </Link>
                    <Link href="/organizer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-brand-blue font-bold bg-blue-50 transition-all">
                        <Briefcase size={18} /> Dashboard Organizer
                    </Link>
                </div>
            </div>

            {/* KANAN: FORM EDIT */}
            <div className="md:col-span-2">
                <form onSubmit={handleUpdateProfile} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Edit Profil</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    value={email}
                                    disabled 
                                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" 
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">*Email tidak dapat diubah.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4">Ganti Password</h4>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Password Baru</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input 
                                        type="password" 
                                        placeholder="Kosongkan jika tidak ingin mengganti"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={saving}
                                className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand-blue/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70"
                            >
                                {saving ? (
                                    <> <Loader2 className="animate-spin" size={18} /> Menyimpan... </>
                                ) : (
                                    <> <Save size={18} /> Simpan Perubahan </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}