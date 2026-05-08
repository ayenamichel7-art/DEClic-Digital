import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/auth';

export async function POST(req: Request) {
  // Vérification de l'authentification admin
  const authError = requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { ticketId, status } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: 'ID du ticket manquant' }, { status: 400 });
    }

    // Mise à jour dans Supabase
    const { error } = await supabase
      .from('tickets')
      .update({ checked_in: status })
      .eq('id', ticketId);

    if (error) throw error;

    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    console.error('❌ Erreur Check-in :', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
