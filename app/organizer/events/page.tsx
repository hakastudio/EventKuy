"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Plus, Calendar, MapPin, MoreVertical, Ticket, Search } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Ambil data event milik user yang sedang login
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq('user_id', user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setEvents(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">EVENT SAYA.</h1>
          <p className="text-gray-500 mt-1">Kelola semua event yang telah Anda publikasikan.</p>
        </div>
        
        <Link 
          href="/organizer/events/create"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus size={20} /> BUAT EVENT BARU
        </Link>
      </div>

      {/* Stats Mini */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111318] p-4 rounded-2xl border border-white/5">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Total Event</p>
          <p className="text-2xl font-black mt-1">{events.length}</p>
        </div>
      </div>

      {/* List Events */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-[#111318] border border-white/10 p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6 hover:border-blue-500/50 transition-all group"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-white/5 shrink-0">
                {event.image_url ? (
                  <img src={event.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold">NO IMAGE</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold tracking-tight">{event.title}</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-blue-500" />
                    {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-blue-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-white">
                    <Ticket size={14} className="text-emerald-500" />
                    {event.tickets?.length || 0} Jenis Tiket
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all">
                  Edit
                </button>
                <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111318] rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500">Belum ada event yang dibuat.</p>
          <Link href="/organizer/events/create" className="text-blue-500 font-bold mt-2 inline-block">Mulai buat sekarang →</Link>
        </div>
      )}
    </div>
  );
}