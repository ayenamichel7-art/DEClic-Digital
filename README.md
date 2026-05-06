# 🎟️ DEClic Digital 2026 - Plateforme de Ticketing

Une solution moderne, serverless et gratuite pour la gestion des tickets de conférence, intégrée avec **FedaPay** pour les paiements et **Supabase** pour le stockage des données.

## 🚀 Architecture
- **Frontend** : HTML5, Vanilla CSS3 (Design Premium & Responsive).
- **Backend** : Vercel Serverless Functions (Node.js).
- **Base de données** : Supabase (PostgreSQL).
- **Paiements** : FedaPay (Bénin & International).
- **Emails** : Nodemailer (SMTP).

## 🛠️ Installation & Configuration

### 1. Prérequis
- Un compte [Supabase](https://supabase.com/).
- Un compte [FedaPay](https://fedapay.com/).
- Un compte [Vercel](https://vercel.com/).

### 2. Configuration Supabase
Exécutez le script SQL situé dans `supabase/migrations/20260506000000_init_schema.sql` dans votre éditeur SQL Supabase pour créer la table des tickets.

### 3. Variables d'Environnement
Créez un fichier `.env` à la racine (ou configurez-les sur Vercel) :

```env
# Supabase
SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# Fedapay
FEDAPAY_SECRET=votre_secret_webhook

# Admin Auth
ADMIN_USER=admin
ADMIN_PASS=password123

# Email (SMTP)
SMTP_HOST=smtp.votre-serveur.com
SMTP_PORT=587
SMTP_USER=votre-email@domaine.com
SMTP_PASS=votre-mot-de-passe
EMAIL_FROM="DEClic Digital" <no-reply@votre-domaine.com>
```

### 4. Lancement en local
```bash
npm install
npm run dev
```

## 📈 Fonctionnalités
- ✅ **Page de vente** : Présentation premium des packs.
- ✅ **Webhook Sécurisé** : Validation automatique des paiements via FedaPay.
- ✅ **Confirmation Client** : Envoi automatique de billet par email.
- ✅ **Dashboard Admin** : Suivi des ventes en temps réel et statistiques.
- ✅ **Export CSV** : Exportation des participants pour le checking à l'entrée.

## 🔒 Sécurité
- Signature HMAC pour toutes les notifications de paiement.
- Authentification Basic Auth pour l'interface administrative.
- Politiques Row Level Security (RLS) sur Supabase.

## 📄 Licence
Ce projet est sous licence **Propriétaire - Tous Droits Réservés**. Toute reproduction, modification ou distribution commerciale est strictement interdite sans autorisation préalable. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---
© 2026 DEClic Digital. Développé pour la réussite des entrepreneurs.
