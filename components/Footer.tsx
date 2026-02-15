import { Ticket, Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center">
               <Ticket className="text-white" size={16} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Event<span className="text-brand-blue">Kuy.</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            Platform tiket terpercaya #1 di Indonesia. Keamanan transaksi terjamin, harga transparan, dan dukungan pelanggan 24/7.
          </p>
          <div className="flex gap-4">
             {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                   <Icon size={20} />
                </a>
             ))}
          </div>
        </div>

        {/* Menu */}
        <div>
           <h3 className="text-white font-bold mb-4">Perusahaan</h3>
           <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-indigo-600 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Karir</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Partner</Link></li>
           </ul>
        </div>

        <div>
           <h3 className="text-white font-bold mb-4">Dukungan</h3>
           <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-indigo-600 transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Hubungi Kami</Link></li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
         <p>© 2026 EventKuy Indonesia. All rights reserved.</p>
         <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Sitemap</span>
         </div>
      </div>
    </footer>
  );
}