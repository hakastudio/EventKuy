'use client'

import { motion } from 'framer-motion'

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#030014]">
      
      {/* 1. WARNA DASAR & GRADIENT UTAMA */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#030014] via-[#11002c] to-[#030014]" />

      {/* 2. ORBS / BULATAN BERGERAK (MEMBERIKAN EFFEKT GRADASI HIDUP) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-900/40 blur-[100px]"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-900/30 blur-[120px]"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-indigo-600/20 blur-[80px]"
      />

      {/* 3. GRID PATTERN (RASTER) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
