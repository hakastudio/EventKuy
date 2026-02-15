'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  name: string
  placeholder?: string
  required?: boolean
  variant?: 'light' | 'dark'
}

export default function PasswordInput({ name, placeholder = "••••••••", required = true, variant = 'light' }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const inputStyles = variant === 'light' 
    ? "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-blue-500/10" 
    : "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:ring-cyan-500 placeholder:text-gray-500"

  const iconColor = variant === 'light' ? "text-slate-400 group-focus-within:text-blue-500" : "text-gray-500 group-focus-within:text-cyan-500"

  return (
    <div className="relative group">
      <Lock className={`absolute left-4 top-4 h-5 w-5 transition-colors ${iconColor}`} />
      <input 
        name={name} 
        type={showPassword ? "text" : "password"} 
        required={required} 
        placeholder={placeholder} 
        className={`block w-full pl-12 pr-12 py-4 border rounded-xl font-bold focus:ring-4 outline-none transition-all ${inputStyles}`} 
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 focus:outline-none"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  )
}
