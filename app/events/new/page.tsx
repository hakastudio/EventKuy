'use client'

import { useActionState, useState, useEffect } from 'react'
import { createEvent } from '@/app/actions/events'
import { SubmitButton } from '@/components/submit-button'
import { Plus, Trash2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const initialState = { message: '' }

export default function CreateEventPage() {
  const [state, formAction] = useActionState(createEvent, initialState)
  const [tiers, setTiers] = useState([{ id: 1 }])
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return router.push('/login')
        
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role !== 'organizer' && profile?.role !== 'super_admin') {
            alert("Oops! Hanya Organizer yang boleh buat event.")
            router.push('/')
        }
    }
    checkAuth()
  }, [router, supabase])

  const addTier = () => setTiers([...tiers, { id: Date.now() }])
  const removeTier = (id: number) => setTiers(tiers.filter(t => t.id !== id))

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">Buat Event Baru 🎸</h1>

      <form action={formAction} className="space-y-8">
        {state?.message && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">⚠️ {state.message}</div>
        )}

        {/* --- BAGIAN 1: INFO EVENT --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">1. Informasi Dasar</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label-text">Nama Event</label>
              <input name="title" type="text" required placeholder="Konser Amal 2026" className="input-field" />
            </div>

            <div>
              <label className="label-text">Kategori</label>
              <select name="category" className="input-field">
                <option value="Concert">🎵 Konser Musik</option>
                <option value="Seminar">🎤 Seminar / Talkshow</option>
                <option value="Sports">⚽ Olahraga</option>
                <option value="Exhibition">🎨 Pameran</option>
              </select>
            </div>

            <div>
              <label className="label-text">Tanggal & Jam</label>
              <input name="date" type="datetime-local" required className="input-field" />
            </div>

            <div className="col-span-2">
              <label className="label-text">Lokasi</label>
              <input name="location" type="text" required placeholder="Convention Center, Jakarta" className="input-field" />
            </div>

            <div className="col-span-2">
              <label className="label-text">Deskripsi</label>
              <textarea name="description" rows={3} required placeholder="Jelaskan detail acaramu..." className="input-field" />
            </div>

            <div className="col-span-2">
              <label className="label-text">Upload Poster (Gambar)</label>
              <input name="image" type="file" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            </div>
          </div>
        </div>

        {/* --- BAGIAN 2: TIKET (DYNAMIC) --- */}
        <div className="space-y-4 pt-6 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">2. Kategori Tiket</h3>
            <button type="button" onClick={addTier} className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 font-bold">
              <Plus className="w-4 h-4 mr-1"/> Tambah Kategori
            </button>
          </div>

          <div className="space-y-3">
            {tiers.map((tier, index) => (
              <div key={tier.id} className="flex gap-3 items-end bg-gray-50 p-3 rounded-lg border">
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500">Nama (Ex: VIP)</label>
                  <input name="tier_name" type="text" required placeholder="VIP" className="input-field py-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500">Harga (Rp)</label>
                  <input name="tier_price" type="number" required placeholder="100000" className="input-field py-1" />
                </div>
                <div className="w-24">
                  <label className="text-xs font-bold text-gray-500">Stok</label>
                  <input name="tier_quota" type="number" required placeholder="50" className="input-field py-1" />
                </div>
                {index > 0 && (
                  <button type="button" onClick={() => removeTier(tier.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-md">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <SubmitButton className="w-full text-lg py-3">🚀 Terbitkan Event Sekarang</SubmitButton>
      </form>

      {/* CSS Helper (Biar gak nulis class panjang ulang-ulang) */}
      <style jsx>{`
        .label-text { display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem; }
        .input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .input-field:focus { outline: 2px solid #6366f1; border-color: #6366f1; }
      `}</style>
    </div>
  )
}