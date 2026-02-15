import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

// Inisialisasi Midtrans Mode Sandbox
const snap = new Midtrans.Snap({
  isProduction: false, // Wajib FALSE karena kita pakai Simulator/Sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
  try {
    const { eventId, title, price, userId } = await request.json();

    let parameter = {
      transaction_details: {
        // Order ID unik: ORD + Jam + Angka Acak
        order_id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        gross_amount: price,
      },
      item_details: [
        {
          id: eventId,
          price: price,
          quantity: 1,
          name: title.substring(0, 50),
        },
      ],
      customer_details: {
        first_name: "User",
        last_name: userId.substring(0, 8),
      },
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (error: any) {
    console.error("Midtrans Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}