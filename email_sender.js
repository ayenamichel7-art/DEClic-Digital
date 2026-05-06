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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #ab1662;">Merci pour votre inscription !</h2>
        <p>Votre paiement pour la conférence <strong>DEClic Digital</strong> a été confirmé.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
          <p><strong>Ticket ID :</strong> ${ticketId}</p>
          <p><strong>Pack choisi :</strong> ${product}</p>
          <p><strong>Montant :</strong> ${Number(amount).toLocaleString('fr-FR')} FCFA</p>
        </div>
        <p>Présentez votre QR-code (disponible sur la page de confirmation) à l'entrée.</p>
        <p>À bientôt !<br>L'équipe DEClic Digital</p>
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
