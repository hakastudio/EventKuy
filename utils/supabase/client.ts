import { createBrowserClient } from '@supabase/ssr'

// Kita buat fungsinya
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// INI YANG PENTING BOS! Tambahkan export ini biar error-nya hilang
export const supabase = createClient()