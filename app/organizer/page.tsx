import { createClient } from "@/utils/supabase/server";
import { DollarSign, Ticket, Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrganizerDashboard() {
  const supabase = await createClient();

  // 1. Cek User Login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Ambil DATA EVENT (Milik User / Semua)
  // Kita urutkan dari yang terbaru
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  // 3. Ambil DATA TIKET (Untuk Hitung Duit)
  const { data: tickets } = await supabase
    .from("tickets")
    .select("price_paid, status");

  // --- LOGIC HITUNG-HITUNGAN (KALKULATOR) ---
  
  // A. Total Pendapatan (Sum price_paid dari semua tiket)
  const totalRevenue = tickets?.reduce((acc, curr) => acc + (curr.price_paid || 0), 0) || 0;

  // B. Total Tiket Terjual
  const totalTickets = tickets?.length || 0;

  // C. Total Event Aktif
  const activeEventsCount = events?.length || 0;

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-black text-gray-900">Dashboard Organizer</h1>
            <p className="text-gray-500 mt-1">Pantau performa penjualan tiketmu secara real-time.</p>
        </div>
        <Link href="/organizer/create" className="px-6 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand-blue/20 flex items-center gap-2 transition-all">
            <Calendar size={18} />
            + Buat Event Baru
        </Link>
      </div>

      {/* STATS CARDS (DATA REAL) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Pendapatan */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <DollarSign size={100} className="text-green-600" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                      <DollarSign size={24} />
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUpRight size={12} /> Realtime
                  </span>
              </div>
              <p className="text-gray-500 text-sm font-medium relative z-10">Total Pendapatan</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1 relative z-10">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </h3>
          </div>

          {/* Card 2: Tiket Terjual */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Ticket size={100} className="text-brand-blue" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-3 bg-blue-50 text-brand-blue rounded-xl">
                      <Ticket size={24} />
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      Terjual
                  </span>
              </div>
              <p className="text-gray-500 text-sm font-medium relative z-10">Tiket Terjual</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1 relative z-10">
                {totalTickets.toLocaleString("id-ID")} <span className="text-sm text-gray-400 font-medium">tiket</span>
              </h3>
          </div>

          {/* Card 3: Event Aktif */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calendar size={100} className="text-purple-600" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <Calendar size={24} />
                  </div>
              </div>
              <p className="text-gray-500 text-sm font-medium relative z-10">Event Dibuat</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1 relative z-10">
                {activeEventsCount} <span className="text-sm text-gray-400 font-medium">event</span>
              </h3>
          </div>
      </div>

      {/* TABEL EVENT AKTIF */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Daftar Event</h3>
              <Link href="/organizer/create" className="text-sm font-bold text-brand-blue hover:underline">
                + Tambah
              </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Nama Event</th>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Lokasi</th>
                        <th className="px-6 py-4">Harga Mulai</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    
                    {events?.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                <img 
                                  src={event.image_url} 
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-200"
                                  alt=""
                                />
                                <span className="line-clamp-1">{event.title}</span>
                            </td>
                            <td className="px-6 py-4">
                              {new Date(event.date).toLocaleDateString("id-ID")}
                            </td>
                            <td className="px-6 py-4 line-clamp-1">{event.location}</td>
                            <td className="px-6 py-4 font-mono text-xs">
                              Rp {event.price?.toLocaleString("id-ID")}
                            </td>
                            <td className="px-6 py-4 text-right">
                                {/* TOMBOL EDIT AKTIF */}
                                <Link 
                                  href={`/organizer/edit/${event.id}`} 
                                  className="inline-flex items-center gap-1 text-brand-blue font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                                >
                                  Edit <ArrowRight size={14} />
                                </Link>
                            </td>
                        </tr>
                    ))}

                    {/* State Kosong */}
                    {!events?.length && (
                         <tr>
                            <td colSpan={5} className="text-center py-10 text-gray-400">
                                Belum ada event. Yuk buat event pertamamu!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
      </div>

    </div>
  );
}