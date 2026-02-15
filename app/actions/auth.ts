// app/actions/auth.ts
import { supabase } from "@/utils/supabase/client";

export async function signUpUser(email: string, password: string, role: string = 'user') {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: role } // Ini akan ditangkap oleh Trigger SQL tadi
    }
  });
  return { data, error };
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}