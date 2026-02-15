"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // Tambah useSearchParams
import { Search, Ticket, LogOut } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [keyword, setKeyword] = useState(""); // Simpan ketikan user
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Fungsi Jalanin Pencarian
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Biar gak refresh
    if (keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <Ticket className="text-white" size={20} />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-brand-blue">
            Event<span className="text-gray-800">Kuy.</span>
          </span>
        </Link>

        {/* SEARCH BAR (SUDAH HIDUP) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative mx-8">
          <input 
            type="text" 
            placeholder="Cari konser, artis, atau venue..." 
            className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all text-sm font-medium"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="absolute right-1.5 top-1.5 p-1.5 bg-brand-blue text-white rounded-full hover:bg-brand-dark transition-all">
            <Search size={16} />
          </button>
        </form>

        {/* MENU KANAN */}
        <div className="flex items-center gap-3 relative z-10">
          {user ? (
            <>
              <Link href="/my-tickets" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-blue px-4 py-2 hover:bg-blue-50 rounded-full transition-all">
                <Ticket size={18} /> Tiket Saya
              </Link>
              <button onClick={handleLogout} className="hidden md:flex p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Keluar">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login" className="px-5 py-2.5 text-brand-blue font-bold text-sm border border-brand-blue rounded-lg hover:bg-blue-50 transition-all">
                  Masuk
                </Link>
                <Link href="/login" className="px-5 py-2.5 bg-brand-blue text-white font-bold text-sm rounded-lg hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-blue/30 transition-all">
                  Daftar
                </Link>
              </div>
              <Link href="/login" className="md:hidden px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-lg hover:bg-brand-dark transition-all">
                Masuk
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}