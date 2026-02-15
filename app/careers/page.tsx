import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-4">
          Karir di EventKuy <Briefcase size={36} className="text-indigo-600" />
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Bergabunglah bersama tim pionir yang sedang mengubah wajah industri event di Indonesia. Kami mencari talenta-talenta kreatif dan inovatif.
        </p>
        
        <div className="space-y-6">
          <div className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors">
            <h3 className="text-xl font-bold text-gray-900">Frontend Developer (React/Next.js)</h3>
            <p className="text-gray-500 text-sm mb-4">Remote / Jakarta • Full-time</p>
            <button className="text-indigo-600 font-bold hover:underline">Lihat Detail & Lanjut Melamar &rarr;</button>
          </div>
          
          <div className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors">
            <h3 className="text-xl font-bold text-gray-900">Backend Engineer (Node.js/Supabase)</h3>
            <p className="text-gray-500 text-sm mb-4">Jakarta • Full-time</p>
            <button className="text-indigo-600 font-bold hover:underline">Lihat Detail & Lanjut Melamar &rarr;</button>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors">
            <h3 className="text-xl font-bold text-gray-900">UI/UX Designer</h3>
            <p className="text-gray-500 text-sm mb-4">Remote • Contract</p>
            <button className="text-indigo-600 font-bold hover:underline">Lihat Detail & Lanjut Melamar &rarr;</button>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-gray-50 rounded-3xl text-center">
            <h4 className="font-bold text-gray-900 mb-2">Belum menemukan posisi yang pas?</h4>
            <p className="text-sm text-gray-500 mb-4">Kirimkan CV dan Portfolio terbaikmu ke <span className="text-indigo-600 font-bold">hrd@eventkuy.web.id</span></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
