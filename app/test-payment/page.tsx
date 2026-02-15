"use client";

import SnapPayButton from "@/components/SnapPayButton";

export default function TestPaymentPage() {
  const dummyEvent = {
    amount: 50000,
    customerDetails: {
      first_name: "Tester",
      email: "tester@example.com",
      phone: "081234567890"
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-2xl font-bold">Test Midtrans Snap</h1>
      <div className="border p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl mb-4">Tiket Konser Testing</h2>
        <p className="mb-2">Harga: Rp {dummyEvent.amount.toLocaleString()}</p>
        <p className="mb-6 text-gray-600">Klik tombol di bawah untuk simulasi pembayaran.</p>
        
        <SnapPayButton 
          amount={dummyEvent.amount}
          customerDetails={dummyEvent.customerDetails}
          onSuccess={(result) => alert("Payment Success: " + JSON.stringify(result))}
          onPending={(result) => alert("Payment Pending: " + JSON.stringify(result))}
          onError={(result) => alert("Payment Error: " + JSON.stringify(result))}
          onClose={() => alert("Widget Closed")}
        />
      </div>
    </div>
  );
}
