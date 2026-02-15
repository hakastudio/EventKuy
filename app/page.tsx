import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Music, Mic, Briefcase, Trophy, Ticket, ArrowRight, Star, PlayCircle } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  // 1. Ambil Event Terbaru
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. Ambil Event "Populer" (Simulasi: ambil 3 event pertama)
  const popularEvents = events?.slice(0, 3) || [];

  return (
    <main className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      <Navbar />

      {/* === 1. HERO SECTION (Banner Atas) === */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* Background Hiasan BERGERAK (Floating) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 -z-10"></div>
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-3xl -z-10 animate-float"></div>

        <div className="max-w-7xl mx-auto px-4 text-center">
            
            {/* Badge Keren */}
            <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-blue-100 text-brand-blue text-xs font-bold mb-8 shadow-sm hover:shadow-md transition-all cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                    </span>
                    Platform Tiket #1 Indonesia
                </span>
            </div>

            {/* Judul Besar (Fade Up delay 100ms) */}
            <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                Cari Hiburan <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">
                    Tanpa Batas.
                </span>
            </h1>

            {/* Deskripsi (Fade Up delay 200ms) */}
            <p className="animate-fade-up delay-200 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Dari konser musik megah hingga workshop intim, temukan dan beli tiket event favoritmu dalam hitungan detik.
            </p>

            {/* Tombol (Fade Up delay 300ms) */}
            <div className="animate-fade-up delay-300 flex flex-col md:flex-row items-center justify-center gap-4">
                <Link href="/search?q=" className="group px-8 py-4 bg-brand-blue text-white font-bold rounded-full shadow-xl shadow-brand-blue/20 hover:bg-brand-dark hover:scale-105 active:scale-95 transition-all w-full md:w-auto flex items-center justify-center gap-2">
                    Jelajahi Event <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/organizer/create" className="group px-8 py-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all w-full md:w-auto flex items-center justify-center gap-2">
                    <PlayCircle size={18} className="text-gray-400 group-hover:text-brand-blue transition-colors" />
                    Buat Event Sendiri
                </Link>
            </div>

            {/* Stats Kecil (Fade Up delay 500ms) */}
            <div className="animate-fade-up delay-500 mt-12 flex items-center justify-center gap-8 text-gray-400 opacity-60">
                <div className="flex items-center gap-2 hover:text-brand-blue transition-colors cursor-default"><Star size={16} fill="currentColor" /> 4.9/5 Rating</div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2 hover:text-brand-blue transition-colors cursor-default"><Ticket size={16} /> 10k+ Tiket Terjual</div>
            </div>
        </div>
      </div>

      {/* === 2. KATEGORI PILIHAN (Hover Effect) === */}
      <div className="border-y border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 py-10">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Kategori Populer</h3>
                  <Link href="/search?q=" className="text-xs font-bold text-brand-blue hover:underline md:hidden">Lihat Semua</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { icon: Music, label: "Konser", color: "bg-purple-100 text-purple-600" },
                    { icon: Mic, label: "Stand Up", color: "bg-yellow-100 text-yellow-600" },
                    { icon: Briefcase, label: "Workshop", color: "bg-blue-100 text-blue-600" },
                    { icon: Trophy, label: "Olahraga", color: "bg-green-100 text-green-600" },
                    { icon: Ticket, label: "Festival", color: "bg-red-100 text-red-600" },
                  ].map((cat, idx) => (
                      <Link key={idx} href={`/search?q=${cat.label}`} className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-brand-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group min-w-[160px]">
                          <div className={`p-3 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                              <cat.icon size={20} />
                          </div>
                          <span className="font-bold text-gray-700 group-hover:text-brand-blue transition-colors">{cat.label}</span>
                      </Link>
                  ))}
              </div>
          </div>
      </div>

      {/* === 3. EVENT TERPOPULER (Hover Up) === */}
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-8">
              <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Pilihan Editor 🔥</h2>
                  <p className="text-gray-500">Event paling hits minggu ini yang wajib kamu datangi.</p>
              </div>
              <Link href="/search?q=" className="hidden md:flex items-center gap-1 text-brand-blue font-bold hover:gap-2 transition-all">
                  Lihat Semua <ArrowRight size={18} />
              </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularEvents.map((event) => (
                  <div key={event.id} className="hover:-translate-y-2 transition-transform duration-300">
                      <EventCard event={event} />
                  </div>
              ))}
              {!popularEvents.length && (
                  <div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                      <p className="text-gray-400 font-bold">Belum ada event populer.</p>
                  </div>
              )}
          </div>
      </div>

      {/* === 4. CTA DAFTAR ORGANIZER (Footer Banner) === */}
      <div className="py-24 bg-[#0f172a] text-white text-center relative overflow-hidden group">
          {/* Pattern Background Bergerak */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          {/* Blur Lights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px] animate-pulse-slow delay-500"></div>

          <div className="relative z-10 max-w-2xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Punya Event Sendiri?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                  Bergabung dengan ribuan organizer lainnya. Jual tiketmu dengan mudah, aman, dan terima pembayaran instan.
              </p>
              <Link href="/organizer/create" className="inline-block px-8 py-4 bg-brand-blue text-white font-bold rounded-full shadow-lg shadow-brand-blue/30 hover:bg-white hover:text-brand-blue hover:scale-105 transition-all duration-300">
                  Mulai Jual Tiket Gratis
              </Link>
          </div>
      </div>

      <Footer />
    </main>
  );
}