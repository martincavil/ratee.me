/**
 * Script pour générer un token beta rapidement
 * Usage: node scripts/generate-beta-token.js email@example.com
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim().replace(/^["']|["']$/g, '');
    process.env[key] = value;
  }
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function generateToken(length = 32) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

async function createBetaInvite(email) {
  if (!email) {
    console.error('❌ Usage: node scripts/generate-beta-token.js email@example.com');
    process.exit(1);
  }

  // Vérifier si l'utilisateur existe déjà
  const { data: existingUser } = await supabase.auth.admin.listUsers();
  const userExists = existingUser?.users?.some(u => u.email === email);

  if (userExists) {
    console.error('❌ Un compte existe déjà avec cet email:', email);
    console.log('👉 Utilisez plutôt: http://localhost:3000/auth/login');
    process.exit(1);
  }

  // Générer le token
  const token = generateToken(32);

  // Définir la date d'expiration (7 jours)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Insérer dans beta_invites
  const { error } = await supabase.from('beta_invites').insert({
    email,
    token,
    status: 'pending',
    expires_at: expiresAt.toISOString(),
    trial_duration_days: 30,
  });

  if (error) {
    console.error('❌ Erreur lors de la création du token:', error.message);
    process.exit(1);
  }

  // Générer le lien
  const betaLink = `http://localhost:3000/beta/${token}`;

  console.log('✅ Token beta créé avec succès!');
  console.log('');
  console.log('📧 Email:', email);
  console.log('🔗 Lien beta:', betaLink);
  console.log('⏰ Expire le:', expiresAt.toLocaleDateString('fr-FR'));
  console.log('🎁 Durée du trial: 30 jours');
  console.log('');
  console.log('👉 Envoie ce lien à l\'utilisateur pour qu\'il crée son compte!');
}

// Récupérer l'email depuis les arguments
const email = process.argv[2];
createBetaInvite(email);
