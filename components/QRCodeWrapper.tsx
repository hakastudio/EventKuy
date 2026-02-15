"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRCodeWrapper({ value }: { value: string }) {
  return (
    <div className="bg-white p-2 rounded-xl inline-block shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      <QRCodeSVG 
        value={value} 
        size={110}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
      />
    </div>
  );
}