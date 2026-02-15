export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const posts = [
    { title: "Cara Memilih Platform Ticketing Event Terbaik", date: "15 Feb 2026", category: "Tips" },
    { title: "Strategi Sukses Jualan Tiket Konser Sold Out!", date: "12 Feb 2026", category: "Marketplace" },
    { title: "Update Terbaru Sistem Pembayaran EventKuy x Midtrans", date: "10 Feb 2026", category: "Update" }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-black text-gray-900 mb-12 text-center">EventKuy Blog & Berita</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-300 font-black text-4xl">BLOG</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{post.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4 line-clamp-2">{post.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{post.date}</span>
                  <button className="text-indigo-600 font-bold">Baca &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
