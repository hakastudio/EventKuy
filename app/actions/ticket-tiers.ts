'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// --- 1. TAMBAH TIKET TIER BARU ---
export async function createTicketTier(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const event_id = formData.get('event_id') as string
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  const quota = Number(formData.get('stock')) // keep input name as stock, but map to quota, OR change input name too. Let's change var name here first.
  
  // Validasi sederhana
  if (!event_id || !name || price < 0 || quota < 0) {
    return { message: 'Data tidak valid. Periksa kembali input Anda.' }
  }

  const { error } = await supabase.from('ticket_tiers').insert({
    event_id,
    name,
    price,
    quota, // DB column
  })

  if (error) {
    return { message: 'Gagal membuat tiket: ' + error.message }
  }

  revalidatePath('/organizer/tickets')
  return { message: 'Sukses! Tiket kategori baru berhasil dibuat.' }
}

// --- 2. UPDATE TIKET TIER ---
export async function updateTicketTier(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  const quota = Number(formData.get('stock')) // Input name still 'stock' from frontend form

  const { error } = await supabase.from('ticket_tiers').update({
    name,
    price,
    quota
  }).eq('id', id)

  if (error) {
    return { message: 'Gagal update tiket: ' + error.message }
  }

  revalidatePath('/organizer/tickets')
  return { message: 'Sukses! Data tiket berhasil diperbarui.' }
}

// --- 3. HAPUS TIKET TIER ---
export async function deleteTicketTier(tierId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('ticket_tiers').delete().eq('id', tierId)

  if (error) {
    console.error('Gagal hapus tiket:', error)
    return { message: 'Gagal menghapus tiket. Mungkin sudah ada yang beli?' }
  }

  revalidatePath('/organizer/tickets')
  return { message: 'Tiket berhasil dihapus.' }
}
