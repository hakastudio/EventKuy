"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  ArrowLeft, 
  MapPin, 
  Download, 
  Share2, 
  Loader2 
} from "lucide-react";
import jsPDF from "jspdf";

export default function TicketDetailPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTicketDetail() {
      const { data } = await supabase
        .from("transactions")
        .select(`*, events (*)`)
        .eq("order_id", id)
        .single();

      if (data) setTicket(data);
      setLoading(false);
    }
    fetchTicketDetail();
  }, [id, supabase]);

  // JURUS PAMUNGKAS: DOWNLOAD PAKAI PDF GENERATOR MURNI (GAK PAKE CANVAS)
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a5"
      });

      // Styling Dasar
      doc.setFillColor(15, 23, 42); // Warna Slate-900
      doc.rect(0, 0, 148, 210, "F");

      // Judul Event
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text(ticket.events?.title.toUpperCase(), 15, 30);

      // Label Transaction ID
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("TRANSACTION ID", 15, 45);
      doc.setTextColor(6, 182, 212); // Cyan
      doc.setFontSize(12);
      doc.text(ticket.order_id, 15, 52);

      // QR CODE (Kita ambil dari API QR)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.order_id}`;
      const img = new Image();
      img.src = qrUrl;
      img.crossOrigin = "Anonymous";
      
      img.onload = function() {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(34, 65, 80, 80, 10, 10, "F");
        doc.addImage(img, "PNG", 39, 70, 70, 70);

        // Detail Bawah
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(8);
        doc.text("CATEGORY", 15, 165);
        doc.text("DATE", 80, 165);
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.text(`${ticket.tier_name} x${ticket.quantity}`, 15, 172);
        doc.text(new Date(ticket.events?.date).toLocaleDateString('id-ID'), 80, 172);

        doc.setTextColor(100, 116, 139);
        doc.text("LOCATION", 15, 185);
        doc.setTextColor(255, 255, 255);
        doc.text(ticket.events?.location, 15, 192);

        doc.save(`Ticket-${ticket.order_id}.pdf`);
        setDownloading(false);
      };

    } catch (error) {
      console.error(error);
      alert("Gagal membuat PDF. Gunakan screenshot saja dulu Bos!");
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-cyan-500" size={40} />
      <p className="text-cyan-500 font-black italic tracking-widest uppercase text-[10px]">Processing...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto space-y-8">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all group">
          <ArrowLeft size={14} /> Back
        </button>

        <div className="relative bg-[#0f172a] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
          <div className="h-48 relative">
            <img src={ticket.events?.image_url} className="w-full h-full object-cover opacity-40" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
            <div className="absolute bottom-6 left-8 text-left">
               <h2 className="text-4xl font-black italic uppercase leading-none tracking-tighter text-white">{ticket.events?.title}</h2>
            </div>
          </div>

          <div className="p-10 flex flex-col items-center gap-8 relative z-10">
            <div className="p-2 bg-white rounded-[2.5rem] shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${ticket.order_id}&color=0f172a`} 
                className="w-52 h-52 rounded-2xl" 
                alt="QR" 
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Transaction ID</p>
              <p className="text-2xl font-black italic text-cyan-400 uppercase tracking-tighter">{ticket.order_id}</p>
            </div>
          </div>

          <div className="p-10 grid grid-cols-2 gap-8 border-t border-white/5 bg-white/[0.01]">
            <div className="space-y-1 text-left">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Category</p>
              <p className="text-sm font-black uppercase text-white">{ticket.tier_name} x{ticket.quantity}</p>
            </div>
            <div className="space-y-1 text-left col-span-2">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Location</p>
              <p className="text-sm font-black uppercase text-white">{ticket.events?.location}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
              <Share2 size={16} className="text-cyan-500" /> Share
           </button>
           <button 
             onClick={handleDownload}
             disabled={downloading}
             className="flex items-center justify-center gap-3 bg-cyan-600 p-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/40 text-white disabled:opacity-50"
           >
              {downloading ? <Loader2 className="animate-spin" size={16} /> : <><Download size={16} /> Download PDF</>}
           </button>
        </div>
      </div>
    </div>
  );
}