const { supabase } = require('../lib/supabase');
const auth = require('basic-auth');

module.exports = async (req, res) => {
  // Basic Auth
  const credentials = auth(req);
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'password';

  if (!credentials || credentials.name !== adminUser || credentials.pass !== adminPass) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Access denied');
  }

  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, product, amount, email, name, phone, timestamp')
    .order('timestamp', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Génération du CSV
  const header = ['ID', 'Produit', 'Montant', 'Email', 'Nom', 'Telephone', 'Date'];
  const rows = tickets.map(t => [
    t.id,
    t.product,
    t.amount,
    t.email,
    t.name,
    t.phone,
    t.timestamp
  ].map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(','));

  const csv = [header.join(','), ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="tickets_declic_digital.csv"');
  res.status(200).send(csv);
};
