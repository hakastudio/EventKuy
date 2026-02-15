import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white mb-8 transition">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Kebijakan Privasi</h1>
        <p className="text-sm text-gray-500 mb-12">Terakhir diperbarui: 10 Februari 2026</p>

        <div className="space-y-12 prose prose-invert prose-cyan max-w-none">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p className="leading-relaxed mb-4">
              Kami mengumpulkan beberapa jenis informasi untuk berbagai tujuan guna menyediakan dan meningkatkan Layanan kami kepada Anda.
            </p>
            <h3 className="text-xl font-bold text-white mt-6 mb-2">Data Pribadi</h3>
            <p className="leading-relaxed mb-2">
              Saat menggunakan Layanan kami, kami mungkin meminta Anda untuk memberikan kami informasi pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda ("Data Pribadi"). Informasi ini mungkin termasuk, namun tidak terbatas pada:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Alamat Email</li>
              <li>Nama Depan dan Nama Belakang</li>
              <li>Nomor Telepon</li>
              <li>Cookie dan Data Penggunaan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Penggunaan Data</h2>
            <p className="leading-relaxed mb-4">
              Eventkuy menggunakan data yang dikumpulkan untuk berbagai tujuan:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Untuk menyediakan dan memelihara Layanan</li>
              <li>Untuk memberitahukan Anda tentang perubahan pada Layanan kami</li>
              <li>Untuk memungkinkan Anda berpartisipasi dalam fitur interaktif Layanan kami</li>
              <li>Untuk memberikan dukungan pelanggan</li>
              <li>Untuk memantau penggunaan Layanan</li>
              <li>Untuk mendeteksi, mencegah, dan mengatasi masalah teknis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Keamanan Data</h2>
            <p className="leading-relaxed">
              Keamanan data Anda penting bagi kami, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, kami tidak dapat menjamin keamanannya secara mutlak.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Penyedia Layanan</h2>
            <p className="leading-relaxed">
               Kami dapat mempekerjakan perusahaan dan individu pihak ketiga untuk memfasilitasi Layanan kami ("Penyedia Layanan"), untuk menyediakan Layanan atas nama kami, untuk melakukan layanan terkait Layanan, atau untuk membantu kami dalam menganalisis bagaimana Layanan kami digunakan.
            </p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-white mb-4">5. Hubungi Kami</h2>
             <p className="leading-relaxed">
               Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <Link href="/contact" className="text-cyan-400 hover:underline">Support Center</Link>.
             </p>
          </section>
        </div>
      </div>
    </div>
  )
}
