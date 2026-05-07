import { NextResponse } from 'next/server';

const FEDAPAY_SECRET = process.env.FEDAPAY_SECRET;
const FEDAPAY_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.fedapay.com/v1' 
  : 'https://sandbox-api.fedapay.com/v1';

export async function POST(req: Request) {
  try {
    const { name, email, phone, product, amount } = await req.json();

    if (!FEDAPAY_SECRET) {
      return NextResponse.json({ error: 'FedaPay secret not configured' }, { status: 500 });
    }

    // 1. Create Transaction
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
          firstname: name,
          email: email,
          phone_number: {
            number: phone,
            country: 'bj' // Default to Benin
          }
        },
        metadata: {
          product: product,
          name: name,
          phone: phone
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
