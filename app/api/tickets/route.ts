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
    .select('id, feda_id, product, amount, email, name, phone, timestamp')
    .order('timestamp', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Calcul des statistiques
  const stats = {
    total_count: tickets?.length || 0,
    total_amount: tickets?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0,
    by_product: tickets?.reduce((acc: any, t) => {
      acc[t.product] = (acc[t.product] || 0) + 1;
      return acc;
    }, {}) || {}
  };

  return NextResponse.json({ stats, tickets });
}
