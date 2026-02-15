import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Gunakan Service Role Key agar bisa update status tanpa terhalang RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, transaction_status, signature_key, status_code, gross_amount } = body;

    // 1. Verifikasi Keamanan (Signature Key)
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const payload = order_id + status_code + gross_amount + serverKey;
    const expectedSignature = crypto.createHash("sha512").update(payload).digest("hex");

    if (signature_key !== expectedSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // 2. Tentukan Status Akhir
    let finalStatus = "pending";
    if (transaction_status === "settlement" || transaction_status === "capture") {
      finalStatus = "success";
    } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
      finalStatus = "failed";
    }

    // 3. Update Database Supabase
    const { error } = await supabaseAdmin
      .from("transactions")
      .update({ status: finalStatus })
      .eq("order_id", order_id);

    if (error) throw error;

    return NextResponse.json({ message: "Webhook received and processed" });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}