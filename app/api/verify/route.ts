import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 });

  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .or(`id.eq.${id},feda_id.eq.${id}`)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
  }

  return NextResponse.json(data);
}
