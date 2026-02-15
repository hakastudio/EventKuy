export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Pastikan API Key aman
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // --- DATA ---
    const DOMAIN = 'https://eventkuy.web.id'; 
    const EMAIL_ADMIN = 'eventkuyofficial@gmail.com';
    // Gunakan nama pengirim yang keren
    const PENGIRIM = 'EventKuy Official <noreply@eventkuy.web.id>'; 

    const status = body.transaction_status;
    const fraud = body.fraud_status;
    const orderId = body.order_id;
    const email = body.customer_details?.email || 'no-email@test.com';
    const name = body.customer_details?.first_name || 'Pelanggan';
    const total = body.gross_amount;

    console.log(`Webhook: Order ${orderId} | Status: ${status}`);

    if ((status === 'capture' || status === 'settlement') && (fraud === 'accept' || !fraud)) {
        
        await resend.emails.send({
          from: PENGIRIM, 
          to: email,
          // reply_to: EMAIL_ADMIN, // <--- KITA MATIKAN DULU BIAR GAK MERAH
          subject: '✅ Tiket EventKuy Kamu Sudah Terbit!',
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
              <h2 style="color: #4F46E5;">EventKuy</h2>
              <p>Halo <b>${name}</b>, Pembayaranmu BERHASIL! ✅</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Total:</strong> Rp ${new Intl.NumberFormat('id-ID').format(total)}</p>
              <br/>
              <a href="${DOMAIN}" style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Lihat Tiket Saya 🎟️
              </a>
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