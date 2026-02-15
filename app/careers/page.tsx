export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Briefcase size={40} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Gabung Bersama EventKuy</h1>
        <p className="text-gray-600 text-lg mb-10">Kami selalu mencari talenta hebat untuk merevolusi industri event di Indonesia.</p>
        
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Lowongan Terbuka</h3>
          <p className="text-gray-500">Saat ini tim kami sudah lengkap, tapi jangan ragu untuk mengirimkan CV Anda ke <span className="text-indigo-600 font-bold">hrd@eventkuy.web.id</span> untuk kesempatan di masa depan!</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
