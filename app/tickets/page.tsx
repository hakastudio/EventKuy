"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMyTickets() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return router.push("/login");
      }

      // Ambil data transaksi sukses milik user ini
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          events ( title, location, date )
        `)
        .eq("user_id", user.id)
        .eq("status", "success");

      if (data) setTickets(data);
      setLoading(false);
    }

    fetchMyTickets();
  }, [router]);

  if (loading) return <div className="p-20 text-center animate-pulse font-black uppercase">Memuat Tiket...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-10 tracking-tighter">Dompet Tiket.</h1>
      
      {tickets.length === 0 ? (
        <div className="bg-slate-50 p-20 rounded-[40px] text-center border-4 border-dashed border-slate-200">
           <p className="font-black text-slate-400 uppercase text-xs tracking-[0.3em]">Belum Ada Tiket Aktif</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white border-4 border-slate-900 p-8 rounded-[40px] flex justify-between items-center shadow-[15px_15px_0px_rgba(0,0,0,0.05)]">
              <div>
                <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic mb-4 inline-block">Confirmed</span>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{ticket.events?.title}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{ticket.tier_name} • {ticket.quantity} Tiket</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Order ID</p>
                <p className="font-mono text-[10px] font-bold">{ticket.midtrans_id?.substring(0, 12)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}