const nodemailer = require('nodemailer');

/**
 * Envoie un email de confirmation de ticket.
 * @param {string} to Email du destinataire
 * @param {string} ticketId ID du ticket
 * @param {string} product Nom du produit/pack
 * @param {number} amount Montant payé
 */
async function sendConfirmation(to, ticketId, product, amount) {
  // Configuration du transporteur (à adapter avec vos identifiants SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"DEClic Digital" <no-reply@declicdigital.com>',
    to: to,
    subject: `🎟️ Confirmation de votre ticket - ${product}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0D1117; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0D1117; padding: 30px; text-align: center;">
          <h1 style="color: #E91E63; margin: 0; font-size: 24px;">DEClic Digital 2026</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #0D1117;">Merci pour votre inscription !</h2>
          <p>Votre paiement pour la conférence <strong>DEClic Digital</strong> a été confirmé avec succès.</p>
          <div style="background: #F8F9FA; padding: 20px; border-radius: 12px; border: 1px solid #E91E63; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>ID du Ticket :</strong> <span style="color: #E91E63;">${ticketId}</span></p>
            <p style="margin: 5px 0;"><strong>Pack :</strong> ${product}</p>
            <p style="margin: 5px 0;"><strong>Montant :</strong> ${Number(amount).toLocaleString('fr-FR')} FCFA</p>
          </div>
          <p>Veuillez conserver cet email. Votre accès sera validé via le QR-code généré lors de votre achat.</p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            À bientôt !<br>
            <strong>L'équipe DEClic Digital</strong>
          </p>
        </div>
        <div style="background-color: #F8F9FA; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © 2026 DEClic Digital - Cotonou, Bénin
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email envoyé :', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    throw error;
  }
}

module.exports = { sendConfirmation };
