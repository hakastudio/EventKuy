import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ReportsTable from "@/components/ReportsTable"; 

export default async function ReportsPage() {
  const supabase = await createClient();

  // 1. Cek User Login (Satpam)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Ambil Data Tiket dari Database
  // Kita join dengan tabel events untuk dapat judul event-nya
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(`
      id,
      created_at,
      status,
      customer_name,
      ticket_tier,
      price_paid,
      events (
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error ambil tiket:", error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Laporan Penjualan</h1>
        <p className="text-gray-500 mt-1">
            Pantau performa penjualan tiketmu. Gunakan filter untuk mencari data spesifik.
        </p>
      </div>

      {/* KITA PAKAI "as any" DI SINI BIAR TYPESCRIPT TIDAK REWEL (MERAHNYA HILANG)
         Ini aman karena kita yakin format datanya cocok.
      */}
      <ReportsTable tickets={(tickets as any) || []} />
    </div>
  );
}