"use client";

import { useState } from "react";
import { Download, Search, Filter, Calendar } from "lucide-react";

// Kita definisikan bentuk datanya (Interface)
interface TicketData {
  id: string;
  created_at: string;
  ticket_tier: string;
  customer_name: string;
  price_paid: number;
  status: string;
  events: {
    title: string;
  };
}

export default function ReportsTable({ tickets }: { tickets: TicketData[] }) {
  const [filterEvent, setFilterEvent] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Ambil List Event Unik untuk Dropdown Filter
  // (Menggunakan Set biar gak ada nama event dobel)
  const uniqueEvents = Array.from(new Set(tickets.map(t => t.events?.title || "Unknown Event")));

  // 2. Logic Filter Data (Gabungan Search + Dropdown)
  const filteredData = tickets.filter((t) => {
    const eventName = t.events?.title || "Unknown Event";
    const matchEvent = filterEvent === "All" || eventName === filterEvent;
    
    // Search bisa cari Nama Pembeli ATAU ID Tiket
    const buyerName = t.customer_name ? t.customer_name.toLowerCase() : "";
    const ticketId = t.id.toString();
    const term = searchTerm.toLowerCase();
    
    const matchSearch = buyerName.includes(term) || ticketId.includes(term);

    return matchEvent && matchSearch;
  });

  // 3. Logic Download CSV (Excel)
  const downloadCSV = () => {
    const headers = ["Ticket ID, Event Name, Buyer Name, Ticket Tier, Purchase Date, Price (IDR), Status"];
    
    const rows = filteredData.map(t => 
      `${t.id},"${t.events?.title || 'Unknown'}","${t.customer_name || 'Guest'}","${t.ticket_tier || 'Regular'}",${new Date(t.created_at).toLocaleDateString()},${t.price_paid || 0},${t.status}`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Penjualan_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Hitung Total Omzet dari data yang sedang tampil
  const totalRevenue = filteredData.reduce((acc, curr) => acc + (curr.price_paid || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* --- FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Input Search */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari nama pembeli..." 
                  className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-brand-blue outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Dropdown Event */}
            <div className="relative w-full md:w-auto">
                <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <select 
                  className="pl-10 pr-8 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-brand-blue outline-none appearance-none cursor-pointer"
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                >
                  <option value="All">Semua Event</option>
                  {uniqueEvents.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
            </div>
         </div>

         {/* Tombol Download */}
         <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95"
         >
            <Download size={18} /> Export Excel/CSV
         </button>
      </div>

      {/* --- SUMMARY KECIL --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 text-brand-blue px-4 py-3 rounded-lg border border-blue-100">
             <p className="text-xs text-blue-400 font-bold uppercase">Total Tiket</p>
             <p className="text-lg font-black">{filteredData.length}</p>
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-100">
             <p className="text-xs text-green-600 font-bold uppercase">Total Omzet</p>
             <p className="text-lg font-black">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">#{t.id}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{t.events?.title || "Unknown"}</td>
                    <td className="px-6 py-4">{t.customer_name || "Guest User"}</td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-bold text-gray-600">
                            {t.ticket_tier || "Regular"}
                        </span>
                    </td>
                    <td className="px-6 py-4">{new Date(t.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="px-6 py-4 font-mono">Rp {t.price_paid?.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <Calendar size={32} className="opacity-20" />
                            <p>Tidak ada data penjualan yang cocok.</p>
                        </div>
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