import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
  const authError = requireAdminAuth(req);
  if (authError) return authError;

  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, feda_id, product, amount, email, name, phone, timestamp, checked_in')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Calcul des statistiques
  const stats = {
    total_count: tickets?.length || 0,
    total_checked_in: tickets?.filter(t => t.checked_in).length || 0,
    total_amount: tickets?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0,
    by_product: tickets?.reduce((acc: any, t) => {
      acc[t.product] = (acc[t.product] || 0) + 1;
      return acc;
    }, {}) || {}
  };

  return NextResponse.json({ stats, tickets });
}
