const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#020617]">
      
      {/* 1. Background Image (Concert Crowd) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459749411177-d4a37f99555f?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>

      {/* 2. Navy/Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#0f172a]/90 to-[#1e1b4b]/80"></div>

      {/* 3. Dynamic Orbs (Adjusted for Dark Theme) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* 4. Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-150 contrast-150 mix-blend-overlay"></div>
      
    </div>
  )
}

export default AnimatedBackground
