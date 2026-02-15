import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={event.image_url || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-blue shadow-sm">
          Available
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <Calendar size={14} className="text-brand-blue" />
            <span>{new Date(event.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <MapPin size={14} className="text-brand-blue" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mulai Dari</p>
                <p className="text-brand-blue font-black text-lg">
                  IDR {event.price?.toLocaleString("id-ID") || "0"}
                </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center group-hover:bg-brand-blue transition-all">
                <span className="text-brand-blue group-hover:text-white transition-colors">➜</span>
            </div>
        </div>
      </div>
    </Link>
  );
}