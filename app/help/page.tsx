import Link from 'next/link'
import { Search, HelpCircle, FileText, MessageCircle, ChevronRight } from 'lucide-react'

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Pusat Bantuan
          </h1>
          <p className="text-gray-400 text-lg">
            Temukan jawaban atas pertanyaanmu atau hubungi kami langsung.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Cari topik bantuan..." 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
            />
          </div>
        </div>

        {/* Topik Populer */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition group cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileText className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Panduan Tiket</h3>
            <p className="text-gray-400 text-sm">Cara membeli, download, dan menggunakan tiket event.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition group cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <UserIcon className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Akun Saya</h3>
            <p className="text-gray-400 text-sm">Masalah login, lupa password, dan pengaturan profil.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition group cursor-pointer">
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <MessageCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Pembayaran</h3>
            <p className="text-gray-400 text-sm">Metode pembayaran, refund, dan status transaksi.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Pertanyaan Umum (FAQ)</h2>
          
          {faqItems.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-200">{item.q}</h3>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help? */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Masih butuh bantuan?</h2>
          <p className="text-gray-400 mb-6">Tim support kami siap membantumu 24/7.</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition">
            Hubungi Kami
          </Link>
        </div>

      </div>
    </div>
  )
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const faqItems = [
  { q: "Bagaimana cara membeli tiket?" },
  { q: "Apakah tiket bisa di-refund?" },
  { q: "Metode pembayaran apa saja yang tersedia?" },
  { q: "Bagaimana jika saya tidak menerima email tiket?" },
  { q: "Apakah saya perlu mencetak tiket?" },
]
