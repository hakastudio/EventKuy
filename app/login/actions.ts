'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// --- FUNGSI LOGIN (TIDAK PERLU NAMA/HP) ---
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const next = formData.get('next') as string || '/'

  // Proses Login
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Kalau gagal, lempar balik ke login + pesan error
    // Pastikan 'next' param tetap ada biar gak hilang
    return redirect(`/login?message=Gagal login: ${error.message}&next=${next}`)
  }

  // Kalau sukses, refresh halaman dan masuk ke URL tujuan
  revalidatePath('/', 'layout')
  redirect(next)
}

// --- FUNGSI DAFTAR (DENGAN NAMA LENGKAP & NO HP) ---
export async function signup(formData: FormData) {
  const supabase = await createClient()

  // 1. Ambil Data dari Form Register
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  // 2. Kirim Data ke Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
      // Simpan Nama & HP di 'Metadata' User
      data: {
        full_name: fullName,
        phone_number: phone,
      },
    },
  })

  // 3. Cek Error
  if (error) {
    return redirect('/register?message=Gagal daftar: ' + error.message)
  }

  // 4. Logika Auto-Login
  // Jika Supabase langsung kasih sesi (berarti settingan "Confirm Email" Mati),
  // Kita langsung lempar user masuk ke Home.
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/')
  }

  // FALLBACK: Coba login manual jika signUp tidak mengembalikan session
  // (Kadang diperlukan tergantung setting Supabase)
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInData.session) {
    revalidatePath('/', 'layout')
    redirect('/')
  }

  // Jika masih tidak ada session, berarti benar-benar butuh verifikasi email
  return redirect('/login?message=Cek email kamu untuk verifikasi!')
}