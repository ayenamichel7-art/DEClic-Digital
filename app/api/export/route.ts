import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
  const authError = requireAdminAuth(req);
  if (authError) return authError;

  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, product, amount, email, name, phone, timestamp')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Génération du CSV
  const header = ['ID', 'Produit', 'Montant', 'Email', 'Nom', 'Telephone', 'Date'];
  const rows = (tickets || []).map(t => [
    t.id,
    t.product,
    t.amount,
    t.email,
    t.name,
    t.phone,
    t.timestamp
  ].map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(','));

  const csv = [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="tickets_declic_digital.csv"'
    }
  });
}
