import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendConfirmation } from '@/lib/email_sender';

const FEDAPAY_SECRET = process.env.FEDAPAY_SECRET;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-signature');
    if (!signature) {
      return new NextResponse('Signature manquante', { status: 400 });
    }

    const rawBody = await req.text();

    if (!FEDAPAY_SECRET) {
      console.error('FEDAPAY_SECRET non configuré');
      return new NextResponse('Configuration error', { status: 500 });
    }

    const hmac = crypto.createHmac('sha256', FEDAPAY_SECRET);
    hmac.update(rawBody);
    const expected = hmac.digest('hex');

    try {
      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
        console.warn('Signature Fedapay invalide');
        return new NextResponse('Signature invalide', { status: 400 });
      }
    } catch (e) {
      return new NextResponse('Signature invalide', { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const event = body.name || '';
    const data = body.data || body;

    if (event && !event.includes('approved')) {
      return new NextResponse('Event ignored', { status: 200 });
    }

    const { id: fedaId, amount, customer, metadata } = data;
    const product = metadata?.product || data.product || 'Pack non défini';
    const email = customer?.email || '';
    const name = customer?.firstname || metadata?.name || 'Inconnu';
    const phone = metadata?.phone || customer?.phone_number?.number || '';
    const ticketId = `TICK-${fedaId}`;

    const { error } = await supabase
      .from('tickets')
      .upsert({
        id: ticketId,
        feda_id: fedaId.toString(),
        product,
        amount,
        email,
        name,
        phone,
        timestamp: new Date().toISOString()
      });

    if (error) {
      console.error('Erreur Supabase:', error.message);
      return new NextResponse('Erreur sauvegarde', { status: 500 });
    }

    if (email) {
      try {
        await sendConfirmation(email, ticketId, product, amount);
      } catch (err: any) {
        console.error('Erreur Email:', err.message);
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
