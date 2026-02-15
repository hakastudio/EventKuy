import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

export async function POST(request: Request) {
  try {
    const notificationJson = await request.json();

    // Verify notification (optional but recommended for production)
    const statusResponse = await snap.transaction.notification(notificationJson);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`Webhook received: ${orderId} | Status: ${transactionStatus}`);

    const supabase = await createClient();
    
    // Determine status
    let newStatus = 'pending';
    if (transactionStatus == 'capture'){
        if (fraudStatus == 'challenge'){
            newStatus = 'challenge';
        } else if (fraudStatus == 'accept'){
            newStatus = 'success';
        }
    } else if (transactionStatus == 'settlement'){
        newStatus = 'success';
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire'){
        newStatus = 'failed';
    } else if (transactionStatus == 'pending'){
        newStatus = 'pending';
    }

    // Update Transaction in Supabase
    // Wajib cocokkan dengan midtrans_id yang kita simpan di awal
    const { error } = await supabase
      .from('transactions')
      .update({ status: newStatus })
      .eq('midtrans_id', orderId);

    if (error) {
       console.error("Database Update Error:", error);
       return NextResponse.json({ message: "DB Error" }, { status: 500 });
    }

    return NextResponse.json({ message: "OK" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
