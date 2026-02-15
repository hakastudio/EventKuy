import { createBrowserClient } from '@supabase/ssr';

// Membuat client Supabase yang otomatis mengurus Cookies browser
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);