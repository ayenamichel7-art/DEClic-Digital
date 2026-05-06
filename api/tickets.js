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
    .select('id, feda_id, product, amount, email, name, phone, timestamp')
    .order('timestamp', { ascending: false });


  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Calcul des statistiques
  const stats = {
    total_count: tickets.length,
    total_amount: tickets.reduce((sum, t) => sum + Number(t.amount || 0), 0),
    by_product: tickets.reduce((acc, t) => {
      acc[t.product] = (acc[t.product] || 0) + 1;
      return acc;
    }, {})
  };

  res.json({ stats, tickets });
};
