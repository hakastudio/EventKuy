import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white mb-8 transition">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Syarat & Ketentuan</h1>
        <p className="text-sm text-gray-500 mb-12">Terakhir diperbarui: 10 Februari 2026</p>

        <div className="space-y-12 prose prose-invert prose-cyan max-w-none">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Pendahuluan</h2>
            <p className="leading-relaxed">
              Selamat datang di Eventkuy ("Kami", "Platform"). Dengan mengakses atau menggunakan situs web dan layanan kami, Anda menyetujui untuk mematuhi dan terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Akun Pengguna</h2>
            <p className="leading-relaxed mb-4">
              Untuk mengakses fitur tertentu, Anda mungkin perlu mendaftar akun. Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk password.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Anda harus memberikan informasi yang akurat dan lengkap saat mendaftar.</li>
              <li>Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.</li>
              <li>Kami berhak menangguhkan atau menghentikan akun Anda jika melanggar ketentuan ini.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Pembelian Tiket</h2>
            <p className="leading-relaxed mb-4">
              Semua pembelian tiket melalui platform kami bersifat final dan tidak dapat dikembalikan, kecuali dinyatakan lain dalam kebijakan pembatalan penyelenggara acara atau diwajibkan oleh hukum.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Harga tiket dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
              <li>Anda setuju untuk membayar semua biaya yang terkait dengan pembelian Anda.</li>
              <li>Tiket yang sudah dibeli akan dikirimkan melalui email dan tersedia di dashboard akun Anda.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Hak Kekayaan Intelektual</h2>
            <p className="leading-relaxed">
              Layanan dan konten aslinya (tidak termasuk Konten yang disediakan oleh pengguna), fitur, dan fungsionalitas adalah dan akan tetap menjadi milik eksklusif Eventkuy dan pemberi lisensinya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Perubahan Syarat</h2>
            <p className="leading-relaxed">
              Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Syarat ini setiap saat. Jika revisi bersifat material, kami akan mencoba memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku.
            </p>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-white mb-4">6. Hubungi Kami</h2>
             <p className="leading-relaxed">
               Jika Anda memiliki pertanyaan tentang Syarat ini, silakan hubungi kami di <Link href="/contact" className="text-cyan-400 hover:underline">Support Center</Link>.
             </p>
          </section>
        </div>
      </div>
    </div>
  )
}
