import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Kebijakan Privasi</h1>
        <div className="prose prose-indigo text-gray-600 max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kebijakan Privasi Kami</h2>
            <p>Kami di EventKuy sangat menghargai privasi Anda. Informasi pribadi yang Anda berikan hanya akan digunakan untuk keperluan transaksi tiket dan peningkatan layanan kami.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan data seperti nama, alamat email, dan nomor telepon saat Anda melakukan transaksi pembelian tiket.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Penggunaan Cookie</h2>
            <p>Platform kami menggunakan browser cookie untuk meningkatkan pengalaman pengguna dan performa website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Keamanan</h2>
            <p>Kami menggunakan enkripsi standar industri untuk memastikan data transaksi Anda tetap aman dan terlindungi.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
