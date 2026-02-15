import { createClient } from "@/utils/supabase/server";
import { Activity, ShoppingCart, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SystemLogs() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");

  // 1. AMBIL DATA REAL (Tiket & Event)
  const { data: tickets } = await supabase.from("tickets").select("created_at, id, customer_name, price_paid").order("created_at", { ascending: false }).limit(10);
  const { data: events } = await supabase.from("events").select("created_at, title").order("created_at", { ascending: false }).limit(5);

  // 2. Gabungkan Jadi Satu Array "LOGS"
  const logs = [
    ...(tickets || []).map(t => ({
      type: "TRANSACTION",
      message: `User ${t.customer_name || 'Guest'} membeli tiket #${t.id}`,
      amount: t.price_paid,
      time: t.created_at,
      status: "SUCCESS"
    })),
    ...(events || []).map(e => ({
      type: "EVENT_CREATE",
      message: `Event baru "${e.title}" berhasil dipublish`,
      time: e.created_at,
      status: "INFO"
    })),
    // Dummy Error Log (Biar ada variasi warna)
    {
      type: "SYSTEM",
      message: "Gagal memproses pembayaran ID #PAY-9982 (Timeout)",
      time: new Date().toISOString(), // Waktu sekarang
      status: "ERROR"
    }
  ];

  // 3. Urutkan dari yang paling baru
  logs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <div className="max-w-5xl mx-auto">
       <div className="mb-8">
           <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
             <Activity className="text-brand-blue" /> System Logs
           </h1>
           <p className="text-gray-500">Rekaman aktivitas real-time yang terjadi di dalam platform.</p>
       </div>

       {/* CARD LOGS */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
             <h3 className="font-bold text-gray-700">Aktivitas Terbaru</h3>
             <span className="text-xs font-mono text-gray-400">Live Monitoring</span>
          </div>

          <div className="divide-y divide-gray-100">
             {logs.map((log, idx) => (
               <div key={idx} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors group">
                  
                  {/* ICON INDICATOR */}
                  <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${
                      log.status === "SUCCESS" ? "bg-green-100 text-green-600" :
                      log.status === "ERROR" ? "bg-red-100 text-red-600" :
                      "bg-blue-100 text-blue-600"
                  }`}>
                      {log.type === "TRANSACTION" && <ShoppingCart size={18} />}
                      {log.type === "EVENT_CREATE" && <Calendar size={18} />}
                      {log.type === "SYSTEM" && <AlertCircle size={18} />}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-gray-900">{log.message}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock size={12} />
                              {new Date(log.time).toLocaleTimeString()}
                          </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              log.status === "SUCCESS" ? "bg-green-50 text-green-700" :
                              log.status === "ERROR" ? "bg-red-50 text-red-700" :
                              "bg-blue-50 text-blue-700"
                          }`}>
                              {log.status}
                          </span>
                          <span className="text-xs text-gray-400">
                              {new Date(log.time).toLocaleDateString()}
                          </span>
                      </div>
                  </div>

               </div>
             ))}
          </div>
       </div>
    </div>
  );
}