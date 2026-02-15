import Image from "next/image";
import Link from "next/link"; 
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "Segera";
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

export default function EventCard({ event }: { event: any }) {
  const title = event.title || event.name || "Nama Event";
  const price = event.price || 0;
  const date = event.date || event.event_date || new Date().toISOString();
  const location = event.location || "Online";
  const imageUrl = event.image_url || event.image || "https://placehold.co/600x400"; 

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Gambar */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
          {price === 0 ? "GRATIS" : formatRupiah(price)}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2"><Calendar size={16} /> <span>{formatDate(date)}</span></div>
            <div className="flex items-center gap-2"><MapPin size={16} /> <span className="line-clamp-1">{location}</span></div>
          </div>
        </div>

        {/* TOMBOL LINK (SUDAH DIPERBAIKI) */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            // PERBAIKAN DI SINI BOS: Pakai 'events' (plural) sesuai folder Bos
            href={`/events/${event.id}`} 
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            Lihat Detail <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}