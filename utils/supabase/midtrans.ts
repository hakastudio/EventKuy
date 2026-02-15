// @ts-ignore
import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
  isProduction: false, // Karena Bos pakai mode Sandbox
  serverKey: 'Mid-server-iCbxyhPXQ4u5F5xDcix8DNwV', // Langsung pasang atau pakai process.env
  clientKey: 'Mid-client-89GR9ZARi7Y6kly0'
});