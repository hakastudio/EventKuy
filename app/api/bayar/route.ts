export const dynamic = 'force-dynamic'; // WAJIB: Biar Vercel gak error saat Build

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { snap } from '@/utils/midtrans'; // Pastikan path import midtrans benar

export async function POST(request: Request) {
  try {
    // 1. Inisialisasi Supabase (Di dalam fungsi biar aman)
    const supabase = await createClient();

    // 2. AMBIL DATA DARI FRONTEND (Ini yang tadi hilang Bos!)
    const { eventId, quantity, price, userEmail, userName } = await request.json();

    // Cek dulu datanya ada gak
    if (!eventId || !price) {
      return NextResponse.json({ error: 'Data transaksi tidak lengkap' }, { status: 400 });
    }

    // 3. Buat Order ID Unik
    const orderId = `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 4. SUSUN PARAMETER MIDTRANS
    // Sekarang merahnya pasti hilang karena variabel di atas sudah ada
    const transaction = {
      transaction_details: {
        order_id: orderId,
        gross_amount: price * (quantity || 1), // Pastikan quantity ada
      },
      customer_details: {
        email: userEmail || 'customer@example.com', // Fallback kalau email kosong
        first_name: userName || 'Pelanggan',
      },
      // Opsional: Biar di email Midtrans kelihatan beli apa
      item_details: [
        {
          id: eventId,
          price: price,
          quantity: quantity || 1,
          name: `Tiket Event ID: ${eventId}`,
        }
      ]
    };

    // 5. Minta Token ke Midtrans
    const token = await snap.createTransactionToken(transaction);

    // 6. Kirim Token balik ke Frontend
    return NextResponse.json({ token, orderId });

  } catch (error: any) {
    console.error('API Bayar Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}