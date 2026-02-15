"use client";

import { useState } from "react";
import { Save, Globe, Lock, CreditCard, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi Save ke Database
    setTimeout(() => {
        setIsLoading(false);
        alert("Pengaturan berhasil disimpan!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
       <div className="mb-8">
           <h1 className="text-3xl font-black text-gray-900">Pengaturan Global</h1>
           <p className="text-gray-500">Konfigurasi utama platform EventKuy.</p>
       </div>

       <form onSubmit={handleSave} className="space-y-8">
          
          {/* SECTION 1: UMUM */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Globe size={20} className="text-brand-blue" /> Informasi Situs
              </h3>
              <div className="grid grid-cols-1 gap-6">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nama Platform</label>
                      <input type="text" defaultValue="EventKuy" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-blue outline-none transition-all" />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tagline SEO</label>
                      <input type="text" defaultValue="Tiket Event & Konser Pilihan Termurah" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-blue outline-none transition-all" />
                  </div>
              </div>
          </div>

          {/* SECTION 2: KEAMANAN & MAINTENANCE */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Lock size={20} className="text-red-500" /> Keamanan & Akses
              </h3>
              
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div>
                      <h4 className="font-bold text-gray-900">Maintenance Mode</h4>
                      <p className="text-sm text-gray-500">Jika aktif, hanya Admin yang bisa mengakses website.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className="text-brand-blue transition-all"
                  >
                      {maintenanceMode ? (
                          <ToggleRight size={48} className="text-red-500" />
                      ) : (
                          <ToggleLeft size={48} className="text-gray-300" />
                      )}
                  </button>
              </div>
          </div>

          {/* SECTION 3: PEMBAYARAN (MIDTRANS) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <CreditCard size={20} className="text-green-600" /> Payment Gateway (Midtrans)
              </h3>
              <div className="grid grid-cols-1 gap-6">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Server Key</label>
                      <input type="password" defaultValue="SB-Mid-server-xxxxxxxxx" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-blue outline-none font-mono text-gray-500" />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Client Key</label>
                      <input type="text" defaultValue="SB-Mid-client-xxxxxxxxx" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-blue outline-none font-mono text-gray-500" />
                  </div>
              </div>
          </div>

          {/* TOMBOL SAVE FLOAT */}
          <div className="sticky bottom-6 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-dark shadow-xl shadow-brand-blue/30 active:scale-95 transition-all disabled:opacity-70"
              >
                  {isLoading ? (
                      <> <Loader2 className="animate-spin" /> Menyimpan... </>
                  ) : (
                      <> <Save size={20} /> Simpan Perubahan </>
                  )}
              </button>
          </div>

       </form>
    </div>
  );
}