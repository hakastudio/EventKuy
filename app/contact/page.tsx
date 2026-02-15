import Link from 'next/link'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Hubungi Kami
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Punya pertanyaan, kritik, atau saran? Jangan ragu untuk menghubungi kami. Tim kami akan segera merespon pesanmu.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-4">
                  <Mail className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <p className="text-gray-400">support@eventkuy.com</p>
                  <p className="text-gray-400">business@eventkuy.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-4">
                  <Phone className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Telepon / WhatsApp</h3>
                  <p className="text-gray-400">+62 812-3456-7890</p>
                  <p className="text-gray-400">Senin - Jumat, 09:00 - 17:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-4">
                  <MapPin className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Kantor</h3>
                  <p className="text-gray-400">Jl. Teknologi No. 123</p>
                  <p className="text-gray-400">Jakarta Selatan, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
             {/* Decorative gradient */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase">Nama Depan</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase">Nama Belakang</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase">Email</label>
                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase">Pesan</label>
                <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition" placeholder="Tulis pesanmu di sini..." />
              </div>

              <button type="submit" className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
