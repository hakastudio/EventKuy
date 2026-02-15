export const dynamic = 'force-dynamic'; // Biar Vercel gak rewel pas build

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Inisialisasi HARUS di dalam sini, bukan di luar!
    const supabase = await createClient();
    const body = await request.json();

    // Logika webhook Bos di bawah sini...
    console.log("Webhook Midtrans masuk:", body.order_id);

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}