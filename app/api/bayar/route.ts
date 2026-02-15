import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Pastikan data tidak ada yang kosong
    const eventId = body.eventId || 'EVT-001';
    const eventName = body.eventName || 'Tiket EventKuy';
    const price = Number(body.price) || 0;
    const userEmail = body.userEmail || 'customer@mail.com';
    const userName = body.userName || 'Customer';

    const parameter = {
      transaction_details: {
        order_id: `EK-${Date.now()}`,
        gross_amount: price, // Total harus sama dengan jumlah di item_details
      },
      customer_details: {
        first_name: userName,
        email: userEmail,
      },
      item_details: [
        {
          id: eventId,
          price: price,
          quantity: 1,
          name: eventName.substring(0, 50), // Midtrans maksimal 50 karakter
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });

  } catch (error: any) {
    console.error('Midtrans API Error:', error);
    return NextResponse.json({ 
      error: error.message,
      details: error.ApiResponse || 'No details'
    }, { status: 500 });
  }
}