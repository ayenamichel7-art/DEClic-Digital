import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'password';

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Access denied', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(base64Credentials, 'base64').toString('utf-8').split(':');

  if (user !== adminUser || pass !== adminPass) {
    return new NextResponse('Access denied', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
    });
  }

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
