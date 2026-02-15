// @ts-ignore
import midtransClient from 'midtrans-client';

// Kita buat logic agar tidak error saat deploy
export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'dummy',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'dummy'
});