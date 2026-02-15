import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { eventId, price, userEmail, userName, eventName } = await request.json();

    const parameter = {
      transaction_details: {
        order_id: `EK-${Date.now()}`,
        gross_amount: price,
      },
      customer_details: {
        first_name: userName,
        email: userEmail,
      },
      item_details: [{
        id: eventId,
        price: price,
        quantity: 1,
        name: eventName,
      }],
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });

  } catch (error: any) {
    console.error('Midtrans API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}