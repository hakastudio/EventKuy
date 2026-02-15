"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Loader2 
} from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // 1. Ambil User Login
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Ambil data transaksi & detail event
        const { data, error } = await supabase
          .from("transactions")
          .select(`
            *,
            events (
              title,
              image_url,
              date,
              location
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Database Error:", error.message);
        } else {
          setTickets(data || []);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-cyan-500" size={40} />
      <p className="text-cyan-500 font-black italic tracking-widest uppercase text-[10px]">Syncing Your Collection...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER */}
        <header className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
            <ArrowLeft size={14} /> Back to Discover
          </Link>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
            MY<br /><span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">TICKETS.</span>
          </h1>
        </header>

        <div className="grid gap-6">
          {tickets.length === 0 ? (
            <div className="p-24 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] bg-white/[0.02] flex flex-col items-center gap-4">
              <Ticket className="text-slate-800" size={48} />
              <p className="text-slate-500 font-black uppercase italic tracking-widest text-xs">No tickets found in your collection.</p>
              <Link href="/" className="bg-cyan-600 px-8 py-4 rounded-2xl font-black uppercase italic text-[10px] tracking-widest hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/40">Find Events</Link>
            </div>
          ) : (
            tickets.map((t, i) => {
              // LOGIKA ANTI-TYPO: Cek status tanpa peduli huruf besar/kecil & spasi
              const isSuccess = t.status?.toLowerCase().trim() === 'success';

              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex flex-col md:flex-row gap-8 items-center hover:bg-white/[0.08] transition-all group overflow-hidden relative">
                  
                  {/* Image Section */}
                  <div className="shrink-0 relative">
                    <img 
                      src={t.events?.image_url || 'https://via.placeholder.com/300x400'} 
                      className="w-28 h-40 object-cover rounded-3xl border border-white/10 group-hover:scale-105 transition-transform duration-500" 
                      alt="" 
                    />
                    {/* Centang Hijau Muncul Jika Success */}
                    {isSuccess && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 p-1.5 rounded-full shadow-lg shadow-emerald-500/50">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-left space-y-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      isSuccess 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/20'
                    }`}>
                      {isSuccess ? <CheckCircle2 size={12}/> : <Clock size={12}/>} 
                      {t.status}
                    </div>
                    
                    <h3 className="text-3xl font-black italic uppercase leading-none tracking-tight group-hover:text-cyan-400 transition-colors">
                      {t.events?.title || 'Event Unknown'}
                    </h3>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Ticket size={14} className="text-cyan-500"/> {t.tier_name} x{t.quantity}</span>
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-cyan-500"/> {t.events?.date ? new Date(t.events.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</span>
                    </div>
                  </div>

                  {/* Button Section */}
                  {isSuccess ? (
                    <Link 
                      href={`/user/tickets/${t.order_id}`} 
                      className="bg-cyan-600 p-5 rounded-2xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/40 active:scale-95 group/btn"
                    >
                      <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform text-white" />
                    </Link>
                  ) : (
                    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl text-slate-700 cursor-not-allowed">
                      <ChevronRight size={24} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}