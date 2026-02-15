"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Upload, Calendar, MapPin, DollarSign, Type, ArrowLeft, X, Plus, Ticket, Users, Power } from "lucide-react"; // Tambah Icon Power
import Link from "next/link";
import { useState, useRef } from "react";

export default function CreateEventPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STATE TIKET (Sekarang ada 'isActive')
  const [ticketTiers, setTicketTiers] = useState([
    { name: "Regular", price: 0, stock: 100, isActive: true }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };
  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // LOGIC TAMBAH TIKET (Default Aktif)
  const addTier = () => {
    setTicketTiers([...ticketTiers, { name: "", price: 0, stock: 0, isActive: true }]);
  };

  const removeTier = (index: number) => {
    if (ticketTiers.length > 1) {
      setTicketTiers(ticketTiers.filter((_, i) => i !== index));
    }
  };

  const handleTierChange = (index: number, field: string, value: any) => {
    const newTiers = [...ticketTiers];
    // @ts-ignore
    newTiers[index][field] = value;
    setTicketTiers(newTiers);
  };

  // LOGIC SAKLAR ON/OFF
  const toggleTierStatus = (index: number) => {
    const newTiers = [...ticketTiers];
    newTiers[index].isActive = !newTiers[index].isActive;
    setTicketTiers(newTiers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        router.push("/login");
        return;
    }

    // Hanya ambil harga dari tiket yang AKTIF untuk display "Mulai Dari"
    const activeTiers = ticketTiers.filter(t => t.isActive);
    // Kalau gak ada tiket aktif, set harga 0
    const lowestPrice = activeTiers.length > 0 
        ? Math.min(...activeTiers.map(t => Number(t.price))) 
        : 0;

    const image_url = previewImages.length > 0 
        ? "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1459749411177-d4a414c95870?auto=format&fit=crop&q=80";

    // Simpan Event
    const { error } = await supabase.from("events").insert([{
      title: formData.get("title"),
      date: formData.get("date"),
      location: formData.get("location"),
      price: lowestPrice, 
      description: formData.get("description"),
      image_url: image_url,
    }]);

    if (!error) {
        router.push("/organizer");
    } else {
        alert("Gagal membuat event.");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/organizer" className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-brand-blue">
         <ArrowLeft size={20} /> Kembali ke Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Buat Event Baru</h1>
        <p className="text-gray-500 mt-1">Atur kategori tiket dan status ketersediaannya.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10">
        
        {/* SECTION 1 */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Type size={18} className="text-brand-blue" /> Informasi Dasar
            </h3>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Event</label>
                    <input name="title" required type="text" placeholder="Contoh: Konser Musik Amal 2026" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal & Waktu</label>
                        <input name="date" required type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lokasi Venue</label>
                        <input name="location" required type="text" placeholder="Contoh: GBK Senayan" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 2: KATEGORI TIKET + ON/OFF */}
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Ticket size={18} className="text-brand-blue" /> Kategori Tiket
                </h3>
                <button type="button" onClick={addTier} className="text-xs font-bold text-brand-blue hover:bg-blue-50 px-3 py-1 rounded-lg transition-all flex items-center gap-1">
                    <Plus size={14} /> Tambah Kategori
                </button>
            </div>
            
            <div className="space-y-4">
                {ticketTiers.map((tier, index) => (
                    // Style berubah agak transparan kalau OFF (opacity-50)
                    <div key={index} className={`flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-xl border transition-all ${tier.isActive ? 'border-gray-200' : 'border-gray-200 bg-gray-100 opacity-75'}`}>
                        
                        <div className="flex-1 w-full">
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Nama Kategori</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: VIP" 
                                value={tier.name}
                                disabled={!tier.isActive} // Disable kalau OFF
                                onChange={(e) => handleTierChange(index, "name", e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-brand-blue outline-none text-sm font-bold disabled:bg-gray-100 disabled:text-gray-400" 
                                required
                            />
                        </div>

                        <div className="w-full md:w-36">
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Harga (IDR)</label>
                            <input 
                                type="number" 
                                value={tier.price}
                                disabled={!tier.isActive}
                                onChange={(e) => handleTierChange(index, "price", e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-brand-blue outline-none text-sm font-mono disabled:bg-gray-100 disabled:text-gray-400" 
                                required min="0"
                            />
                        </div>

                        <div className="w-full md:w-24">
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Stok</label>
                            <input 
                                type="number" 
                                value={tier.stock}
                                disabled={!tier.isActive}
                                onChange={(e) => handleTierChange(index, "stock", e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-brand-blue outline-none text-sm disabled:bg-gray-100 disabled:text-gray-400" 
                                required min="1"
                            />
                        </div>

                        {/* TOMBOL ON/OFF (SWITCH) */}
                        <div className="flex flex-col items-center">
                            <label className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase">Status</label>
                            <button 
                                type="button"
                                onClick={() => toggleTierStatus(index)}
                                className={`relative w-12 h-7 rounded-full transition-colors flex items-center px-1 ${tier.isActive ? 'bg-brand-blue' : 'bg-gray-300'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${tier.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {ticketTiers.length > 1 && (
                            <button type="button" onClick={() => removeTier(index)} className="p-2 bg-white border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 mb-[2px]">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* SECTION 3 & 4 (Gambar & Deskripsi) - Sama seperti sebelumnya */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Upload size={18} className="text-brand-blue" /> Poster Event
            </h3>
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-brand-blue/30 bg-blue-50/30 rounded-2xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-white border border-gray-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm"><Upload size={20} /></div>
                <p className="text-sm font-bold text-gray-700">Upload Poster</p>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
            {previewImages.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {previewImages.map((src, idx) => (
                        <div key={idx} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={src} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Deskripsi</h3>
            <textarea name="description" rows={5} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all"></textarea>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/organizer" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Batal</Link>
            <button type="submit" disabled={isLoading} className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand-blue/20 active:scale-95 transition-all">
                {isLoading ? "Menyimpan..." : "Publish Event"}
            </button>
        </div>

      </form>
    </div>
  );
}