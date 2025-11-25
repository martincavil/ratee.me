#!/usr/bin/env node

/**
 * Script de vérification de la configuration Stripe
 * Usage: node scripts/check-stripe-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration Stripe...\n');

// Check .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env.local non trouvé');
  console.log('   Copie .env.local.example vers .env.local\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

// Required Stripe variables
const requiredVars = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_PRO_MONTHLY',
];

const optionalVars = [
  'STRIPE_PRICE_PRO_YEARLY',
  'STRIPE_PRICE_FREE',
];

let hasErrors = false;

console.log('📋 Variables requises :\n');

requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('...') || value.includes('xxx')) {
    console.log(`   ❌ ${varName} : Non configuré`);
    hasErrors = true;
  } else {
    // Mask the value for security
    const masked = value.substring(0, 12) + '...';
    console.log(`   ✅ ${varName} : ${masked}`);
  }
});

console.log('\n📋 Variables optionnelles :\n');

optionalVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('...') || value.includes('xxx')) {
    console.log(`   ⚠️  ${varName} : Non configuré (optionnel)`);
  } else {
    const masked = value.substring(0, 12) + '...';
    console.log(`   ✅ ${varName} : ${masked}`);
  }
});

console.log('\n🔑 Vérification des clés :\n');

// Check if keys look valid
const secretKey = envVars['STRIPE_SECRET_KEY'];
const publishableKey = envVars['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'];

if (secretKey) {
  if (secretKey.startsWith('sk_test_')) {
    console.log('   ✅ Secret key : Mode TEST (bon pour le dev)');
  } else if (secretKey.startsWith('sk_live_')) {
    console.log('   ⚠️  Secret key : Mode LIVE (attention en dev !)');
  } else {
    console.log('   ❌ Secret key : Format invalide');
    hasErrors = true;
  }
}

if (publishableKey) {
  if (publishableKey.startsWith('pk_test_')) {
    console.log('   ✅ Publishable key : Mode TEST (bon pour le dev)');
  } else if (publishableKey.startsWith('pk_live_')) {
    console.log('   ⚠️  Publishable key : Mode LIVE (attention en dev !)');
  } else {
    console.log('   ❌ Publishable key : Format invalide');
    hasErrors = true;
  }
}

// Check if price IDs look valid
const priceMonthly = envVars['STRIPE_PRICE_PRO_MONTHLY'];
if (priceMonthly && !priceMonthly.startsWith('price_')) {
  console.log('   ❌ STRIPE_PRICE_PRO_MONTHLY : Devrait commencer par "price_"');
  hasErrors = true;
}

console.log('\n📁 Fichiers de code :\n');

// Check if required files exist
const requiredFiles = [
  'lib/stripe.ts',
  'app/api/payment/checkout/route.ts',
  'app/api/webhooks/stripe/route.ts',
  'components/pricing/checkout-button.tsx',
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} : Manquant`);
    hasErrors = true;
  }
});

console.log('\n' + '='.repeat(60) + '\n');

if (hasErrors) {
  console.log('❌ Configuration incomplète. Suis le guide : scripts/setup-stripe-products.md\n');
  process.exit(1);
} else {
  console.log('✅ Configuration Stripe OK ! Tu peux maintenant :\n');
  console.log('   1. Lancer l\'app : npm run dev');
  console.log('   2. Tester le checkout : http://localhost:3000/pricing');
  console.log('   3. Écouter les webhooks : stripe listen --forward-to localhost:3000/api/webhooks/stripe\n');
  console.log('📚 Guide complet : scripts/test-stripe-integration.md\n');
}
