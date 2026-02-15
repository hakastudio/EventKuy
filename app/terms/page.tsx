export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24 mt-10">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Syarat & Ketentuan</h1>
        <div className="prose prose-indigo max-w-none text-gray-600 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-900">1. Ketentuan Umum</h3>
            <p>Dengan menggunakan layanan EventKuy, Anda setuju untuk mematuhi semua aturan yang berlaku mengenai pembelian tiket dan penggunaan platform kami.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-gray-900">2. Pembayaran & Tiket</h3>
            <p>Semua transaksi diproses melalui payment gateway Midtrans. Tiket elektronik (e-ticket) akan dikirimkan otomatis ke email Anda segera setelah status pembayaran sukses.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-gray-900">3. Pembatalan (Refund)</h3>
            <p>Tiket yang sudah dibeli bersifat final dan tidak dapat dikembalikan (Non-Refundable), kecuali acara dibatalkan oleh pihak penyelenggara.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}