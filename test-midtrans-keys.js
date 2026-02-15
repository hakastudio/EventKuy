const midtransClient = require('midtrans-client');

// Hardcoding keys from .env.local to test directly
// MIDTRANS_SERVER_KEY=SB-Mid-server-iCbxyhPXQ4u5F5xDcix8DNwV
// NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-89GR9ZARi7Y6kly0

const serverKey = 'SB-Mid-server-iCbxyhPXQ4u5F5xDcix8DNwV';
const clientKey = 'SB-Mid-client-89GR9ZARi7Y6kly0';

console.log("Testing Midtrans Keys...");
console.log("Server Key:", serverKey);
console.log("Client Key:", clientKey);

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey
});

let parameter = {
  transaction_details: {
    order_id: `TEST-${Date.now()}`,
    gross_amount: 10000
  },
  credit_card: {
    secure: true
  },
  customer_details: {
    first_name: "Budi",
    last_name: "Pratama",
    email: "budi.pra@example.com",
    phone: "08111222333"
  }
};

snap.createTransaction(parameter)
  .then((transaction) => {
    console.log("✅ SUCCESS! Token:", transaction.token);
    console.log("Keys are VALID.");
  })
  .catch((e) => {
    console.error("❌ FAILED:", e.message);
    if (e.ApiResponse) {
        console.error("API Response:", JSON.stringify(e.ApiResponse, null, 2));
    }
    console.log("Keys might be INVALID or Server Key is wrong.");
  });
