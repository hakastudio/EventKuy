import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutButton from "@/components/CheckoutButton"; 
import { Calendar, MapPin, Clock, ShieldCheck, Ticket, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import Script from "next/script"; // Import script agar Next.js tidak error

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const eventId = (await params).id;
  
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (!event) return notFound();

  const mapQuery = encodeURIComponent(event.location || "Jakarta");
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SCRIPT MIDTRANS (BIAR POPUP MUNCUL) */}
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="beforeInteractive"
      />

      <Navbar />

      <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden mt-16">
         <div className="absolute inset-0 bg-cover bg-center blur-xl opacity-50"
            style={{ backgroundImage: `url(${event.image_url})` }}></div>
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center relative z-10 pt-10">
            <img src={event.image_url} alt={event.title} className="h-full w-auto max-w-full object-contain rounded-t-xl shadow-2xl"/>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <span className="inline-block px-3 py-1 bg-blue-50 text-indigo-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                 {event.category || "Event Seru"}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm font-medium">
                 <div className="flex items-center gap-2"><Calendar size={18} className="text-indigo-600" /><span>{new Date(event.date).toLocaleDateString("id-ID")}</span></div>
                 <div className="flex items-center gap-2"><Clock size={18} className="text-indigo-600" /><span>19:00 WIB</span></div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-indigo-600 pl-3">Lokasi</h3>
              <div className="w-full h-72 bg-gray-200 rounded-xl overflow-hidden mb-5">
                 <iframe width="100%" height="100%" frameBorder="0" src={mapEmbedUrl}></iframe>
              </div>
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-50 rounded-lg text-indigo-600"><MapPin size={24} /></div>
                 <div><h4 className="font-bold text-gray-900 text-lg">{event.location}</h4></div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-1">
           <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">Harga Tiket</p>
              <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-sm font-bold text-indigo-600">Rp</span>
                 <span className="text-4xl font-black text-gray-900">{event.price?.toLocaleString("id-ID") || "0"}</span>
              </div>
              
              <CheckoutButton 
                eventId={event.id}
                eventName={event.title}
                price={event.price}
                userEmail="pelanggan@mail.com" // Nanti bisa ganti ke email user login
                userName="Customer EventKuy"
              />

              <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-600"><ShieldCheck size={18} className="text-green-500" /><span>Transaksi Aman via Midtrans</span></div>
                 <div className="flex items-center gap-3 text-sm text-gray-600"><Ticket size={18} className="text-indigo-600" /><span>E-Tiket Langsung Kirim Email</span></div>
              </div>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}