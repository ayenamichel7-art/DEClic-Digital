import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Formats autorisés : "TICK-123456" ou un ID numérique FedaPay
const VALID_ID_PATTERN = /^(TICK-\d{1,20}|\d{1,20})$/;

// --- Rate limiting simple en mémoire ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requêtes par minute par IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function GET(req: Request) {
  // Rate limiting par IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez dans une minute.' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id')?.trim();

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
  }

  // Validation stricte du format pour empêcher l'injection PostgREST
  if (!VALID_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: 'Format d\'ID invalide' }, { status: 400 });
  }

  // Ne sélectionner que les champs NON-sensibles (pas d'email/phone en public)
  const PUBLIC_FIELDS = 'id, product, amount, name, timestamp';

  // Recherche par ticket ID (TICK-xxx)
  const { data: ticketById } = await supabase
    .from('tickets')
    .select(PUBLIC_FIELDS)
    .eq('id', id)
    .single();

  if (ticketById) {
    return NextResponse.json(ticketById);
  }

  // Sinon, recherche par feda_id (ID numérique FedaPay)
  const { data: ticketByFedaId } = await supabase
    .from('tickets')
    .select(PUBLIC_FIELDS)
    .eq('feda_id', id)
    .single();

  if (ticketByFedaId) {
    return NextResponse.json(ticketByFedaId);
  }

  return NextResponse.json({ error: 'Ticket non trouvé' }, { status: 404 });
}

