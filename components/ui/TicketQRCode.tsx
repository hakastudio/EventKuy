'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function TicketQRCode({ value }: { value: string }) {
  return (
    <div className="bg-white p-2 rounded-lg">
      <QRCodeSVG 
        value={value} 
        size={128}
        level={"H"}
        includeMargin={true}
      />
    </div>
  )
}
