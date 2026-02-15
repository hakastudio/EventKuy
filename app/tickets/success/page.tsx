import Link from 'next/link'
import { CheckCircle, Ticket, Home } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 text-center max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Sukses! 🎉</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Hore! Pembayaranmu berhasil terverifikasi. Tiket sudah kami simpan di dompetmu.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kode Transaksi</p>
          <p className="font-mono font-bold text-2xl text-slate-800 tracking-wider">INV-{Math.floor(Math.random() * 1000000)}</p>
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/tickets" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-200 active:scale-95">
            <Ticket className="w-5 h-5" /> Lihat Tiket Saya
          </Link>
          <Link href="/" className="w-full bg-white border-2 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-95">
            <Home className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </div>
      
      <p className="text-slate-400 text-xs font-bold mt-8 uppercase tracking-widest">EventKuy Secure Payment</p>
    </div>
  )
}