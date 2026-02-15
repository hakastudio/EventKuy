"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Calendar, MapPin, Save, Loader2, Plus, Trash2, Upload, AlignLeft } from "lucide-react";

export default function NewEventPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Music",
  });

  const [ticketTiers, setTicketTiers] = useState([{ name: "Regular", price: 0, quota: 100 }]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateTier = (index: number, field: string, value: any) => {
    const newTiers = [...ticketTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTicketTiers(newTiers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Pilih poster dulu Bos!");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Login dulu Bos!");

      // 1. Upload Poster
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`event-posters/${fileName}`, imageFile);

      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(`event-posters/${fileName}`);

      // 2. Insert Event
      const { data: event, error: eventError } = await supabase
        .from("events")
        .insert([{ ...formData, image_url: publicUrl, organizer_id: user.id }])
        .select().single();

      if (eventError) throw eventError;

      // 3. Insert Tiers
      const tiersToInsert = ticketTiers.map(tier => ({
        event_id: event.id,
        name: tier.name,
        price: tier.price,
        quota: tier.quota
      }));
      await supabase.from("ticket_tiers").insert(tiersToInsert);

      alert("BERHASIL! Event sudah live.");
      router.push("/organizer");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-8 text-left">
        
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <header>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            PUBLISH <span className="text-cyan-500 text-5xl">EVENT.</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: UPLOAD & INFO */}
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6">
            
            {/* Upload Area Proposional */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Poster Poster</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-48 bg-black border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-all overflow-hidden group"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="mx-auto text-slate-700 group-hover:text-cyan-500 transition-colors" size={24} />
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Select Image File</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Event Title</label>
              <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-bold focus:border-cyan-500 outline-none" placeholder="Name of your event" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Date</label>
                <input required type="date" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-bold focus:border-cyan-500 outline-none text-white" onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Category</label>
                <select className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-bold focus:border-cyan-500 outline-none text-white" onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Music">Music</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Exhibition">Exhibition</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Location</label>
              <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-bold focus:border-cyan-500 outline-none" placeholder="Venue or City" onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </div>

            {/* DESKRIPSI (KEMBALI HADIR) */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Description</label>
              <div className="relative">
                <textarea 
                  required 
                  rows={4}
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 pl-12 text-sm font-bold focus:border-cyan-500 outline-none transition-all" 
                  placeholder="Tell them about the event..." 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
                <AlignLeft className="absolute left-4 top-4 text-slate-700" size={18} />
              </div>
            </div>
          </div>

          {/* SECTION 2: TIKET */}
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black italic uppercase text-cyan-500 tracking-widest">Ticket Tiers.</h3>
              <button type="button" onClick={() => setTicketTiers([...ticketTiers, { name: "", price: 0, quota: 0 }])} className="p-2 bg-cyan-600/10 text-cyan-500 rounded-lg hover:bg-cyan-600 hover:text-white transition-all">
                <Plus size={16}/>
              </button>
            </div>
            
            <div className="space-y-3">
              {ticketTiers.map((tier, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end bg-black/40 p-4 rounded-2xl border border-white/5 group/tier">
                  <div className="col-span-4 space-y-1">
                    <label className="text-[7px] font-black text-slate-600 uppercase">Tier Name</label>
                    <input required className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-[10px] font-bold" placeholder="VIP" value={tier.name} onChange={(e) => updateTier(index, "name", e.target.value)} />
                  </div>
                  <div className="col-span-4 space-y-1">
                    <label className="text-[7px] font-black text-slate-600 uppercase">Price</label>
                    <input required type="number" className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-[10px] font-bold" value={tier.price} onChange={(e) => updateTier(index, "price", parseInt(e.target.value))} />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <label className="text-[7px] font-black text-slate-600 uppercase">Qty</label>
                    <input required type="number" className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-[10px] font-bold" value={tier.quota} onChange={(e) => updateTier(index, "quota", parseInt(e.target.value))} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button type="button" onClick={() => setTicketTiers(ticketTiers.filter((_, i) => i !== index))} className="p-2 text-slate-700 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button disabled={loading} className="w-full bg-cyan-600 p-5 rounded-[1.5rem] font-black italic uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 shadow-xl shadow-cyan-900/20">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Publish Event</>}
          </button>
        </form>
      </div>
    </div>
  );
}