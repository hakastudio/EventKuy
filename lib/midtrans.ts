import midtransClient from 'midtrans-client';

console.log("🔥 MIDTRANS INIT DEBUG 🔥");
console.log("Server Key ENV:", process.env.MIDTRANS_SERVER_KEY ? "LOADED ✅ sent to Snap" : "MISSING ❌");
console.log("Client Key ENV:", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ? "LOADED ✅ sent to Snap" : "MISSING ❌");

// Initializing the Snap client
export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
});