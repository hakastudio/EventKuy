'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- 1. TAMBAH EVENT BARU ---
export async function createEvent(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // 1. Cek User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { message: 'Unauthorized: Harap login terlebih dahulu.' }
  }

  // 2. Cek Role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'organizer' && profile?.role !== 'super_admin') {
    return { message: 'Forbidden: Hanya Organizer yang bisa membuat event.' }
  }

  // 3. Insert Data
  const { error } = await supabase.from('events').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    // time_start: formData.get('time') as string, // Gabung ke date atau abaikan jika date type includes time
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string, // Harusnya upload dulu ke storage, tapi sementara ambil URL input
    category: formData.get('category') as string,
    organizer_id: user.id, // PENTING!
    is_active: true
  })

  // Handle Ticket Tiers (Jika ada logic tambahan untuk tier di sini, implementasikan)
  // Saat ini form create event di UI mungkin perlu disesuaikan untuk mengirim data tier via server action yang sama atau terpisah.
  // Mengingat UI `app/events/new` mengirim dynamic tiers via input name="tier_name" dll, 
  // kita perlu handle array of inputs. FormData duplicate keys.
  
  if (error) {
    console.error("Create Event Error:", error)
    return { message: 'Gagal Database: ' + error.message }
  }

  revalidatePath('/organizer/events')
  redirect('/organizer/events')
}

// --- 2. UPDATE EVENT ---
export async function updateEvent(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  // 1. Cek User & Authorize
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  // Cek kepemilikan
  const { data: existingEvent } = await supabase
       .from('events')
       .select('organizer_id')
       .eq('id', id)
       .single()
  
  // Jika bukan pemilik dan bukan super admin (skip cek role super admin disini utk simplifikasi, asumsi RLS handle juga)
  if (existingEvent?.organizer_id !== user.id) {
       // Cek Super Admin fallback
       const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
       if(profile?.role !== 'super_admin') {
           return redirect(`/organizer/events?message=Unauthorized`)
       }
  }

  const { error } = await supabase.from('events').update({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    category: formData.get('category') as string,
  }).eq('id', id)

  if (error) {
    return redirect(`/organizer/events/edit/${id}?message=Gagal update: ${error.message}`)
  }

  revalidatePath('/organizer/events')
  redirect('/organizer/events')
}

// --- 3. HAPUS EVENT ---
export async function deleteEvent(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  // Auth check handled by RLS typically, but good to add explicitly
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('events').delete().eq('id', id).eq('organizer_id', user.id)
  
  revalidatePath('/organizer/events')
}