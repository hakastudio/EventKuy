'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Ticket, LogOut, ChevronDown, UserCircle } from 'lucide-react'

export default function Navbar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path ? 'text-violet-600 font-bold' : 'text-gray-600 hover:text-violet-600'

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50 transition-all supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Kiri */}
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">EventKuy<span className="text-cyan-500">.</span></span>
            </Link>
          </div>

          {/* Menu Desktop (Kanan) */}
          <div className="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-6">
            <Link href="/" className={`px-3 py-2 text-sm font-medium transition ${isActive('/')}`}>
              Home
            </Link>

            {user ? (
              <>
                 <Link href="/tickets" className={`px-3 py-2 text-sm font-medium transition flex items-center ${isActive('/tickets')}`}>
                  Tiket Saya
                </Link>
                <Link href="/organizer" className={`px-3 py-2 text-sm font-medium transition flex items-center ${isActive('/organizer')}`}>
                  Organizer
                </Link>
                
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                
                {/* User Profile Desktop */}
                <div className="flex items-center gap-3 pl-2 group relative cursor-pointer">
                   <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center border border-violet-200 text-violet-600">
                    <UserCircle className="w-6 h-6"/>
                   </div>
                   <div className="text-sm hidden md:block">
                      <p className="font-bold text-gray-700 leading-none">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">Member</p>
                   </div>
                   <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-violet-500 transition" />

                   {/* Dropdown Logout */}
                   <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50 p-2">
                      <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                        <LogOut className="w-4 h-4 mr-2"/> Keluar Sekarang
                      </button>
                   </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 pl-4">
                <Link href="/login" className="text-gray-700 hover:text-violet-600 font-semibold text-sm transition">
                  Masuk
                </Link>
                <Link href="/login" className="relative group overflow-hidden px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-md shadow-violet-500/30 transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50">
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 bg-[length:200%_auto] animate-gradient"></span>
                  <span className="relative flex items-center">
                    Daftar Sekarang 🚀
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Tombol Burger Mobile */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition">
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Full Screen */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 px-6 pb-6 space-y-4 animate-in slide-in-from-top-10 duration-200 overflow-y-auto">
           <div className="space-y-3">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-4 rounded-2xl text-lg font-bold transition border ${pathname === '/' ? 'bg-violet-50 text-violet-700 border-violet-100' : 'text-gray-600 border-gray-100 hover:bg-gray-50'}`}
              >
                🏠 Home
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/tickets" 
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-2xl text-lg font-bold transition border ${pathname === '/tickets' ? 'bg-violet-50 text-violet-700 border-violet-100' : 'text-gray-600 border-gray-100 hover:bg-gray-50'}`}
                  >
                    🎫 Tiket Saya
                  </Link>
                  <Link 
                    href="/organizer" 
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-2xl text-lg font-bold transition border ${pathname === '/organizer' ? 'bg-violet-50 text-violet-700 border-violet-100' : 'text-gray-600 border-gray-100 hover:bg-gray-50'}`}
                  >
                    💼 Organizer Dashboard
                  </Link>
                  
                  <div className="pt-4 mt-4 border-t border-gray-200">
                     <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold border border-violet-200">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.email?.split('@')[0]}</p>
                          <p className="text-xs text-gray-500">Sedang Login</p>
                        </div>
                     </div>
                     <button 
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full text-center block px-5 py-4 rounded-2xl text-lg font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition"
                    >
                      🚪 Keluar Aplikasi
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-6">
                  <Link 
                    href="/login" 
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-5 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-xl shadow-violet-200 transition transform hover:scale-105"
                  >
                    🚀 Masuk / Daftar Sekarang
                  </Link>
                </div>
              )}
           </div>
        </div>
      )}
    </nav>
  )
}