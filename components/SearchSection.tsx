'use client'

import { Search, XCircle } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchSection() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [term, setTerm] = useState(searchParams.get('q') || '')
  const currentCategory = searchParams.get('category')

  // Debounce search biar gak spam server setiap ketik huruf
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams)
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300) // Tunggu 300ms setelah selesai ngetik

    return () => clearTimeout(delayDebounceFn)
  }, [term, searchParams, pathname, replace])

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (currentCategory === category) {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mb-12 space-y-8">
      
      {/* 1. KOTAK PENCARIAN PREMIUM 'FIND YOUR VIBE' STYLE */}
      <div className="relative max-w-3xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
          <div className="bg-blue-600 rounded-full p-2">
            <Search className="h-4 w-4 text-white" />
          </div>
        </div>
        <input
          type="text"
          className="block w-full pl-20 pr-40 py-6 text-lg border border-white/10 rounded-full leading-5 bg-white/5 backdrop-blur-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          placeholder="SEARCH EVENTS..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        
        {/* Right Side: Location Indicator */}
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
           <div className="flex items-center gap-2 border-l border-white/10 pl-4 py-2 mr-2">
              <span className="text-slate-400 text-xs font-black tracking-widest uppercase flex items-center gap-2">
                 <span className="p-1.5 rounded-full border border-white/10 bg-white/5"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/></span>
                 LAMPUNG
              </span>
           </div>
        </div>
      </div>


        
       {(currentCategory || term) && (
          <div className="text-center">
             <button 
               onClick={() => { setTerm(''); replace(pathname); }}
               className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition flex items-center justify-center mx-auto"
             >
               <XCircle className="w-4 h-4 mr-1"/> Reset Semua Filter
             </button>
          </div>
        )}

    </div>
  )
}