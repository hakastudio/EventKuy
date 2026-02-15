'use client'

import { Download } from 'lucide-react'

export default function ExportButton({ data }: { data: any[] }) {
  
  const handleDownload = () => {
    // 1. Buat Header CSV
    const headers = ['ID Transaksi,Tanggal,Event,Pembeli (User ID),Kategori,Harga Satuan,Qty,Total,Status']
    
    // 2. Masukkan Data Baris per Baris
    const rows = data.map(t => {
      const date = new Date(t.created_at).toLocaleDateString('id-ID')
      const unitPrice = t.ticket_tiers?.price || 0
      const qty = t.quantity || 1
      const total = t.total_price || (unitPrice * qty) // Fallback calculation

      // Gabungkan dengan koma, dan bungkus string dengan tanda kutip biar aman
      return `${t.id},"${date}","${t.events?.title || '-'}",${t.user_id},"${t.ticket_tiers?.name || '-'}",${unitPrice},${qty},${total},${t.status}`
    })

    // 3. Gabungkan Semua
    const csvContent = [headers, ...rows].join('\n')
    
    // 4. Bikin File Blob & Download Otomatis
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `Laporan_Penjualan_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button 
      onClick={handleDownload}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white border border-white/10 transition flex items-center gap-2 font-bold shadow-lg active:scale-95"
    >
      <Download className="w-4 h-4" />
      Export Excel (.CSV)
    </button>
  )
}