'use client'; // Wajib client component

import { useState } from 'react';

export default function CheckoutButton({ eventId, eventName, price, userEmail, userName }: any) {
  const [loading, setLoading] = useState(false);

  const handleBayar = async () => {
    setLoading(true);
    try {
      // 1. Panggil API Backend yang sudah kita fix tadi
      const response = await fetch('/api/bayar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          quantity: 1,
          price,
          userEmail, // Nanti diganti session user kalau sudah ada login
          userName
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // 2. Munculkan Popup Midtrans (Pake jurus anti-merah)
      const snap = (window as any).snap;
      
      if (snap) {
        snap.pay(data.token, {
          onSuccess: (result: any) => alert('Pembayaran Berhasil! ✅'),
          onPending: (result: any) => alert('Menunggu Pembayaran... ⏳'),
          onError: (result: any) => alert('Pembayaran Gagal ❌'),
          onClose: () => alert('Yah, kok ditutup Bos? 😅')
        });
      }

    } catch (error) {
      console.error(error);
      alert('Gagal memproses transaksi');
    } finally {
      setLoading(false);
    }
  };

  // Format Rupiah
  const hargaRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <button 
      onClick={handleBayar}
      disabled={loading}
      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all active:scale-95 disabled:bg-gray-400"
    >
      {loading ? 'Memproses...' : `Beli Tiket (${hargaRupiah})`}
    </button>
  );
}