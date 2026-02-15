'use client';

import { useState } from 'react';

export default function CheckoutButton({ eventId, eventName, price, userEmail, userName }: any) {
  const [loading, setLoading] = useState(false);

  const handleBayar = async () => {
    setLoading(true);
    try {
      // 1. Minta Token ke Backend
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
      if (!response.ok) throw new Error(data.error || 'Gagal membuat transaksi');

      // 2. Munculkan Popup Midtrans
      const snap = (window as any).snap;
      if (snap) {
        snap.pay(data.token, {
          onSuccess: (result: any) => { alert('Pembayaran Berhasil! Cek Email ya!'); window.location.reload(); },
          onPending: (result: any) => { alert('Menunggu pembayaran...'); },
          onError: (result: any) => { alert('Pembayaran Gagal!'); },
          onClose: () => { console.log('Customer menutup popup tanpa bayar'); }
        });
      } else {
        alert('Midtrans Belum Siap, coba refresh halaman Bos!');
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message || 'Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleBayar}
      disabled={loading}
      className="w-full py-4 bg-indigo-600 text-white font-bold text-center rounded-xl hover:bg-indigo-700 transition-all disabled:bg-gray-400"
    >
      {loading ? 'Menghubungkan Midtrans...' : 'Beli Tiket Sekarang'}
    </button>
  );
}