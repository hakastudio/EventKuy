import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Syarat & Ketentuan Penggunaan</h1>
        <div className="prose prose-indigo text-gray-600 max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Pendahuluan</h2>
            <p>Selamat datang di EventKuy. Dengan mengakses platform kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan yang berlaku.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Pembelian Tiket</h2>
            <p>Setiap tiket yang sudah dibeli tidak dapat dibatalkan atau direfund kecuali terjadi pembatalan event oleh pihak penyelenggara.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Tanggung Jawab</h2>
            <p>EventKuy hanya bertindak sebagai platform ticketing. Isi dan pelaksanaan event adalah tanggung jawab sepenuhnya dari penyelenggara acara.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Perubahan S&K</h2>
            <p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
