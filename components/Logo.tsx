import { Ticket, Zap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'color' | 'white'
}

export default function Logo({ size = 'md', variant = 'color' }: LogoProps) {
  
  const sizeClasses = {
    sm: { icon: "w-4 h-4", box: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-5 h-5", box: "w-10 h-10", text: "text-2xl" },
    lg: { icon: "w-8 h-8", box: "w-16 h-16", text: "text-4xl" }
  }

  const currentSize = sizeClasses[size]

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Icon Box */}
      <div className={`relative ${currentSize.box} flex items-center justify-center`}>
        <div className={`absolute inset-0 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl rotate-3 shadow-lg group-hover:rotate-6 transition-transform duration-300 ${variant === 'color' ? 'shadow-cyan-500/30' : 'shadow-white/10'}`}></div>
        <div className={`absolute inset-0 bg-slate-900 rounded-xl rotate-0 border border-white/10 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300`}>
           <div className="relative">
             <Ticket className={`${currentSize.icon} text-cyan-400 absolute top-0 left-0 -translate-x-0.5 -translate-y-0.5 opacity-50`} />
             <Zap className={`${currentSize.icon} text-white fill-white relative z-10`} />
           </div>
        </div>
      </div>

      {/* Text */}
      <span className={`font-black tracking-tight ${currentSize.text} ${variant === 'color' ? 'text-white' : 'text-slate-900'} flex items-center gap-0.5`}>
        Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kuy</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mb-1 animate-pulse"></span>
      </span>
    </div>
  )
}
