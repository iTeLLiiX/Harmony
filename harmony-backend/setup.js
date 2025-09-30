#!/usr/bin/env node

/**
 * 🎵 Harmony Backend Setup Script
 * 
 * Dieses Script erstellt automatisch die .env Datei und installiert alle Dependencies
 * für die Harmony Dating App Backend.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎵 Harmony Backend Setup wird gestartet...\n');

// .env Datei erstellen
const envContent = `# 🎵 Harmony Backend Environment Configuration

# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/harmony-dating
DB_NAME=harmony-dating

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@harmony-dating.de

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
FIREBASE_PROJECT_ID=your-firebase-project-id

# Payment (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Push Notifications (Firebase)
FIREBASE_SERVER_KEY=your-firebase-server-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000,https://harmony-dating.de

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-key

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_PREMIUM_FEATURES=true
ENABLE_PAYWALL=true
ENABLE_ONBOARDING=true

# Premium Plans
PREMIUM_MONTHLY_PRICE=9.99
PREMIUM_QUARTERLY_PRICE=24.99
PREMIUM_YEARLY_PRICE=79.99

# Free Limits
FREE_DAILY_LIKES=5
FREE_DAILY_SUPER_LIKES=1
FREE_DAILY_BOOSTS=0

# WebSocket
WEBSOCKET_PORT=3002
WEBSOCKET_CORS_ORIGIN=http://localhost:3000

# Development
DEBUG=harmony:*
HOT_RELOAD=true
`;

try {
  // .env Datei erstellen
  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', envContent);
    console.log('✅ .env Datei erstellt');
  } else {
    console.log('⚠️  .env Datei existiert bereits');
  }

  // .env.example erstellen
  fs.writeFileSync('.env.example', envContent);
  console.log('✅ .env.example Datei erstellt');

  // Dependencies installieren
  console.log('\n📦 Dependencies werden installiert...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installiert');

  // Verzeichnisse erstellen
  const directories = ['logs', 'uploads', 'temp'];
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Verzeichnis ${dir} erstellt`);
    }
  });

  // Git Hooks einrichten
  console.log('\n🔧 Git Hooks werden eingerichtet...');
  const preCommitHook = `#!/bin/sh
# Pre-commit hook für Harmony Backend
echo "🎵 Harmony Pre-commit Hook läuft..."

# ESLint prüfen
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint Fehler gefunden. Commit abgebrochen."
  exit 1
fi

# Tests ausführen
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests fehlgeschlagen. Commit abgebrochen."
  exit 1
fi

echo "✅ Pre-commit Hook erfolgreich"
`;

  if (!fs.existsSync('.git/hooks')) {
    fs.mkdirSync('.git/hooks', { recursive: true });
  }
  
  fs.writeFileSync('.git/hooks/pre-commit', preCommitHook);
  fs.chmodSync('.git/hooks/pre-commit', '755');
  console.log('✅ Pre-commit Hook eingerichtet');

  // Package.json Scripts prüfen
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = [
    'dev', 'start', 'build', 'test', 'lint', 'lint:fix'
  ];

  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.log(`⚠️  Fehlende Scripts in package.json: ${missingScripts.join(', ')}`);
  } else {
    console.log('✅ Alle erforderlichen Scripts vorhanden');
  }

  console.log('\n🎉 Setup erfolgreich abgeschlossen!');
  console.log('\n📋 Nächste Schritte:');
  console.log('1. .env Datei bearbeiten und echte API-Keys eintragen');
  console.log('2. MongoDB starten: mongod');
  console.log('3. Backend starten: npm run dev');
  console.log('4. API testen: http://localhost:3001/health');
  console.log('\n📚 Dokumentation: API_DOCUMENTATION.md');
  console.log('🐛 Probleme? GitHub Issues erstellen');

} catch (error) {
  console.error('❌ Setup fehlgeschlagen:', error.message);
  process.exit(1);
}