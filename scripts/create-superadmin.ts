// scripts/create-superadmin.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables dari .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // PENTING: Ini bukan Anon Key!

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY ada di .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createSuperAdmin() {
  const email = 'superadmin@eventkuy.com';
  const password = 'password123'; // Password default sesuai rencana AI

  console.log(`🚀 Membuat Super Admin: ${email}...`);

  // 1. Cek apakah user sudah ada
  const { data: users } = await supabase.auth.admin.listUsers();
  const existingUser = users.users.find(u => u.email === email);

  let userId;

  if (existingUser) {
    console.log('⚠️ User sudah ada, mengupdate password...');
    const { data, error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: password,
      user_metadata: { role: 'super_admin' },
      email_confirm: true
    });
    if (error) throw error;
    userId = existingUser.id;
  } else {
    console.log('✨ Membuat user baru...');
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'super_admin' }
    });
    if (error) throw error;
    userId = data.user.id;
  }

  // 2. Pastikan Profil Terbuat & Role Benar
  console.log('✅ Auth user siap. Sinkronisasi tabel profiles...');
  
  // Kita upsert (update/insert) ke tabel profiles manual untuk memastikan
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email: email,
      role: 'super_admin' // Kunci akses dashboard
    });

  if (profileError) {
    console.error('❌ Gagal update profiles:', profileError.message);
  } else {
    console.log('🎉 SUKSES! Super Admin siap digunakan.');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
  }
}

createSuperAdmin().catch(console.error);