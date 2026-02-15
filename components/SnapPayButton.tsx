"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

interface SnapPayButtonProps {
  amount: number;
  customerDetails: {
    first_name: string;
    email: string;
    phone: string;
  };
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
}

export default function SnapPayButton({
  amount,
  customerDetails,
  onSuccess,
  onPending,
  onError,
  onClose,
}: SnapPayButtonProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Midtrans Snap Script
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    
    if(!document.querySelector(`script[src="${snapScript}"]`)){
        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);
    }
    
    return () => {
        // Cleanup if necessary
    }
  }, []);

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount,
            customerDetails
        }),
      });

      const data = await response.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result: any) => {
             console.log("Success", result);
             if (onSuccess) onSuccess(result);
          },
          onPending: (result: any) => {
            console.log("Pending", result);
             if (onPending) onPending(result);
          },
          onError: (result: any) => {
            console.log("Error", result);
             if (onError) onError(result);
          },
          onClose: () => {
            console.log("Customer closed the popup without finishing the payment");
            if (onClose) onClose();
          },
        });
      } else {
        console.error("Failed to get token", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
    >
      {loading ? "Processing..." : "Bayar Sekarang"}
    </button>
  );
}
