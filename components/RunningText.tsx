"use client";

import React from "react";

export default function RunningText() {
  const text = "GET YOUR TICKET NOW • DO NOT MISS OUT • LIMITED SLOTS • SECURE YOUR SEAT • ";

  return (
    <div className="w-full bg-cyan-600 overflow-hidden py-6 border-y border-white/10 relative z-30">
      {/* 1. KITA SUNTIK KEYFRAMES LANGSUNG DI SINI BOS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-direct {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-logic {
          display: flex;
          width: max-content;
          animation: marquee-direct 25s linear infinite;
        }
      `}} />

      {/* 2. EKSEKUSI ANIMASINYA */}
      <div className="marquee-logic flex whitespace-nowrap">
        {/* Teks Pertama */}
        <span className="text-sm font-black italic uppercase tracking-[0.5em] text-white px-10">
          {text} {text}
        </span>
        {/* Teks Kedua (Buat Nyambungin) */}
        <span className="text-sm font-black italic uppercase tracking-[0.5em] text-white px-10">
          {text} {text}
        </span>
      </div>
    </div>
  );
}