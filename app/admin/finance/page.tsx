import { createClient } from "@/utils/supabase/server";
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default async function AdminFinance() {
  const supabase = await createClient();
  const { data: tickets } = await supabase.from("tickets").select("price_paid, created_at, status").order("created_at", { ascending: false });

  const totalRevenue = tickets?.reduce((acc, curr) => acc + (curr.price_paid || 0), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Laporan Keuangan</h1>
        
        {/* Kartu Besar */}
        <div className="bg-gradient-to-r from-brand-blue to-blue-900 rounded-3xl p-10 text-white shadow-xl shadow-brand-blue/20 mb-10 relative overflow-hidden">
             <div className="relative z-10">
                 <p className="text-blue-200 font-bold uppercase tracking-widest mb-2">Total Pendapatan Bersih</p>
                 <h2 className="text-5xl font-black">Rp {totalRevenue.toLocaleString("id-ID")}</h2>
                 <p className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
                    Update Realtime dari Database
                 </p>
             </div>
             <DollarSign size={200} className="absolute -bottom-10 -right-10 text-white/10" />
        </div>

        {/* Tabel Transaksi Terakhir */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Riwayat Transaksi Masuk</h3>
            </div>
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Metode</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Jumlah</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {tickets?.map((t, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{new Date(t.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                                <CreditCard size={14} /> QRIS
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">PAID</span>
                            </td>
                            <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                                + Rp {t.price_paid?.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}