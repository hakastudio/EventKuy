"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Ticket, Home, Menu, X, LogOut } from "lucide-react";
import Logo from "@/components/Logo";

export default function OrganizerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/organizer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/organizer/events", label: "Event Saya", icon: Calendar },
    { href: "/organizer/tickets", label: "Manajemen Tiket", icon: Ticket },
  ];

  return (
    <>
      {/* MOBILE HEADER - Fixed Top */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-2">
           <Logo size="sm" variant="white" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all active:scale-95">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* OVERLAY BACKDROP */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-100 z-50 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl md:shadow-none
        md:translate-x-0 md:static md:block
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Sidebar Header (Admin/Desktop Logo) */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <Link href="/" className="block">
             <Logo size="sm" variant="white" />
             <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1 ml-11">Organizer Panel</p>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-2 flex flex-col h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
          <div className="space-y-2 flex-1">
            <p className="px-4 text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Menu Utama</p>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all text-sm font-bold group relative overflow-hidden
                    ${isActive 
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"}
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                  {item.label}
                  {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />}
                </Link>
              )
            })}
          </div>

          <div className="pt-8 border-t border-gray-100 space-y-2">
             <p className="px-4 text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Lainnya</p>
             <Link 
              href="/" 
              className="flex items-center gap-4 px-4 py-3.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition text-sm font-bold"
            >
              <Home className="w-5 h-5" />
              Ke Halaman Utama
            </Link>
             <button className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-xl transition text-sm font-bold">
               <LogOut className="w-5 h-5" />
               Keluar
             </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
