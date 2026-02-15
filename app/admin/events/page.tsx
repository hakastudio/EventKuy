import { createClient } from "@/utils/supabase/server";
import { Trash2, Eye, MapPin, Calendar, MoreVertical } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminEvents() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");

  // Server Action: Hapus Event (POWER ADMIN)
  async function deleteEvent(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = formData.get("id");
    
    // Hapus event dari database (admin power)
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) console.log(error);
    
    // Refresh halaman otomatis via Next.js server action behavior
    redirect("/admin/events");
  }

  const { data: events } = await supabase.from("events").select("*").order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-black text-gray-900">Semua Event</h1>
           <p className="text-gray-500">Pantau dan moderasi event yang tayang di platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                  <div className="h-40 bg-gray-200 relative">
                      <img src={event.image_url} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                          Rp {event.price?.toLocaleString()}
                      </div>
                  </div>
                  <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              {event.location}
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                          {/* Tombol Lihat */}
                          <Link href={`/events/${event.id}`} target="_blank" className="flex-1 py-2 text-center text-brand-blue font-bold text-sm bg-blue-50 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                              <Eye size={16} className="inline mr-1" /> Lihat
                          </Link>
                          
                          {/* Tombol Hapus (Form Server Action) */}
                          <form action={deleteEvent}>
                              <input type="hidden" name="id" value={event.id} />
                              <button type="submit" className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all" title="Hapus Paksa">
                                  <Trash2 size={18} />
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}