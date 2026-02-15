'use client';

import { useState } from 'react';

export default function CheckoutButton({ eventId, eventName, price, userEmail, userName }: any) {
  const [loading, setLoading] = useState(false);

  const handleBayar = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bayar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          quantity: 1,
          price,
          userEmail, 
          userName
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const snap = (window as any).snap;
      if (snap) {
        snap.pay(data.token, {
          onSuccess: (result: any) => alert('Pembayaran Berhasil! Cek Email ya! ✅'),
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

  return (
    <button 
      onClick={handleBayar}
      disabled={loading}
      className="w-full py-4 bg-indigo-600 text-white font-bold text-center rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 disabled:bg-gray-400"
    >
      {loading ? 'Memproses...' : 'Beli Tiket Sekarang'}
    </button>
  );
}