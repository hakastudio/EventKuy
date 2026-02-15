import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmitButton from "@/components/SubmitButton"; // <--- Import Tombol Canggih
import { notFound, redirect } from "next/navigation";
import { Lock, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const eventId = (await params).id;

  // 1. CEK LOGIN (SATPAM)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=/checkout/${eventId}`);
  }

  // 2. AMBIL DATA EVENT
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (!event) return notFound();

  // 3. ACTION SERVER (PROSES BELI)
  async function processPayment() {
    "use server";
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return; // Double check

    // Simpan ke Database
    const { error } = await supabase
      .from("tickets")
      .insert([{
          user_id: user.id,
          event_id: eventId,
          status: "paid", // Ceritanya lunas
          created_at: new Date().toISOString(),
      }]);

    if (error) {
      console.error("Gagal beli:", error);
      // Bisa tambahkan error handling visual nanti
    } else {
      // Sukses? Lempar ke halaman tiket
      redirect("/my-tickets");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-10">
         {/* Tombol Back Mobile */}
         <Link href={`/events/${eventId}`} className="md:hidden flex items-center gap-2 text-gray-500 font-bold mb-6">
            <ChevronLeft size={20} /> Kembali
         </Link>

         <div className="flex items-center gap-2 mb-6">
            <h1 className="text-xl md:text-2xl font-black text-gray-900">Checkout</h1>
            <div className="h-px flex-1 bg-gray-200"></div>
            <div className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">
               <Lock size={12} /> Secure Transaction
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD RINGKASAN (Kanan di Desktop) */}
            <div className="md:col-span-1 md:order-2">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                  <div className="flex gap-4 mb-4">
                     <img src={event.image_url} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                     <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(event.date).toLocaleDateString("id-ID")}</p>
                     </div>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-4"></div>
                  <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>Harga Tiket</span>
                        <span>Rp {event.price?.toLocaleString("id-ID")}</span>
                     </div>
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>Biaya Admin</span>
                        <span>Rp 5.000</span>
                     </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                     <span className="text-xs text-gray-900 font-bold">Total Bayar</span>
                     <span className="text-lg font-black text-brand-blue">Rp {(event.price + 5000).toLocaleString("id-ID")}</span>
                  </div>
               </div>
            </div>

            {/* FORM PEMBAYARAN (Kiri di Desktop) */}
            <div className="md:col-span-2 md:order-1 space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-4">Pilih Metode Pembayaran</h3>
                  
                  {/* Pilihan QRIS */}
                  <label className="flex items-center gap-4 p-4 border-2 border-brand-blue bg-blue-50/30 rounded-xl cursor-pointer transition-all hover:bg-blue-50 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                        Otomatis Cek
                     </div>
                     <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-brand-blue focus:ring-brand-blue" />
                     <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm">QRIS Instant</p>
                        <p className="text-xs text-gray-500 mt-0.5">GoPay, OVO, Dana, ShopeePay</p>
                     </div>
                     <div className="h-8 w-8 bg-white rounded flex items-center justify-center border border-gray-100">
                        <span className="text-[8px] font-black text-gray-600">QRIS</span>
                     </div>
                  </label>
               </div>

               {/* FORM UTAMA DENGAN TOMBOL CANGGIH */}
               <form action={processPayment}>
                  <SubmitButton /> 
                  <p className="text-center text-[10px] text-gray-400 mt-4 px-4">
                     Dengan klik tombol di atas, kamu setuju dengan Syarat & Ketentuan EventKuy.
                  </p>
               </form>
            </div>

         </div>
      </div>
      <Footer />
    </main>
  );
}