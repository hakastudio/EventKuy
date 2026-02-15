export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-24 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600">Butuh bantuan seputar tiket atau kerjasama? Tim kami siap membantu.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">WhatsApp</h4>
            <a href="https://wa.me/6285175114542" className="text-indigo-600 font-bold hover:underline">0851-7511-7894542</a>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center border-2 border-indigo-600">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={24} />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Email Support</h4>
            <p className="text-indigo-600 font-bold">support@eventkuy.web.id</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={24} />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Telepon</h4>
            <p className="text-indigo-600 font-bold">0851-7511-4542</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}