export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { snap } from '@/utils/midtrans';

export async function POST(request: Request) {
  try {
    const supabase = await createClient(); // Inisialisasi aman di dalam sini
    const { eventId, quantity, price, userEmail, userName } = await request.json();

    const orderId = `EVT-${Date.now()}`;
    const transaction = {
      transaction_details: { order_id: orderId, gross_amount: price * quantity },
      customer_details: { email: userEmail, first_name: userName },
    };

    const token = await snap.createTransactionToken(transaction);
    return NextResponse.json({ token, orderId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}