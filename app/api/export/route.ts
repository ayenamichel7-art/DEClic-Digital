import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
  const authError = requireAdminAuth(req);
  if (authError) return authError;

  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, product, amount, email, name, phone, timestamp, checked_in')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Génération du CSV compatible Excel (UTF-8 avec BOM et séparateur ;)
  const header = ['ID', 'Produit', 'Montant', 'Email', 'Nom', 'Telephone', 'Presence', 'Date'];
  const rows = (tickets || []).map(t => [
    t.id,
    t.product,
    t.amount,
    t.email,
    t.name,
    t.phone,
    t.checked_in ? 'PRESENT' : 'ABSENT',
    new Date(t.timestamp).toLocaleString('fr-FR')
  ].map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(';'));

  const csv = '\uFEFF' + [header.join(';'), ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="rapport_declic_digital_2026.csv"'
    }
  });
}
