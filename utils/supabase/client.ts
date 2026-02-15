import { createBrowserClient } from '@supabase/ssr'

// Fungsi standar Next.js
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// INI VARIABEL YANG DICARI VERCEL. WAJIB ADA!
export const supabase = createClient()