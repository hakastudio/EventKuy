export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Tanda seru (!) biar TypeScript gak rewel soal API Key
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --- KONFIGURASI BOS ---
    const DOMAIN = 'https://eventkuy.web.id'; 
    const PENGIRIM = 'EventKuy Official <noreply@eventkuy.web.id>'; 

    const status = body.transaction_status;
    const fraud = body.fraud_status;
    const orderId = body.order_id;
    const email = body.customer_details?.email || 'no-email@test.com';
    const name = body.customer_details?.first_name || 'Pelanggan';
    const total = body.gross_amount;

    console.log(`Webhook: Order ${orderId} | Status: ${status}`);

    // Logika Pembayaran Sukses
    if ((status === 'capture' || status === 'settlement') && (fraud === 'accept' || !fraud)) {
        
        // Kirim Email
        await resend.emails.send({
          from: PENGIRIM, 
          to: email,
          subject: '✅ Tiket EventKuy Kamu Sudah Terbit!',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #4F46E5; text-align: center;">EventKuy</h2>
              <p>Halo <b>${name}</b>,</p>
              <p>Pembayaran tiketmu BERHASIL! ✅</p>
              
              <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
                <p style="margin: 5px 0;"><strong>Total:</strong> Rp ${new Intl.NumberFormat('id-ID').format(total)}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${DOMAIN}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Lihat Tiket Saya 🎟️
                </a>
              </div>
            </div>
          `
        });
        console.log(`✅ Email sukses ke ${email}`);
    }

    return NextResponse.json({ status: 'ok' });

  } catch (err: any) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}