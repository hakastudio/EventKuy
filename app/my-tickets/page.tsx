import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { Ticket as TicketIcon } from "lucide-react";
import Link from "next/link";
import TicketItem from "@/components/TicketItem";

export default async function MyTickets() {
  const supabase = await createClient();

  // 1. Cek Login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 2. Ambil Data Tiket + Data Event-nya (Join Table)
  const { data: tickets } = await supabase
    .from("tickets")
    .select(`
      *,
      events (
        title,
        date,
        location,
        image_url,
        price
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">Tiket Saya</h1>
                <p className="text-gray-500 text-sm mt-1">Kelola semua e-ticket eventmu di sini.</p>
            </div>
            <div className="hidden md:block">
                <Link href="/" className="text-sm font-bold text-brand-blue hover:underline">
                    + Beli Tiket Lain
                </Link>
            </div>
        </div>

        {/* List Tiket */}
        <div className="space-y-6">
          {tickets?.map((ticket: any) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}

          {!tickets?.length && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <TicketIcon size={32} className="text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada tiket nih!</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Jangan sampai ketinggalan event seru favoritmu. Yuk cari tiket sekarang.
                  </p>
                  <Link href="/" className="px-6 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20">
                      Cari Event Seru
                  </Link>
              </div>
          )}
        </div>

      </div>
      <Footer />
    </main>
  );
}
