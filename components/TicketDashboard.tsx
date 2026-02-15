'use client'

import { useState } from 'react'
import { Settings, Ticket, ChevronDown } from 'lucide-react'
import TicketSettings from './TicketSettings'
import SoldTicketsList from './SoldTicketsList'

interface Event {
  id: string
  title: string
}

interface TicketTier {
  id: string
  event_id: string
  name: string
  price: number
  quota: number
}

interface SoldTicket {
  id: string
  created_at: string
  status: string
  events: { title: string }
  ticket_tiers: { name: string, price: number }
  holder_name?: string
  holder_email?: string
  user_id: string
}

interface TicketDashboardProps {
  events: Event[]
  tiers: TicketTier[]
  tickets: SoldTicket[]
}

export default function TicketDashboard({ events, tiers, tickets }: TicketDashboardProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'sales'>('settings')
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '')

  // Filter tiers based on selected event
  const selectedEventTiers = tiers.filter(t => t.event_id === selectedEventId)

  return (
    <div className="space-y-8">
      {/* --- HEADER & TABS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black mb-1 flex items-center gap-2 text-slate-900">
            Manajemen Tiket 🎫
          </h1>
          <p className="text-slate-500 font-medium">Atur kategori tiket dan kelola data pembeli.</p>
        </div>
        
        <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${activeTab === 'settings' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Settings className="w-4 h-4" /> Pengaturan
          </button>
          <button 
             onClick={() => setActiveTab('sales')}
             className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition ${activeTab === 'sales' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Ticket className="w-4 h-4" /> Penjualan
          </button>
        </div>
      </div>

      {/* --- CONTENT --- */}
      {activeTab === 'settings' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          {events.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
              <p className="text-slate-400 font-bold mb-2">Belum ada event yang dibuat.</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Buat event dulu di menu "Manajemen Acara".</p>
            </div>
          ) : (
             <div className="space-y-6">
               {/* Event Selector */}
               <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <label className="text-xs uppercase font-black text-slate-400 tracking-widest mb-2 block">Pilih Event untuk Diedit</label>
                 <div className="relative">
                   <select 
                    value={selectedEventId} 
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer font-bold text-slate-700"
                   >
                     {events.map(event => (
                       <option key={event.id} value={event.id}>{event.title}</option>
                     ))}
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                 </div>
               </div>

               {/* Settings Form */}
               <TicketSettings eventId={selectedEventId} tiers={selectedEventTiers} />
             </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <SoldTicketsList tickets={tickets} />
        </div>
      )}
    </div>
  )
}
