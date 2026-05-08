import { NextResponse } from 'next/server';

const FEDAPAY_SECRET = process.env.FEDAPAY_SECRET;
const FEDAPAY_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.fedapay.com/v1' 
  : 'https://sandbox-api.fedapay.com/v1';

// Source de vérité côté serveur — ne JAMAIS faire confiance au prix client
const PRODUCT_PRICES: Record<string, number> = {
  'Simple': 3000,
  'Standard': 5000,
  'Premium': 25000,
  'VIP': 50000,
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    const { name, email, phone, product } = await req.json();

    // --- Validation des champs ---
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide (minimum 2 caractères)' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Numéro de téléphone invalide' }, { status: 400 });
    }

    // --- Validation du produit et prix côté serveur ---
    if (!product || !(product in PRODUCT_PRICES)) {
      return NextResponse.json({ error: `Produit invalide : "${product}"` }, { status: 400 });
    }

    const amount = PRODUCT_PRICES[product];

    if (!FEDAPAY_SECRET) {
      return NextResponse.json({ error: 'FedaPay secret not configured' }, { status: 500 });
    }

    // 1. Create Transaction (avec le prix serveur, pas le prix client)
    const response = await fetch(`${FEDAPAY_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: { iso: 'XOF' },
        description: `Pass ${product} - DEClic Digital`,
        customer: {
          firstname: name.trim(),
          email: email.trim().toLowerCase(),
          phone_number: {
            number: phone.trim(),
            country: 'bj'
          }
        },
        metadata: {
          product: product,
          name: name.trim(),
          phone: phone.trim()
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('FedaPay Error:', data);
      return NextResponse.json({ error: data.message || 'Error creating transaction' }, { status: response.status });
    }

    // 2. Generate Token for Checkout
    const tokenResponse = await fetch(`${FEDAPAY_URL}/transactions/${data.v1.transaction.id}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_SECRET}`,
        'Content-Type': 'application/json',
      }
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: 'Error generating checkout token' }, { status: tokenResponse.status });
    }

    return NextResponse.json({ 
      checkout_url: tokenData.v1.token.url 
    });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
