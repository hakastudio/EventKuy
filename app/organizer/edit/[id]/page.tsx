"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Upload, Calendar, MapPin, DollarSign, Type, ArrowLeft, X, Plus, Ticket, Users, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STATE TIKET (Default isActive: true)
  const [ticketTiers, setTicketTiers] = useState([
    { name: "Regular", price: 0, stock: 100, isActive: true }
  ]);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      const { data: event, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !event) {
        alert("Event tidak ditemukan!");
        router.push("/organizer");
        return;
      }

      setTitle(event.title);
      if (event.date) {
        const d = new Date(event.date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        setDate(d.toISOString().slice(0, 16));
      }
      setLocation(event.location);
      setDescription(event.description);
      if (event.image_url) setPreviewImages([event.image_url]);

      // Simulasi Data Tiket (Nanti ambil dari tabel tier asli)
      // Disini kita set default isActive: true
      setTicketTiers([
        { name: "Regular / General", price: event.price || 0, stock: 100, isActive: true }
      ]);

      setIsLoading(false);
    };

    fetchEvent();
  }, [params.id]);

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

  // LOGIC TIKET + ON/OFF
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
  
  // FUNGSI TOGGLE SWITCH
  const toggleTierStatus = (index: number) => {
    const newTiers = [...ticketTiers];
    newTiers[index].isActive = !newTiers[index].isActive;
    setTicketTiers(newTiers);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Cari harga termurah HANYA dari yang AKTIF
    const activeTiers = ticketTiers.filter(t => t.isActive);
    const lowestPrice = activeTiers.length > 0 
        ? Math.min(...activeTiers.map(t => Number(t.price))) 
        : 0; // Kalau semua OFF, harga 0 (atau bisa diblokir)

    const finalImage = previewImages.length > 0 ? previewImages[0] : null;

    const { error } = await supabase
      .from("events")
      .update({
        title, date, location, description,
        price: lowestPrice, 
        image_url: finalImage
      })
      .eq("id", params.id);

    if (!error) {
      router.push("/organizer");
      router.refresh();
    } else {
      alert("Gagal update event");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-brand-blue mb-4" size={40} />
            <p className="text-gray-500 font-bold">Mengambil Data Event...</p>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/organizer" className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-brand-blue">
         <ArrowLeft size={20} /> Batal Edit
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Edit Event</h1>
        <p className="text-gray-500 mt-1">Perbarui detail, harga tiket, atau poster eventmu.</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10">
        
        {/* SECTION 1: INFO DASAR */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Type size={18} className="text-brand-blue" /> Informasi Dasar
            </h3>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Event</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal & Waktu</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} required type="datetime-local" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lokasi Venue</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all" />
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 2: KATEGORI TIKET + SWITCH ON/OFF */}
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
                    <div key={index} className={`flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-xl border transition-all ${tier.isActive ? 'border-gray-200' : 'border-gray-200 bg-gray-100 opacity-75'}`}>
                        
                        <div className="flex-1 w-full">
                            <label className="text-xs font-bold text-gray-500 mb-1 block">Nama Kategori</label>
                            <input 
                                type="text" 
                                value={tier.name}
                                disabled={!tier.isActive}
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

                        {/* TOMBOL SWITCH ON/OFF */}
                        <div className="flex flex-col items-center">
                            <label className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase">Status</label>
                            <button 
                                type="button"
                                onClick={() => toggleTierStatus(index)}
                                className={`relative w-12 h-7 rounded-full transition-colors flex items-center px-1 ${tier.isActive ? 'bg-brand-blue' : 'bg-gray-300'}`}
                                title={tier.isActive ? "Klik untuk Nonaktifkan" : "Klik untuk Aktifkan"}
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

        {/* SECTION 3 & 4 (Gambar & Deskripsi) */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Upload size={18} className="text-brand-blue" /> Poster Event
            </h3>
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-brand-blue/30 bg-blue-50/30 rounded-2xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-white border border-gray-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm"><Upload size={20} /></div>
                <p className="text-sm font-bold text-gray-700">Ganti / Tambah Poster</p>
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
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-blue outline-none transition-all"></textarea>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/organizer" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Batal</Link>
            <button type="submit" disabled={isSaving} className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-brand-blue/20 active:scale-95 transition-all">
                {isSaving ? "Update..." : "Update Event"}
            </button>
        </div>

      </form>
    </div>
  );
}