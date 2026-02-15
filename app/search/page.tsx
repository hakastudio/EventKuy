import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Search, Frown } from "lucide-react";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const supabase = await createClient();
  const { q: query = "" } = await searchParams;

  // Logic Cari di Database (Judul ATAU Lokasi)
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .or(`title.ilike.%${query}%,location.ilike.%${query}%`) // Case insensitive search
    .order("date", { ascending: true });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        {/* Header Hasil */}
        <div className="mb-8">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Hasil Pencarian</p>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
               <span className="bg-blue-100 text-brand-blue p-2 rounded-lg"><Search size={28}/></span> 
               "{query}"
            </h1>
            <p className="text-gray-500 mt-2">Ditemukan {events?.length || 0} event yang cocok.</p>
        </div>

        {/* Grid Hasil */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          // Tampilan Kalau Gak Ketemu
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Frown size={32} className="text-gray-400" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Yah, nggak ketemu...</h3>
             <p className="text-gray-500 max-w-md mx-auto mb-8">
               Coba cari dengan kata kunci lain, misalnya "Konser", "Jakarta", atau nama artis favoritmu.
             </p>
             <Link href="/" className="px-6 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-dark transition-all">
                Lihat Semua Event
             </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}