import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import TicketDashboard from '@/components/TicketDashboard'

export default async function TicketsPage() {
  const supabase = await createClient()

  // 1. Cek Login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Ambil Data Events (milik organizer ini)
  // Asumsi: RLS sudah aktif, jadi select * hanya mengembalikan data milik user
  // Atau jika belum ada RLS, kita filter manual jika ada kolom user_id/organizer_id
  const { data: events } = await supabase
    .from('events')
    .select('id, title')
    .order('created_at', { ascending: false })

  // 3. Ambil Data Tiket Terjual
  const { data: tickets } = await supabase
    .from('tickets')
    .select(`
      *,
      events (title),
      ticket_tiers (name, price)
    `)
    .order('created_at', { ascending: false })

  // 4. Ambil Semua Tier (untuk Settings)
  let tiers: any[] = []
  
  if (events && events.length > 0) {
    const eventIds = events.map(e => e.id)
    const { data } = await supabase
      .from('ticket_tiers')
      .select('*')
      .in('event_id', eventIds)
      
    tiers = data || []
  }

  return (
    <div className="text-slate-900">
      <div className="max-w-7xl mx-auto">
        <TicketDashboard 
          events={events || []} 
          tiers={tiers || []} 
          tickets={tickets || []} 
        />
      </div>
    </div>
  )
}
