import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'

export default async function AllEventsPage() {
  const supabase = await createClient()

  // Ambil data events yang AKTIF saja
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true) // Hanya tampilkan yang ON
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Semua Event 🔥</h1>
        {/* Tombol Buat Event (Opsional, buat User biasa mungkin gak perlu) */}
        <Link href="/events/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
          + Buat Event
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {events?.map((event) => (
          <div key={event.id} className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            
            {/* LINK YANG BENAR ADA DISINI 👇 */}
            <Link href={`/events/${event.id}`}> 
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </Link>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    <Link href={`/events/${event.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {event.title}
                    </Link>
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" /> {event.location}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <CalendarDays className="w-4 h-4 mr-1" /> 
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                 <p className="text-sm text-gray-500 line-clamp-1 max-w-[50%]">{event.category}</p>
                 <p className="text-lg font-bold text-indigo-600">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(event.price)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {(!events || events.length === 0) && (
           <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500">Belum ada event yang aktif.</p>
          </div>
        )}
      </div>
    </div>
  )
}