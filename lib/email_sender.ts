import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Envoie un email de confirmation de ticket via Resend.
 * @param to Email du destinataire
 * @param ticketId ID du ticket
 * @param product Nom du produit/pack
 * @param amount Montant payé
 */
export async function sendConfirmation(to: string, ticketId: string, product: string, amount: number) {
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Erreur : RESEND_API_KEY n\'est pas configurée dans les variables d\'environnement.');
    return;
  }

  const from = process.env.EMAIL_FROM || 'DEClic Digital <onboarding@resend.dev>';
  
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: [to],
      subject: `🎟️ Confirmation de votre ticket - ${product}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0F172A; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0F172A; padding: 30px; text-align: center;">
            <h1 style="color: #FF1B6B; margin: 0; font-size: 24px;">DEClic Digital 2026</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #0F172A;">Merci pour votre inscription !</h2>
            <p>Votre paiement pour la conférence <strong>DEClic Digital</strong> a été confirmé avec succès.</p>
            <div style="background: #F8F9FA; padding: 20px; border-radius: 12px; border: 1px solid #FF1B6B; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>ID du Ticket :</strong> <span style="color: #FF1B6B;">${escapeHtml(ticketId)}</span></p>
              <p style="margin: 5px 0;"><strong>Pack :</strong> ${escapeHtml(product)}</p>
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
    });

    if (error) {
      throw error;
    }

    console.log('📧 Email envoyé via Resend :', data?.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur envoi email (Resend) :', error);
    throw error;
  }
}
