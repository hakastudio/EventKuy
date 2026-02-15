'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Save } from 'lucide-react'
import { createTicketTier, updateTicketTier, deleteTicketTier } from '@/app/actions/ticket-tiers'

interface TicketTier {
  id: string
  name: string
  price: number
  quota: number
}

interface TicketSettingsProps {
  eventId: string
  tiers: TicketTier[]
}

export default function TicketSettings({ eventId, tiers }: TicketSettingsProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form States
  const [formData, setFormData] = useState({ name: '', price: 0, quota: 100 })

  const resetForm = () => {
    setFormData({ name: '', price: 0, quota: 100 })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleEdit = (tier: TicketTier) => {
    setFormData({ 
      name: tier.name || '', 
      price: tier.price || 0, 
      quota: tier.quota || 0 
    })
    setEditingId(tier.id)
    setIsAdding(true)
  }

  const handleCreate = async (formDataPayload: FormData) => {
      formDataPayload.append('event_id', eventId)
      const res = await createTicketTier(null, formDataPayload)
      if (res?.message && !res.message.includes('Sukses')) {
          alert(res.message)
      } else {
          resetForm()
      }
  }

   const handleUpdate = async (formDataPayload: FormData) => {
      const res = await updateTicketTier(null, formDataPayload)
      if (res?.message && !res.message.includes('Sukses')) {
          alert(res.message)
      } else {
          resetForm()
      }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">Pengaturan Tiket 🎟️</h3>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-200"
          >
            <Plus className="w-4 h-4" /> Tambah Kategori
          </button>
        )}
      </div>

      {isAdding && (
        <form action={editingId ? handleUpdate : handleCreate} className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
          <input type="hidden" name="id" value={editingId || ''} />
          <h4 className="font-black text-blue-600 mb-4 uppercase tracking-wider text-xs">{editingId ? 'Edit Kategori' : 'Kategori Baru'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Nama Kategori</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: VIP, Festival" 
                required
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Harga (IDR)</label>
              <input 
                name="price"
                type="number"
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                required
                min="0"
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Stok Tiket</label>
              <input 
                 name="stock"
                 type="number" 
                 value={formData.quota} 
                 onChange={(e) => setFormData({...formData, quota: Number(e.target.value)})}
                 required
                 min="1"
                 className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end border-t border-slate-200 pt-4">
            <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition">Batal</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition shadow-lg shadow-emerald-200">
              <Save className="w-4 h-4" /> Simpan
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tiers.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
             <p className="text-slate-400 font-medium">Belum ada kategori tiket. Buat sekarang!</p>
          </div>
        ) : (
          tiers.map((tier) => (
            <div key={tier.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-xl group hover:border-blue-200 hover:shadow-sm transition">
              <div>
                <h4 className="font-bold text-lg text-slate-800">{tier.name}</h4>
                <div className="flex gap-4 text-sm text-slate-500 font-medium mt-1">
                  <span className="text-emerald-600">Rp {new Intl.NumberFormat('id-ID').format(tier.price)}</span>
                  <span className="text-slate-300">•</span>
                  <span>Stok: {tier.quota}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(tier)} className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteTicketTier(tier.id)} className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
