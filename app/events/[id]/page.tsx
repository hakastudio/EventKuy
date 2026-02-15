import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton"; 
import { Calendar, MapPin, Clock, Share2, ShieldCheck, Ticket, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const eventId = (await params).id;
  
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (!event) return notFound();

  // Link Maps Otomatis
  const mapQuery = encodeURIComponent(event.location || "Jakarta");
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden mt-16">
         <div className="absolute inset-0 bg-cover bg-center blur-xl opacity-50"
            style={{ backgroundImage: `url(${event.image_url})` }}></div>
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center relative z-10 pt-10">
            <img src={event.image_url} alt={event.title} className="h-full w-auto max-w-full object-contain rounded-t-xl shadow-2xl"/>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Kiri: Info & Maps */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <span className="inline-block px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                 {event.category || "Event Seru"}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm font-medium">
                 <div className="flex items-center gap-2"><Calendar size={18} className="text-brand-blue" /><span>{new Date(event.date).toLocaleDateString("id-ID")}</span></div>
                 <div className="flex items-center gap-2"><Clock size={18} className="text-brand-blue" /><span>19:00 WIB</span></div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-brand-blue pl-3">Deskripsi</h3>
              <div className="prose prose-blue text-gray-600 leading-relaxed whitespace-pre-line">
                 <p>{event.description || "Tidak ada deskripsi detail."}</p>
              </div>
           </div>

           {/* MAPS AKTIF */}
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-gray-900 border-l-4 border-brand-blue pl-3">Lokasi</h3>
                 <a href={mapLinkUrl} target="_blank" className="flex items-center gap-1 text-sm font-bold text-brand-blue hover:underline">
                    Buka Google Maps <ExternalLink size={14} />
                 </a>
              </div>
              <div className="w-full h-72 bg-gray-200 rounded-xl overflow-hidden shadow-inner border border-gray-200 mb-5">
                 <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={mapEmbedUrl} title="Lokasi"></iframe>
              </div>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-50 rounded-lg text-brand-blue"><MapPin size={24} /></div>
                 <div><h4 className="font-bold text-gray-900 text-lg">{event.location}</h4></div>
              </div>
           </div>
        </div>

        {/* Kanan: Tombol Beli */}
        <div className="lg:col-span-1">
           <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Harga Tiket</p>
              <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-sm font-bold text-brand-blue">Rp</span>
                 <span className="text-4xl font-black text-gray-900">{event.price?.toLocaleString("id-ID") || "0"}</span>
              </div>
              
              {/* TOMBOL SAKTI MIDTRANS */}
              <div className="w-full">
                 <CheckoutButton 
                    eventId={event.id}
                    eventName={event.title}
                    price={event.price}
                    userEmail="tamu@eventkuy.web.id"
                    userName="Tamu Terhormat"
                 />
              </div>

              <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"><ShieldCheck size={18} className="text-green-500" /><span>Transaksi Aman 100%</span></div>
                 <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"><Ticket size={18} className="text-brand-blue" /><span>Tiket Masuk Email</span></div>
              </div>
           </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}