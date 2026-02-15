"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function PaymentButton({ event, userId }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Load Script Snap Midtrans khusus Sandbox
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; 
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    script.async = true;
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Ambil Token dari API kita
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          title: event.title,
          price: event.price,
          userId: userId,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert("Gagal koneksi ke Midtrans: " + data.error);
        return;
      }

      // 2. Munculkan Jendela Pembayaran
      (window as any).snap.pay(data.token, {
        onSuccess: async function (result: any) {
          // 3. Simpan ke Supabase kalau sukses
          await supabase.from("transactions").insert({
            order_id: result.order_id,
            user_id: userId,
            event_id: event.id,
            amount: event.price,
            quantity: 1,
            tier_name: "Regular",
            status: "success",
            payment_method: result.payment_type,
            payment_date: new Date().toISOString(),
          });
          router.push("/my-tickets");
          router.refresh();
        },
        onPending: () => alert("Selesaikan bayarnya dulu Bos!"),
        onError: () => alert("Pembayaran Gagal!"),
        onClose: () => alert("Jendela ditutup, transaksi batal.")
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full py-4 bg-cyan-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50 mt-8"
    >
      {isLoading ? "Memproses..." : "Bayar Sekarang"}
    </button>
  );
}