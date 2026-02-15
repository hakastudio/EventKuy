import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Kalau ada parameter "next", kita arahkan ke sana, kalau gak ada ke home (/)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies() // Wajib pakai await di Next.js terbaru

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    // TUKAR KODE DENGAN SESSION RESMI
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Login BERHASIL! Arahkan user ke halaman tujuan (home)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Kalau gagal/error, balikin ke halaman error
  // (Pastikan Bos punya halaman auth-code-error, atau arahkan ke /login saja)
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}