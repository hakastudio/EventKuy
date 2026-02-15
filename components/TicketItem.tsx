"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, X } from "lucide-react";
import QRCode from "react-qr-code"; // <--- Alat baru kita

// Kita definisikan bentuk datanya biar TypeScript gak rewel
interface TicketItemProps {
  ticket: any;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const [showQRModal, setShowQRModal] = useState(false);

  // Data unik yang akan jadi isi QR Code (Gabungan ID Tiket & User biar aman)
  // Nanti petugas scan ini untuk verifikasi di database
  const qrData = `EVENTKUY-TKT-${ticket.id}-USR-${ticket.user_id}`;

  return (
    <>
      {/* === CARD TIKET UTAMA === */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow group">
        
        {/* BAGIAN KIRI: GAMBAR EVENT */}
        <div className="md:w-48 h-40 md:h-auto bg-gray-200 relative">
           <img 
             src={ticket.events?.image_url} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             alt={ticket.events?.title} 
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
           <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
              Lunas / Paid
           </div>
        </div>

        {/* BAGIAN TENGAH: INFO DETAIL */}
        <div className="flex-1 p-6 flex flex-col justify-center relative border-b md:border-b-0 md:border-r border-dashed border-gray-300">
            {/* Hiasan Bulatan Sobekan */}
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 rounded-full md:hidden"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-50 rounded-full hidden md:block"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 rounded-full hidden md:block"></div>

            <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-1">{ticket.events?.title}</h3>
            
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={16} className="text-brand-blue" />
                    <span className="font-medium">
                      {new Date(ticket.events?.date).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={16} className="text-brand-blue" />
                    <span className="font-medium">19:00 WIB - Selesai</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} className="text-brand-blue" />
                    <span className="line-clamp-1 font-medium">{ticket.events?.location}</span>
                </div>
            </div>
        </div>

        {/* BAGIAN KANAN: TOMBOL QR CODE (BISA DIKLIK!) */}
        <div className="md:w-64 p-6 bg-blue-50/50 flex flex-col items-center justify-center gap-3 text-center relative">
            <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider animate-pulse absolute top-3">Klik untuk Scan</p>
            
            {/* TOMBOL QR */}
            <button 
              onClick={() => setShowQRModal(true)}
              className="bg-white p-3 rounded-xl shadow-sm border-2 border-brand-blue/20 hover:border-brand-blue cursor-pointer hover:scale-105 transition-all"
            >
              {/* Ini QR Code Beneran, bukan ikon */}
              <QRCode
                size={80}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrData}
                viewBox={`0 0 256 256`}
              />
            </button>
            
            <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                <p className="font-mono text-sm font-bold text-gray-600 bg-gray-200/50 px-3 py-1 rounded truncate max-w-[150px] mx-auto">
                  #{ticket.id}
                </p>
            </div>
        </div>
      </div>

      {/* === MODAL POP-UP QR CODE (Muncul pas diklik) === */}
      {showQRModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm transition-all"
          onClick={() => setShowQRModal(false)} // Klik luar nutup modal
        >
          {/* Kotak Modal */}
          <div 
            className="bg-white p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} // Klik dalam gak nutup modal
          >
            <button onClick={() => setShowQRModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-gray-900 mb-2">Scan E-Ticket</h3>
            <p className="text-gray-500 text-sm mb-6">Tunjukkan QR Code ini kepada petugas di pintu masuk venue.</p>
            
            {/* QR Code GEDE */}
            <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-brand-blue inline-block shadow-sm mb-6">
              <QRCode
                size={220}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrData}
                viewBox={`0 0 256 256`}
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-xl">
              <p className="text-xs text-brand-blue font-bold">{ticket.events?.title}</p>
              <p className="font-mono text-xs text-gray-500 mt-1">ID: {ticket.id}</p>
            </div>
            
            <button onClick={() => setShowQRModal(false)} className="mt-6 py-3 w-full bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark transition-all">
                Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}