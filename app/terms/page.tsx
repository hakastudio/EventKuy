import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><ShieldAlert size={28} /></div>
          <h1 className="text-4xl font-black text-gray-900">Syarat & Ketentuan</h1>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
          <section>
            <h3 className="text-xl font-bold text-gray-900">1. Pembelian Tiket</h3>
            <p>Setiap tiket yang dibeli melalui EventKuy adalah sah dan akan dikirimkan ke email yang terdaftar setelah pembayaran berhasil (Settlement) dikonfirmasi oleh Midtrans.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-gray-900">2. Kebijakan Refund</h3>
            <p>Tiket yang sudah dibeli tidak dapat dibatalkan atau diuangkan kembali (Non-Refundable), kecuali acara dibatalkan oleh pihak penyelenggara/promotor.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-gray-900">3. Keamanan Transaksi</h3>
            <p>EventKuy tidak menyimpan data kartu kredit atau metode pembayaran Anda. Semua transaksi diproses secara aman melalui gerbang pembayaran Midtrans.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
