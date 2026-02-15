"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function EditTicketsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTiers() {
      const { data } = await supabase.from("ticket_tiers").select("*").eq("event_id", id);
      if (data) setTiers(data);
      setLoading(false);
    }
    fetchTiers();
  }, [id]);

  const addTier = () => {
    setTiers([...tiers, { event_id: id, name: "", price: 0, quota: 0 }]);
  };

  const updateTier = (index: number, field: string, value: any) => {
    const newTiers = [...tiers];
    newTiers[index][field] = value;
    setTiers(newTiers);
  };

  const deleteTier = async (tierId: string, index: number) => {
    if (tierId && confirm("Hapus kategori ini?")) {
      await supabase.from("ticket_tiers").delete().eq("id", tierId);
    }
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const saveTiers = async () => {
    setLoading(true);
    try {
      // Filter mana yang update (punya ID) dan mana yang baru (gak punya ID)
      const toUpdate = tiers.filter((t) => t.id);
      const toInsert = tiers.filter((t) => !t.id).map(({ id: _, ...rest }) => ({ ...rest, event_id: id }));

      if (toUpdate.length > 0) {
        const { error: err1 } = await supabase.from("ticket_tiers").upsert(toUpdate);
        if (err1) throw err1;
      }

      if (toInsert.length > 0) {
        const { error: err2 } = await supabase.from("ticket_tiers").insert(toInsert);
        if (err2) throw err2;
      }

      alert("✅ Sukses: Kategori Tiket Disimpan!");
      router.back();
    } catch (err: any) {
      alert("Gagal simpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-blue-500 font-black italic uppercase text-[10px] tracking-widest animate-pulse">Syncing Tiers...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        <div className="flex justify-between items-center">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-white flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-all">
            <ArrowLeft size={14}/> Back
          </button>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-right leading-none">
            TICKET<br/><span className="text-blue-600">CATEGORIES.</span>
          </h1>
        </div>

        <div className="space-y-3">
          {tiers.map((tier, index) => (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={index} 
              className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-wrap md:flex-nowrap items-end gap-4 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              <div className="flex-1 space-y-1">
                <label className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Category Name</label>
                <input type="text" value={tier.name} onChange={(e) => updateTier(index, "name", e.target.value)} placeholder="VIP / REGULAR" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:border-blue-500 outline-none transition-all font-bold"/>
              </div>
              <div className="w-full md:w-32 space-y-1">
                <label className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Price (Rp)</label>
                <input type="number" value={tier.price} onChange={(e) => updateTier(index, "price", parseInt(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:border-blue-500 outline-none transition-all font-bold"/>
              </div>
              <div className="w-full md:w-24 space-y-1">
                <label className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Quota</label>
                <input type="number" value={tier.quota} onChange={(e) => updateTier(index, "quota", parseInt(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs focus:border-blue-500 outline-none transition-all font-bold"/>
              </div>
              <button onClick={() => deleteTier(tier.id, index)} className="p-3 bg-red-900/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-900/20">
                <Trash2 size={16}/>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={addTier} className="flex-1 bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-center gap-3 text-[9px] font-black uppercase hover:bg-white/10 transition-all tracking-widest">
            <Plus size={14}/> Add Category
          </button>
          <button onClick={saveTiers} disabled={loading} className="flex-1 bg-blue-600 p-4 rounded-2xl flex items-center justify-center gap-3 text-[9px] font-black uppercase hover:bg-blue-500 transition-all tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Save size={14}/> {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}