import { createClient } from "@/utils/supabase/server";
import { User, Trash2, Shield, Search, Mail } from "lucide-react";
import Link from "next/link";

export default async function AdminUsers() {
  const supabase = await createClient();

  // Ambil data unik user dari tabel tickets (trik cerdas biar tau siapa user aktif)
  // Karena kita belum punya tabel 'profiles' khusus.
  const { data: activeUsers } = await supabase
    .from("tickets")
    .select("user_id, customer_name, created_at")
    .order("created_at", { ascending: false });

  // Filter biar unik (karena 1 user bisa beli banyak tiket)
  // @ts-ignore
  const uniqueUsers = Array.from(new Map(activeUsers?.map(item => [item.user_id, item])).values());

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-black text-gray-900">Kelola Pengguna</h1>
           <p className="text-gray-500">Daftar user yang pernah bertransaksi di EventKuy.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
           <Search size={18} className="text-gray-400" />
           <input type="text" placeholder="Cari user..." className="outline-none text-sm bg-transparent" />
        </div>
      </div>

      {/* Tabel User */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">User ID</th>
                    <th className="px-6 py-4">Terakhir Aktif</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                
                {/* Data Real dari Transaksi */}
                {uniqueUsers.map((u: any, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center font-bold">
                                    {u.customer_name ? u.customer_name[0] : "U"}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{u.customer_name || "Guest User"}</p>
                                    <p className="text-xs text-gray-400">User Aktif</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">{u.user_id.slice(0,8)}...</td>
                        <td className="px-6 py-4">{new Date(u.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Member</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                             <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all" title="Hapus User">
                                <Trash2 size={18} />
                             </button>
                        </td>
                    </tr>
                ))}

                {/* Dummy Data Tambahan (Biar tabel gak kosong kalau belum ada transaksi) */}
                {[1, 2, 3].map((i) => (
                     <tr key={`dummy-${i}`} className="hover:bg-gray-50 transition-colors opacity-60">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">User Demo {i}</p>
                                    <p className="text-xs text-gray-400">demo{i}@example.com</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">user-demo-{i}</td>
                        <td className="px-6 py-4">Baru saja</td>
                        <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">Guest</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                             <button className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
      </div>
    </div>
  );
}