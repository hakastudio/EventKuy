
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
    console.error("Missing URL or Anon Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, anonKey);

async function verifyLogin() {
    console.log("Attempting login with Client SDK...");
    const email = 'superadmin@eventkuy.com';
    const password = 'password123';

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("❌ LOGIN FAILED:", error.message);
        console.error("Error Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ LOGIN SUCCESS!");
        console.log("User ID:", data.user.id);
        console.log("Email:", data.user.email);
        
        // Check Profile Role
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
        
        if (profileError) {
            console.error("❌ Could not fetch profile:", profileError.message);
        } else {
            console.log("Also fetched Profile:", profile);
        }
    }
}

verifyLogin();
