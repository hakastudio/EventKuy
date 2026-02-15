'use client'

import { useState } from 'react'
import { Search, Edit2, Check, X } from 'lucide-react'
import { updateTicketHolder } from '@/app/actions/tickets'

interface Ticket {
  id: string
  created_at: string
  status: string
  events: { title: string }
  ticket_tiers: { name: string, price: number }
  holder_name?: string
  holder_email?: string
  user_id: string
}

interface SoldTicketsListProps {
  tickets: Ticket[]
}

export default function SoldTicketsList({ tickets }: SoldTicketsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [editForm, setEditForm] = useState({ name: '', email: '' })

  const filteredTickets = tickets.filter(t => 
    (t.events?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.ticket_tiers?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.holder_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(t.id).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const startEdit = (ticket: Ticket) => {
    setEditingId(ticket.id)
    setEditForm({ 
      name: ticket.holder_name || '', 
      email: ticket.holder_email || '' 
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', email: '' })
  }

  const saveEdit = async (id: string) => {
    await updateTicketHolder(id, editForm.name, editForm.email)
    setEditingId(null)
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800">Tiket Terjual 🧾</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari ID, Event, Nama..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none w-full md:w-72 transition"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Event & Kategori</th>
              <th className="p-4">Pemegang Tiket</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.length === 0 ? (
               <tr><td colSpan={4} className="p-10 text-center text-slate-400 italic">Tidak ada data tiket ditemukan.</td></tr>
            ) : (
              filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition group bg-white">
                  <td className="p-4 font-mono text-slate-400 text-xs align-top">
                    #{String(t.id).substring(0, 8)}
                    <br />
                    <span className="text-[10px] text-slate-300 font-sans font-bold uppercase">{new Date(t.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-slate-800">{t.events?.title || 'Event Dihapus'}</p>
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-black mt-1 inline-block uppercase tracking-wider">
                      {t.ticket_tiers?.name || '-'}
                    </span>
                  </td>
                  <td className="p-4 align-top">
                    {editingId === t.id ? (
                      <div className="space-y-2 animate-in fade-in zoom-in-95">
                        <input 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          placeholder="Nama Pemegang"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold focus:border-blue-500 outline-none"
                        />
                         <input 
                          value={editForm.email} 
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          placeholder="Email Pemegang"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold focus:border-blue-500 outline-none"
                        />
                      </div>
                    ) : (
                      <div>
                        {t.holder_name ? (
                             <>
                                <p className="font-bold text-slate-700">{t.holder_name}</p>
                                <p className="text-slate-400 text-xs">{t.holder_email}</p>
                             </>
                        ) : (
                             <span className="text-xs text-orange-400 font-bold bg-orange-50 px-2 py-1 rounded inline-block border border-orange-100">Belum diisi</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center align-top">
                    {editingId === t.id ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => saveEdit(t.id)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition border border-emerald-100">
                          <Check className="w-4 h-4" />
                        </button>
                         <button onClick={cancelEdit} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition border border-slate-200">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(t)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
