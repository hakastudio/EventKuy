export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24 mt-10">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Tentang EventKuy 🚀</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          EventKuy adalah platform ticketing modern yang dirancang untuk memudahkan promotor dan penonton dalam bertransaksi secara aman dan terpercaya. Kami hadir untuk mendigitalisasi ekosistem event di Indonesia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-indigo-50 rounded-2xl">
            <h3 className="font-bold text-indigo-900 mb-2">Visi Kami</h3>
            <p className="text-sm text-indigo-700">Menjadi platform ticketing nomor satu yang transparan dan efisien bagi semua kalangan.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl">
            <h3 className="font-bold text-green-900 mb-2">Misi Kami</h3>
            <p className="text-sm text-green-700">Memberikan layanan pembayaran terbaik dengan integrasi sistem keamanan tingkat tinggi.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}