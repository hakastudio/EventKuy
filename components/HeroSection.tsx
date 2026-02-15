"use client";

import React from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroSection() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    router.push(`/?q=${q}#browse-events`);
  };

  const textMarquee = "GET YOUR TICKET NOW • DO NOT MISS OUT • LIMITED SLOTS • SECURE YOUR SEAT • ";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#050505] pt-24 pb-2">
      
      {/* 1. SUNTIK ANIMASI REVISI */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-jalan {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-gerak {
          display: flex;
          width: max-content;
          animation: marquee-jalan 25s linear infinite;
        }
        @keyframes reveal-up {
          0% { opacity: 0; transform: translateY(40px); filter: blur(12px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .reveal-up {
          animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* 2. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* 3. MAIN CONTENT - Dikasih margin bottom agar tidak tabrak pita bawah */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center mb-8">
        
        {/* Badge */}
        <div className="reveal-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 mb-4">
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">Premium Access v2.0</span>
        </div>

        {/* Title - Gede & Gahar */}
        <h1 className="reveal-up opacity-0 [animation-delay:200ms] text-6xl md:text-[9.5rem] font-black italic uppercase leading-[0.8] tracking-tighter mb-10 text-white">
          CHASE THE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
            MOMENT.
          </span>
        </h1>

        {/* Search & CTA Container */}
        <div className="reveal-up opacity-0 [animation-delay:400ms] w-full max-w-xl space-y-10">
          
          {/* SEARCH BAR REVISI - Tombol Dikecilkan (px-6 py-2) */}
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
            <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 pr-2 shadow-2xl">
              <div className="p-3 text-slate-500"><Search size={20} /></div>
              <input
                name="q"
                type="text"
                placeholder="Find your tribe..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white font-bold italic placeholder:text-slate-800 uppercase text-[10px] tracking-widest outline-none"
              />
              <button type="submit" className="bg-white text-black px-6 py-2 rounded-xl font-black italic uppercase text-[9px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-lg active:scale-95">
                Search
              </button>
            </div>
          </form>

          {/* Tombol Utama */}
          <Link 
            href="/login" 
            className="group inline-flex items-center gap-6 px-14 py-5 bg-white text-black rounded-full font-black italic uppercase text-[11px] tracking-[0.3em] transition-all hover:bg-cyan-600 hover:text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-95"
          >
            Get Tickets Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* 4. RUNNING TEXT (Pita Biru Bawah) */}
      <div className="mt-auto w-full relative">
        <div className="w-[120%] -rotate-[1.5deg] -translate-x-[5%] bg-cyan-600 py-5 shadow-[0_0_60px_rgba(6,182,212,0.4)] relative z-10 overflow-hidden border-y border-white/20">
          <div className="marquee-gerak flex whitespace-nowrap">
            <span className="text-xs font-black italic uppercase tracking-[0.5em] text-white px-10">
              {textMarquee} {textMarquee}
            </span>
            <span className="text-xs font-black italic uppercase tracking-[0.5em] text-white px-10">
              {textMarquee} {textMarquee}
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}