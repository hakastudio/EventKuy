export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Lock size={28} /></div>
          <h1 className="text-4xl font-black text-gray-900">Kebijakan Privasi</h1>
        </div>
        <div className="prose prose-indigo max-w-none text-gray-600 space-y-6 text-justify">
          <p>Di EventKuy, privasi Anda adalah prioritas kami. Kami mengumpulkan informasi seperti nama dan alamat email semata-mata untuk keperluan pengiriman tiket elektronik (e-ticket).</p>
          <h3 className="text-xl font-bold text-gray-900">Penggunaan Data</h3>
          <p>Kami tidak akan pernah menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk kepentingan iklan tanpa persetujuan Anda.</p>
          <h3 className="text-xl font-bold text-gray-900">Penyimpanan Data</h3>
          <p>Data transaksi Anda disimpan dengan enkripsi tingkat tinggi di database kami yang aman, dilindungi oleh sistem otentikasi Supabase.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
