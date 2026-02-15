'use client'

import { useActionState, useState, useEffect } from 'react'
import { buyTicket } from '@/app/actions/tickets'
import { Ticket, Check, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

// Type definition for Snap
declare global {
  interface Window {
    snap: any;
  }
}

type Tier = {
  id: string
  name: string
  price: number
  quota: number
}

function SubmitButton({ selectedTier }: { selectedTier: Tier | null }) {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={!selectedTier || pending}
      className={`w-full font-bold py-4 rounded-xl transition-all duration-200 flex justify-center items-center shadow-lg
        ${!selectedTier || pending 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/30 active:scale-95'
        }
      `}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 
          Memproses Pembayaran...
        </>
      ) : (
        <>
          <Ticket className="w-5 h-5 mr-2" />
          {selectedTier ? 'Bayar Sekarang' : 'Pilih Tiket Dulu'}
        </>
      )}
    </button>
  )
}

export default function BookingForm({ eventId, tiers }: { eventId: string, tiers: Tier[] }) {
  const buyTicketWithId = buyTicket.bind(null, eventId)
  // Perhatikan: state sekarang bisa berisi { token } atau { message }
  const [state, formAction] = useActionState(buyTicketWithId, { message: '' } as any)
  
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [qty, setQty] = useState(1)
  const router = useRouter()

  const total = selectedTier ? selectedTier.price * qty : 0

  // 1. INJECT SNAP JS SCRIPT
  useEffect(() => {
    const snapUrl = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
    
    if (!document.getElementById('midtrans-snap')) {
      const script = document.createElement('script')
      script.src = snapUrl
      script.id = 'midtrans-snap'
      script.setAttribute('data-client-key', clientKey)
      document.body.appendChild(script)
    }
  }, [])

  // 2. HANDLE TOKEN & POPUP
  useEffect(() => {
    if (state?.token) {
      if (window.snap) {
        window.snap.pay(state.token, {
          onSuccess: function(result: any) {
            console.log('Payment Success:', result)
            router.push('/tickets/success') // Redirect manual setelah sukses
          },
          onPending: function(result: any) {
            console.log('Payment Pending:', result)
            alert('Pembayaran tertunda! Cek email Anda.')
            router.push('/tickets') // Redirect ke list tiket (status pending)
          },
          onError: function(result: any) {
            console.log('Payment Error:', result)
            alert('Pembayaran gagal!')
          },
          onClose: function() {
            console.log('Customer closed the popup without finishing the payment')
            alert('Anda menutup pop-up pembayaran.')
          }
        })
      } else {
        alert("Midtrans Snap belum siap. Coba refresh halaman.")
      }
    }
  }, [state, router])

  return (
    <form action={formAction} className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sticky top-24">
      <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">🎫</span>
        Beli Tiket
      </h3>

      {/* Pesan Error */}
      {state?.message && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 font-medium text-sm rounded-xl border border-red-100 animate-pulse">
          ⚠️ {state.message}
        </div>
      )}

      {/* Pilihan Tiers (Sama seperti sebelumnya) */}
      <div className="space-y-3 mb-8">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            onClick={() => setSelectedTier(tier)}
            className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98]
              ${selectedTier?.id === tier.id 
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600' 
                : 'border-gray-100 hover:border-indigo-300 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex justify-between items-center relative z-10">
              <div>
                <p className={`font-bold text-lg ${selectedTier?.id === tier.id ? 'text-indigo-900' : 'text-gray-700'}`}>{tier.name}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Stok: {tier.quota} tiket</p>
              </div>
              <div className="text-right">
                <p className={`font-black text-lg ${selectedTier?.id === tier.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, notation: 'compact' }).format(tier.price)}
                </p>
                {selectedTier?.id === tier.id && (
                  <div className="absolute -top-3 -right-3 bg-indigo-600 text-white rounded-full p-1 shadow-sm">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {tiers.length === 0 && <p className="text-gray-400 text-center italic py-4">Tiket belum tersedia.</p>}
      </div>

      <input type="hidden" name="tier_id" value={selectedTier?.id || ''} />
      
      {/* Input Quantity (Perlu input hidden agar terkirim ke server action) */}
      <input type="hidden" name="quantity" value={qty} />

      {/* Quantity Selector UI */}
      <div className="flex items-center justify-between mb-8 pt-6 border-t border-dashed border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Jumlah</label>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600 font-bold transition">-</button>
            <span className="w-12 text-center font-bold text-gray-900 block py-2">{qty}</span>
            <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600 font-bold transition">+</button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Bayar</p>
          <p className="text-2xl font-black text-gray-900">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}
          </p>
        </div>
      </div>

      <SubmitButton selectedTier={selectedTier} />
      
      <p className="text-center text-[10px] text-gray-400 mt-4 flex justify-center items-center gap-1">
        🔒 Powered by Midtrans Secure Payment
      </p>
    </form>
  )
}