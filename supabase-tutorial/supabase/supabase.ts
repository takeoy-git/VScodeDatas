import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";

console.log("✅ Supabase URL:", supabaseUrl || "環境変数が設定されていません");
console.log("✅ Supabase API Key:", supabaseAnonKey || "環境変数が設定されていません");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or API Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
