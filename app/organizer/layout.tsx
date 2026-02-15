import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, BarChart3, Settings, LogOut, Ticket } from "lucide-react";

export default async function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "organizer") redirect("/");

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR (Kiri) */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
           <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <Ticket className="text-white" size={18} />
              </div>
              <span className="text-xl font-black tracking-tighter text-brand-blue">
                Event<span className="text-gray-800">Kuy.</span>
              </span>
           </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu Utama</p>
            
            <Link href="/organizer" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-brand-blue font-bold rounded-xl transition-all">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
            </Link>
            
            <Link href="/organizer/create" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-all">
                <PlusCircle size={20} />
                <span>Buat Event</span>
            </Link>
            
            <Link href="/organizer/reports" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-all">
                <BarChart3 size={20} />
                <span>Laporan</span>
            </Link>

            <Link href="/organizer/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-all">
                <Settings size={20} />
                <span>Pengaturan</span>
            </Link>
        </nav>

        <div className="p-6 border-t border-gray-100">
            <Link href="/logout" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-bold rounded-xl transition-all">
                <LogOut size={20} />
                <span>Keluar</span>
            </Link>
        </div>
      </aside>

      {/* KONTEN UTAMA (Kanan) */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>

    </div>
  );
}