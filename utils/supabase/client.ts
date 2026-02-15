import { createBrowserClient } from '@supabase/ssr'

// Fungsi standar
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

// INI YANG DICARI HALAMAN TIKET/LOGIN!
export const supabase = createClient()