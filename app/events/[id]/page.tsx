import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton"; 
import { Calendar, MapPin, Clock, Share2, ShieldCheck, Ticket, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();

  // Ambil ID dari URL
  const eventId = (await params).id;
  
  // Ambil data event dari database
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  // Kalau event tidak ditemukan
  if (!event) return notFound();

  // Link Maps Aman (Encode biar spasi & simbol gak bikin error)
  const mapQuery = encodeURIComponent(event.location || "Indonesia");
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* === HERO IMAGE SECTION === */}
      <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden mt-16">
         {/* Background Blur Effect */}
         <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-50"
            style={{ backgroundImage: `url(${event.image_url})` }}
         ></div>
         <div className="absolute inset-0 bg-black/30"></div>
         
         {/* Main Image Container */}
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center relative z-10 pt-10">
            <img 
               src={event.image_url} 
               alt={event.title} 
               className="h-full w-auto max-w-full object-contain rounded-t-xl shadow-2xl"
            />
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* KOLOM KIRI: INFO EVENT & MAPS */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Header Title */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                 <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                       {event.category || "Event Seru"}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                       {event.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm font-medium">
                       <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-brand-blue" />
                          <span>{new Date(event.date).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Clock size={18} className="text-brand-blue" />
                          <span>19:00 WIB - Selesai</span>
                       </div>
                    </div>
                 </div>
                 <button className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-blue transition-all">
                    <Share2 size={20} />
                 </button>
              </div>
           </div>

           {/* Description */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-blue pl-3">Deskripsi Event</h3>
              <div className="prose prose-blue text-gray-600 leading-relaxed whitespace-pre-line">
                 <p>{event.description || "Tidak ada deskripsi detail untuk event ini."}</p>
              </div>
           </div>

           {/* --- BAGIAN MAPS AKTIF (UPDATED) --- */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-gray-900 border-l-4 border-brand-blue pl-3">Lokasi Event</h3>
                 <a 
                    href={mapLinkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-bold text-brand-blue hover:underline"
                 >
                    Buka di Google Maps <ExternalLink size={14} />
                 </a>
              </div>
              
              {/* IFRAME MAPS */}
              <div className="w-full h-72 bg-gray-200 rounded-xl overflow-hidden shadow-inner border border-gray-200 mb-5 relative group">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={mapEmbedUrl}
                    className="w-full h-full filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    title="Lokasi Event"
                 ></iframe>
                 {/* Overlay biar user tau bisa diklik */}
                 <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] text-gray-500 rounded shadow pointer-events-none">
                    EventKuy Maps
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-50 rounded-lg text-brand-blue mt-1">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">{event.location}</h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                       Silakan ikuti petunjuk peta di atas. Pastikan datang 30 menit sebelum acara dimulai untuk registrasi ulang.
                    </p>
                 </div>
              </div>
           </div>
           {/* ----------------------------------- */}

        </div>

        {/* KOLOM KANAN: CARD BELI (STICKY) */}
        <div className="lg:col-span-1">
           <div className="sticky top-28 space-y-4">
              
              {/* Card Harga */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Harga Tiket Mulai</p>
                 <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm font-bold text-brand-blue">Rp</span>
                    <span className="text-4xl font-black text-gray-900">
                       {event.price?.toLocaleString("id-ID") || "0"}
                    </span>
                 </div>

                 <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                       <ShieldCheck size={18} className="text-green-500" />
                       <span>Jaminan Transaksi Aman 100%</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                       <Ticket size={18} className="text-brand-blue" />
                       <span>Tiket Langsung Masuk Email</span>
                    </div>
                 </div>

                 {/* Tombol Bayar Midtrans */}
                 <div className="w-full">
                    <CheckoutButton 
                       eventId={event.id}
                       eventName={event.title}
                       price={event.price}
                       userEmail="tamu@eventkuy.com" // Placeholder (Nanti ganti session)
                       userName="Tamu Terhormat"
                    />
                 </div>

                 <p className="text-center text-xs text-gray-400 mt-4">Pajak sudah termasuk dalam harga tiket.</p>
              </div>

              {/* Organizer Info */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=Event+Kuy&background=random`} alt="Organizer" />
                 </div>
                 <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Diselenggarakan Oleh</p>
                    <p className="font-bold text-gray-900">EventKuy Official</p>
                 </div>
              </div>

           </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}