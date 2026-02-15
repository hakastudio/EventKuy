import { createClient } from "@/utils/supabase/server";
import { DollarSign, Ticket, Users, Calendar, ArrowUpRight, Shield, TrendingUp, Bell } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Cek User (Harus Login)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. AMBIL SEMUA DATA (God Mode)
  // Ambil data global, bukan cuma punya user ini aja.
  const { data: allEvents } = await supabase.from("events").select("*").order("created_at", { ascending: false }).limit(5);
  const { data: allTickets } = await supabase.from("tickets").select("price_paid");
  
  // Dummy Data User (Karena tabel users ada di auth schema, susah diambil langsung dari client biasa)
  // Kita simulasi angka user dulu
  const totalUsers = 1540; 

  // Hitung Duit Global
  const totalRevenue = allTickets?.reduce((acc, curr) => acc + (curr.price_paid || 0), 0) || 0;
  const totalTicketsSold = allTickets?.length || 0;

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 text-white">
        <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Selamat Datang, Bos! 👋</h1>
            <p className="text-blue-200 font-medium">Inilah Singgahsana-mu. Pantau semua aktivitas EventKuy dari sini.</p>
        </div>
        <div className="flex gap-3">
            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1e293b]"></span>
            </button>
            <button className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-brand-blue/30 hover:bg-brand-dark transition-all flex items-center gap-2">
                <Shield size={18} />
                System Status: Aman
            </button>
        </div>
      </div>

      {/* STATS CARDS (GRID 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: Revenue */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <DollarSign size={24} />
                </div>
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} /> +24%
                </span>
             </div>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Pendapatan</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">Rp {totalRevenue.toLocaleString("id-ID")}</h3>
          </div>

          {/* Card 2: Tickets */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-brand-blue rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Ticket size={24} />
                </div>
             </div>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tiket Terjual</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">{totalTicketsSold.toLocaleString("id-ID")}</h3>
          </div>

          {/* Card 3: Events */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Calendar size={24} />
                </div>
             </div>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Event Aktif</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">{allEvents?.length || 0}</h3>
          </div>

          {/* Card 4: Users */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Users size={24} />
                </div>
             </div>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total User</p>
             <h3 className="text-2xl font-black text-gray-900 mt-1">{totalUsers.toLocaleString("id-ID")}</h3>
          </div>

      </div>

      {/* SECTION BAWAH: TABEL & CHART AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TABEL EVENT TERBARU (Kiri - Lebar) */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">Event Terbaru Masuk</h3>
                  <button className="text-brand-blue text-sm font-bold hover:underline">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Event</th>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Harga</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {allEvents?.map((evt) => (
                            <tr key={evt.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-200 overflow-hidden">
                                        <img src={evt.image_url} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="line-clamp-1 max-w-[150px]">{evt.title}</span>
                                </td>
                                <td className="px-6 py-4">{new Date(evt.date).toLocaleDateString("id-ID")}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">LIVE</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono">Rp {evt.price?.toLocaleString("id-ID")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
          </div>

          {/* SIDE PANEL (Kanan - Sempit) */}
          <div className="space-y-6">
              {/* Box Quick Action */}
              <div className="bg-brand-blue rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-blue/30">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <h3 className="text-xl font-black mb-2 relative z-10">Butuh Event Baru?</h3>
                  <p className="text-blue-100 text-sm mb-6 relative z-10">Tambahkan event spesial langsung dari dashboard admin.</p>
                  <Link href="/organizer/create" className="block w-full py-3 bg-white text-brand-blue font-bold text-center rounded-xl hover:bg-blue-50 transition-all relative z-10">
                    + Buat Event
                  </Link>
              </div>

              {/* Box Log Aktivitas */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Aktivitas Baru</h3>
                  <div className="space-y-4">
                      {[1,2,3].map((_, i) => (
                          <div key={i} className="flex gap-3">
                              <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <div>
                                  <p className="text-xs font-bold text-gray-800">Tiket #ORDER-29{i} terjual.</p>
                                  <p className="text-[10px] text-gray-400">2 menit yang lalu</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

      </div>

    </div>
  );
}