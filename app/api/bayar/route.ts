export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { snap } from '@/utils/midtrans';

export async function POST(request: Request) {
  try {
    // 1. Panggil client DI DALAM sini, bukan di luar!
    const supabase = await createClient(); 
    
    const body = await request.json();
    const { eventId, quantity, price, userEmail, userName } = body;

    const orderId = `EVT-${Date.now()}`;

    const transaction = {
      transaction_details: {
        order_id: orderId,
        gross_amount: price * quantity,
      },
      customer_details: {
        email: userEmail,
        first_name: userName,
      },
    };

    const token = await snap.createTransactionToken(transaction);

    return NextResponse.json({ token, orderId });
  } catch (error: any) {
    console.error('Midtrans Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}