'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function buyTicket(eventId: string, prevState: any, formData: FormData) {
  const supabase = await createClient()

  // 1. CEK USER LOGIN
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Wajib login untuk membeli tiket!' }

  // 2. AMBIL DATA FORM
  const tierId = formData.get('tier_id') as string
  const quantity = Number(formData.get('quantity') || 1)

  if (!tierId) return { message: 'Pilih kategori tiket terlebih dahulu.' }

  try {
    // 3. AMBIL DATA TIER (Harga & Stok) - Security Check
    const { data: tier, error: tierError } = await supabase
      .from('ticket_tiers')
      .select('id, name, price, quota') // Fetch ID & Name needed for Midtrans
      .eq('id', tierId)
      .single()

    if (tierError || !tier) throw new Error('Kategori tiket tidak ditemukan.')
    if (tier.quota < quantity) return { message: 'Yah, stok tiket tidak cukup!' }

    // 4. HITUNG TOTAL & SIAPKAN DATA TRANSAKSI
    const totalPrice = Number(tier.price) * quantity
    
    // Simpan data pembelian (1 row per transaksi, berisi jumlah quantity)
    // Kalau mau 1 row per tiket fisik, bisa diloop. Tapi biasanya 1 transaksi = 1 row dengan qty.
    // Di schema kita: tickets punya 'quantity' dan 'total_price'.
    
    // Kita kurangi stok dulu (Optimistic Concurrency Control bisa diterapkan nanti)
    /* 
       Note: Idealnya pakai RPC function di Supabase biar atomik (kurang stok + insert tiket).
       Tapi untuk sekarang kita manual update dulu aja.
    */
    
    // 4a. Update Stok
    const { error: updateError } = await supabase
      .from('ticket_tiers')
      .update({ quota: tier.quota - quantity })
      .eq('id', tierId)
    
    if (updateError) throw new Error('Gagal update stok.')

    // 4b. Insert Tiket (Status: pending)
    const { data: ticketData, error: insertError } = await supabase
      .from('tickets')
      .insert({
        event_id: eventId,
        user_id: user.id,
        tier_id: tierId,
        quantity: quantity,
        total_price: totalPrice,
        status: 'pending' // Status awal pending
      })
      .select('id')
      .single()

    if (insertError || !ticketData) throw insertError || new Error('Gagal membuat tiket.')

    // 5. MIDTRANS SNAP TRANSACTION
    // Import secara dinamis agar tidak error saat build jika env belum ada
    const { snap } = await import('@/utils/midtrans') 
    
    // Siapkan parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: `TICKET-${ticketData.id}-${Date.now()}`, // ID Unik
        gross_amount: totalPrice
      },
      customer_details: {
        first_name: user.user_metadata?.full_name || 'Customer',
        email: user.email,
      },
      item_details: [{
        id: tier.id,
        price: Number(tier.price),
        quantity: quantity,
        name: `Tiket: ${tier.name}` // Max 50 chars
      }]
    }

    // Minta Token ke Midtrans
    const transaction = await snap.createTransaction(parameter)
    const token = transaction.token

    return { token } // Kirim token ke client untuk popup Snap

  } catch (error: any) {
    console.error('Transaksi Gagal:', error)
    return { message: error.message || 'Terjadi kesalahan sistem.' }
  }
}

// --- 6. UPDATE DATA PEMEGANG TIKET (Fitur Organizer) ---
export async function updateTicketHolder(ticketId: string, newName: string, newEmail: string) {
  const supabase = await createClient()
  
  // Validasi: Pastikan yang request adalah organizer yg punya event ini (Bisa ditambah pengecekan ownership di sini untuk security lebih ketat)

  // Update metadata tiket (misal kita simpan nama/email di tabel tickets atau profiles user terkait)
  // Catatan: Biasanya tiket terhubung ke user_id. Kalau mau ganti "nama pemegang", 
  // idealnya ada kolom 'holder_name' & 'holder_email' di tabel 'tickets' jika tiket bisa dipindahtangankan 
  // atau berbeda dengan akun pembeli.
  
  // Asumsi: Kita update kolom holder_name & holder_email (perlu pastikan kolom ini ada di DB atau tambahkan)
  // Jika tidak ada, script ini akan error. Mohon pastikan schema DB mendukung.
  
  /* 
     ALTER TABLE tickets 
     ADD COLUMN holder_name text,
     ADD COLUMN holder_email text;
  */

  const { error } = await supabase.from('tickets').update({
    holder_name: newName,
    holder_email: newEmail
  }).eq('id', ticketId)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/organizer/tickets')
  return { success: true, message: 'Data pemegang tiket berhasil diubah.' }
}