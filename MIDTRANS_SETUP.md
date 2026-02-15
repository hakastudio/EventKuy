# Panduan Setup Midtrans (Sandbox Mode) 💳

Berikut adalah langkah-langkah lengkap untuk mendapatkan **Server Key** dan **Client Key** agar pembayaran bisa berjalan.

## 1. Daftar & Login Akun Midtrans
1.  Buka [Midtrans Dashboard Register](https://dashboard.midtrans.com/register).
2.  Daftar akun baru (bisa pakai Google).
3.  Setelah login, Anda akan masuk ke Dashboard.

## 2. Pindah ke Mode Sandbox (Testing)
Secara default, akun mungkin masih di mode **Production** (Live). Kita harus pakai **Sandbox** untuk testing.
1.  Lihat pojok kiri atas halaman Dashboard.
2.  Jika tertulis "Production", klik dan ubah menjadi **Sandbox**.
3.  Pastikan labelnya berwarna **Oranye** (Environment: Sandbox).

## 3. Ambil Access Keys
1.  Di menu sebelah kiri, klik **Access Keys**.
2.  Anda akan melihat:
    -   **Merchant ID** (Contoh: G12345678)
    -   **Client Key** (Contoh: `SB-Mid-client-xxxxxx`)
    -   **Server Key** (Contoh: `SB-Mid-server-xxxxxx`)

## 4. Masukkan ke Project Eventkuy
Buka file `.env.local` di project Anda, lalu isi seperti ini:

```env
# ... variable lain ...

# SERVER KEY (Jangan disebar, rahasia!)
MIDTRANS_SERVER_KEY=SB-Mid-server-GANTI_DENGAN_PUNYA_ANDA

# CLIENT KEY (Boleh dilihat publik)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-GANTI_DENGAN_PUNYA_ANDA

# URL KHUSUS SANDBOX (Selalu sama untuk semua orang)
NEXT_PUBLIC_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js
```

> **PENTING:** 
> - Pastikan tidak ada spasi tambahan di akhir key.
> - Pastikan awalan key adalah `SB-Mid-` (menandakan Sandbox).

## 5. Restart Server
Setelah mengubah file `.env.local`, Anda **WAJIB** me-restart server Next.js agar perubahan terbaca.
1.  Di terminal VS Code, tekan `Ctrl + C` untuk stop.
2.  Jalankan lagi: `npm run dev`.

## Troubleshooting
Jika masih muncul error **401 Unauthorized**:
-   Cek kembali apakah Anda salah copy (misal tertukar antara Client Key dan Server Key).
-   Pastikan Anda benar-benar di mode **Sandbox** di dashboard.
-   Pastikan file `.env.local` sudah disimpan (`Ctrl + S`).
