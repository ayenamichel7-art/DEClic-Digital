import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://dummy.supabase.co';
// Use service role key for backend operations (bypassing RLS)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️ SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans les variables d\'environnement');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
