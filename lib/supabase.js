const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Utiliser la clé de service pour contourner les RLS si besoin en backend

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans les variables d\'environnement');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
