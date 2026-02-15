import Link from "next/link";
import { LayoutDashboard, Users, Ticket, DollarSign, Settings, LogOut, ShieldCheck, Activity } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* SIDEBAR KHUSUS ADMIN (Singgahsana Style) */}
      <aside className="w-72 bg-[#0f172a] text-white hidden md:flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="h-24 flex items-center px-8 border-b border-gray-800 bg-[#0f172a]">
           <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/40 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter text-white block">
                    EventKuy<span className="text-brand-blue">.</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Super Admin</span>
              </div>
           </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-4 mt-2">Main Menu</p>
            
            <Link href="/admin" className="flex items-center gap-4 px-4 py-3.5 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-brand-blue/20 transition-all transform hover:translate-x-1">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
            </Link>
            
            <Link href="/admin/users" className="flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white font-medium rounded-xl transition-all hover:translate-x-1">
                <Users size={20} />
                <span>Kelola User</span>
            </Link>
            
            <Link href="/admin/events" className="flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white font-medium rounded-xl transition-all hover:translate-x-1">
                <Ticket size={20} />
                <span>Semua Event</span>
            </Link>

            <Link href="/admin/finance" className="flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white font-medium rounded-xl transition-all hover:translate-x-1">
                <DollarSign size={20} />
                <span>Keuangan</span>
            </Link>

            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-4 mt-8">System</p>

            <Link href="/admin/logs" className="flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white font-medium rounded-xl transition-all hover:translate-x-1">
                <Activity size={20} />
                <span>System Logs</span>
            </Link>

            <Link href="/admin/settings" className="flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white font-medium rounded-xl transition-all hover:translate-x-1">
                <Settings size={20} />
                <span>Pengaturan</span>
            </Link>
        </nav>

        <div className="p-6 border-t border-gray-800 bg-[#0f172a]">
            <Link href="/logout" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-bold rounded-xl transition-all">
                <LogOut size={20} />
                <span>Log Out</span>
            </Link>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 md:ml-72 p-8 md:p-12 relative overflow-hidden">
        {/* Background Hiasan Abstrak */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#0f172a] to-[#1e293b] z-0"></div>
        <div className="relative z-10">
            {children}
        </div>
      </main>

    </div>
  );
}