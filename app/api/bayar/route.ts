import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, quantity, eventName, tierName, eventId, userId } = body;
    const orderId = `EKUY-${Date.now()}`;

    // 1. Minta Token ke Midtrans
    const transaction = await snap.createTransaction({
      transaction_details: { order_id: orderId, gross_amount: amount * quantity },
      item_details: [{ id: eventId, price: amount, quantity: quantity, name: `${eventName.substring(0, 20)} - ${tierName}` }]
    });

    // 2. Simpan ke Database 'transactions'
    const { error: dbError } = await supabaseAdmin.from("transactions").insert([{
      order_id: orderId,
      user_id: userId,
      event_id: eventId,
      amount: amount * quantity,
      quantity: quantity,
      tier_name: tierName,
      status: "pending",
      snap_token: transaction.token
    }]);

    if (dbError) throw new Error("Gagal simpan transaksi: " + dbError.message);

    return NextResponse.json({ token: transaction.token });
  } catch (error: any) {
    console.error("❌ ERROR:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}