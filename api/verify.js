const { supabase } = require('../lib/supabase');

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: 'ID manquant' });

  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .or(`id.eq.${id},feda_id.eq.${id}`)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Ticket non trouvé' });
  }

  res.json(data);
};
