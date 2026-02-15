'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center z-10 perspective-1000 overflow-hidden pt-32 pb-20">
      
      <motion.div 
        style={{ y: yText, opacity: opacityText, scale: scaleHero }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-10 hover:scale-110 transition-transform duration-500 cursor-default"
        >
           <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
           </span>
           <span className="text-xs font-black text-cyan-300 tracking-[0.2em] uppercase">Platform Tiket #1 Indonesia</span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
           <motion.span 
             initial={{ opacity: 0, x: -50, filter: "blur(20px)" }}
             animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="block"
           >
             Temukan
           </motion.span>
           <motion.span 
             initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
             animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="hidden md:block" // Spacer for alignment
           /> 
           <motion.span 
             initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
             transition={{ duration: 1, delay: 0.6, type: "spring" }}
             className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-gradient-xy inline-block"
           >
             Vibes
           </motion.span> 
           <motion.span 
              initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.8 }}
           >
             Kamu.
           </motion.span>
        </h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-14 font-medium leading-relaxed"
        >
           Konser, festival, dan acara hype ada di sini. Booking tiket <span className="text-white font-bold underline decoration-cyan-500 decoration-4 underline-offset-4 hover:decoration-cyan-400 transition-all cursor-pointer">gampang</span>, harga <span className="text-white font-bold underline decoration-emerald-500 decoration-4 underline-offset-4 hover:decoration-emerald-400 transition-all cursor-pointer">jujur</span>, pengalaman <span className="text-white font-bold underline decoration-purple-500 decoration-4 underline-offset-4 hover:decoration-purple-400 transition-all cursor-pointer">seru</span>!
        </motion.p>
        
        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
           <Link href="#browse-events" className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all shadow-2xl shadow-cyan-900/30 hover:-translate-y-1 active:scale-95 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3 text-lg">Cari Event Seru <Zap className="w-5 h-5 group-hover:fill-yellow-300 group-hover:text-yellow-300 transition-colors animate-pulse"/></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
           </Link>
           <Link href="/organizer/events/create" className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/30 active:scale-95 text-lg">
              Buat Event
           </Link>
        </motion.div>

      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow pointer-events-none" />
    </section>
  )
}
