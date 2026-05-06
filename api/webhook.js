const crypto = require('crypto');
const { supabase } = require('../lib/supabase');
const { sendConfirmation } = require('../email_sender');

// Secret fourni par Fedapay
const FEDAPAY_SECRET = process.env.FEDAPAY_SECRET;

/**
 * Lit le corps brut de la requête (nécessaire pour la signature HMAC)
 */
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Vérification de la signature
  const signature = req.headers['x-signature'];
  if (!signature) return res.status(400).send('Signature manquante');

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    return res.status(400).send('Erreur lecture body');
  }

  if (!FEDAPAY_SECRET) {
    console.error('FEDAPAY_SECRET non configuré');
    return res.status(500).send('Configuration error');
  }

  const hmac = crypto.createHmac('sha256', FEDAPAY_SECRET);
  hmac.update(rawBody);
  const expected = hmac.digest('hex');

  // Utilisation de timingSafeEqual pour éviter les attaques temporelles
  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      console.warn('Signature Fedapay invalide');
      return res.status(400).send('Signature invalide');
    }
  } catch (e) {
    return res.status(400).send('Signature invalide');
  }

  const body = JSON.parse(rawBody.toString());
  const event = body.name || '';
  const data = body.data || body;

  // On ne traite que les transactions approuvées
  if (event && !event.includes('approved')) {
    return res.status(200).send('Event ignored');
  }

  const { id: fedaId, amount, customer, metadata } = data;
  const product = metadata?.product || data.product || 'Pack non défini';
  const email = customer?.email || '';
  const name = customer?.firstname || metadata?.name || 'Inconnu';
  const phone = metadata?.phone || customer?.phone_number?.number || '';
  const ticketId = `TICK-${fedaId}`;

  // 1. Sauvegarde dans Supabase
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
    return res.status(500).send('Erreur sauvegarde');
  }

  // 2. Envoi d'email de confirmation
  if (email) {
    try {
      await sendConfirmation(email, ticketId, product, amount);
    } catch (err) {
      console.error('Erreur Email:', err.message);
    }
  }

  res.status(200).send('OK');
};

// IMPORTANT: Désactiver le bodyParser pour accéder au raw body
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
