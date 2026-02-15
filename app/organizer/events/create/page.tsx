"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { 
  ArrowLeft, Upload, Calendar, MapPin, 
  Tag, Save, Plus, Trash2 
} from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // FIX: Nilai awal string kosong ('') mencegah error uncontrolled input
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
  });

  const [tickets, setTickets] = useState([
    { name: 'Festival', price: 150000, stock: 100 }
  ]);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addTicket = () => setTickets([...tickets, { name: '', price: 0, stock: 0 }]);
  
  const removeTicket = (index: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Ambil User & Pastikan Login
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Sesi berakhir, silakan login kembali.");

      let image_url = "";

      // 2. Upload Gambar (Gunakan Timestamp agar nama file unik)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('event-posters')
          .upload(fileName, imageFile);

        if (uploadError) throw new Error("Gagal Upload Gambar: " + uploadError.message);

        const { data: urlData } = supabase.storage
          .from('event-posters')
          .getPublicUrl(fileName);
        
        image_url = urlData.publicUrl;
      }

      // 3. Masukkan ke Database (Gunakan Payload tunggal)
      const payload: any = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: new Date(formData.date).toISOString(),
        image_url: image_url,
        user_id: user.id,
        tickets: tickets 
      };

      const { error: insertError } = await supabase
        .from('events')
        .insert([payload]);

      if (insertError) throw new Error("Gagal Simpan Database: " + insertError.message);

      alert("🎉 BOOM! Event Berhasil Dipublikasikan!");
      router.push("/organizer");
      router.refresh();

    } catch (err: any) {
      console.error("DEBUG ERROR:", err);
      alert(err.message || "Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all">
          <ArrowLeft size={20} /> Kembali
        </button>

        <h1 className="text-4xl font-black italic tracking-tighter mb-10 uppercase">Buat Event Baru.</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* UPLOAD SECTION */}
          <div className="lg:col-span-4">
            <div 
              onClick={handleImageClick}
              className="aspect-[3/4] bg-[#111318] border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 overflow-hidden relative group"
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center p-6">
                  <div className="p-4 bg-blue-500/10 rounded-full text-blue-500 mb-4 inline-block">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest">Klik Untuk Upload Poster</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#111318] p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl">
              <div>
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Judul Event</label>
                <input 
                  placeholder="Nama Event Bos..." 
                  className="w-full bg-transparent text-3xl font-black outline-none italic" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-blue-500" size={18} />
                  <input 
                    placeholder="Lokasi" 
                    className="w-full bg-white/5 p-4 pl-12 rounded-2xl outline-none focus:bg-white/10 transition-all border border-transparent focus:border-white/5" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    required 
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-blue-500" size={18} />
                  <input 
                    type="datetime-local" 
                    className="w-full bg-white/5 p-4 pl-12 rounded-2xl outline-none focus:bg-white/10 transition-all text-gray-400" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <textarea 
                placeholder="Deskripsi detail..." 
                className="w-full bg-white/5 p-4 rounded-2xl outline-none h-32 resize-none focus:bg-white/10 transition-all" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* TICKET SECTION */}
            <div className="bg-[#111318] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black italic flex items-center gap-2 uppercase tracking-tight"><Tag size={20} className="text-blue-500" /> Kategori Tiket</h3>
                <button type="button" onClick={addTicket} className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black hover:bg-blue-500 hover:text-white transition-all">+ TAMBAH</button>
              </div>
              
              <div className="space-y-3">
                {tickets.map((ticket, index) => (
                  <div key={index} className="flex gap-3 bg-black/20 p-4 rounded-2xl items-center border border-white/5 group hover:border-blue-500/20 transition-all">
                    <input 
                      placeholder="Nama Tiket" 
                      className="flex-1 bg-transparent outline-none font-bold" 
                      value={ticket.name} 
                      onChange={e => {
                        const newTicks = [...tickets];
                        newTicks[index].name = e.target.value;
                        setTickets(newTicks);
                      }} 
                    />
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                      <span className="text-[10px] text-gray-500 font-bold">RP</span>
                      <input 
                        type="number" 
                        className="w-24 bg-transparent outline-none text-sm font-bold" 
                        value={ticket.price} 
                        onChange={e => {
                          const newTicks = [...tickets];
                          newTicks[index].price = parseInt(e.target.value) || 0;
                          setTickets(newTicks);
                        }} 
                      />
                    </div>
                    <button type="button" onClick={() => removeTicket(index)} className="text-gray-600 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-blue-600 p-6 rounded-[2rem] font-black italic text-xl tracking-tighter hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>SEDANG MEMPROSES...</span>
                </div>
              ) : "PUBLIKASIKAN EVENT SEKARANG"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}