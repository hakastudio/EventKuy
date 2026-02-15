import { NextResponse } from "next/server";
import { snap } from "@/utils/midtrans";

export async function POST(request: Request) {
  try {
    const { amount, customerDetails } = await request.json();

    const transactionDetails = {
      order_id: `ORDER-${new Date().getTime()}`,
      gross_amount: amount,
    };

    const parameter = {
      transaction_details: transactionDetails,
      customer_details: customerDetails,
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}