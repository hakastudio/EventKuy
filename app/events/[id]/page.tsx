import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Share2, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();

  // Ambil detail event (pastikan await params)
  const eventId = (await params).id;
  
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO IMAGE SECTION */}
      <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden mt-20">
         {/* Background Blur */}
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
        
        {/* KOLOM KIRI: INFO EVENT */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Header Title */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                 <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                       Music Concert
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
              <div className="prose prose-blue text-gray-600 leading-relaxed">
                 <p>{event.description || "Tidak ada deskripsi untuk event ini."}</p>
                 <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              </div>
           </div>

           {/* Location */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-blue pl-3">Lokasi</h3>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-50 rounded-lg text-brand-blue">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">{event.location}</h4>
                    <p className="text-gray-500 text-sm mt-1">Stadion Utama Gelora Bung Karno, Jakarta Pusat</p>
                    <a href="#" className="inline-block mt-3 text-sm font-bold text-brand-blue hover:underline">Lihat di Google Maps</a>
                 </div>
              </div>
           </div>
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

                 <Link 
                    href={`/checkout/${event.id}`}
                    className="block w-full py-4 bg-brand-blue text-white font-bold text-center rounded-xl hover:bg-brand-dark hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1 transition-all"
                 >
                    Beli Tiket Sekarang
                 </Link>
                 <p className="text-center text-xs text-gray-400 mt-4">Pajak sudah termasuk dalam harga tiket.</p>
              </div>

              {/* Organizer Info */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
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