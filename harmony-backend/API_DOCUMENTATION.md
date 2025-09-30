# 🎵 Harmony Dating App - API Dokumentation

> **Vollständige API-Dokumentation für die Harmony Dating App**

## 📋 Übersicht

Die Harmony API bietet alle notwendigen Endpunkte für eine moderne Dating-App mit Premium-Features, Onboarding und Paywall-System.

### 🔗 Base URL
```
https://api.harmony-dating.de
```

### 🔐 Authentifizierung
Alle Endpunkte (außer `/health` und `/`) erfordern einen gültigen JWT-Token im Authorization-Header:
```
Authorization: Bearer <token>
```

---

## 🚀 Schnellstart

### 1. Health Check
```http
GET /health
```

### 2. API Status
```http
GET /
```

---

## 👤 Authentifizierung

### Registrierung
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49123456789",
  "password": "sicheresPasswort123",
  "birthDate": "1990-01-01",
  "gender": "male"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "max@example.com",
  "password": "sicheresPasswort123"
}
```

### SMS-Verifizierung
```http
POST /api/auth/verify-sms
Content-Type: application/json

{
  "phone": "+49123456789",
  "code": "123456"
}
```

---

## 👥 Benutzer-Management

### Profil abrufen
```http
GET /api/users/profile/:userId
```

### Profil aktualisieren
```http
PUT /api/users/profile/:userId
Content-Type: application/json

{
  "name": "Max Mustermann",
  "bio": "Ich liebe Musik und Sport",
  "interests": ["Musik", "Sport", "Reisen"],
  "location": {
    "city": "Berlin",
    "zipCode": "10115"
  }
}
```

### Fotos hochladen
```http
POST /api/users/photos
Content-Type: multipart/form-data

photo: <file>
isMain: true
```

### Einstellungen abrufen
```http
GET /api/users/settings/:userId
```

---

## 💕 Matching-System

### Potentielle Matches abrufen
```http
GET /api/matching/profiles/:userId?limit=10&offset=0
```

### Profil liken
```http
POST /api/matching/like
Content-Type: application/json

{
  "userId": "user123",
  "likedUserId": "user456"
}
```

### Profil disliken
```http
POST /api/matching/dislike
Content-Type: application/json

{
  "userId": "user123",
  "dislikedUserId": "user456"
}
```

### Matches abrufen
```http
GET /api/matching/matches/:userId
```

### "Wer hat mich geliket?" (Premium)
```http
GET /api/matching/who-liked-me/:userId
```

---

## 💬 Chat-System

### Konversationen abrufen
```http
GET /api/chat/conversations/:userId
```

### Nachrichten abrufen
```http
GET /api/chat/messages/:conversationId?limit=50&offset=0
```

### Nachricht senden
```http
POST /api/chat/message
Content-Type: application/json

{
  "conversationId": "conv123",
  "senderId": "user123",
  "content": "Hallo! Wie geht's?",
  "type": "text"
}
```

### Nachricht als gelesen markieren
```http
POST /api/chat/mark-read
Content-Type: application/json

{
  "conversationId": "conv123",
  "userId": "user123"
}
```

---

## ⭐ Premium-Features

### Premium-Status abrufen
```http
GET /api/premium/status/:userId
```

### Premium-Features abrufen
```http
GET /api/premium/features/:userId
```

### Abonnement verwalten
```http
PUT /api/premium/subscription/:userId
Content-Type: application/json

{
  "planId": "monthly",
  "autoRenew": true
}
```

---

## 🔔 Benachrichtigungen

### Benachrichtigungen abrufen
```http
GET /api/notifications/:userId?limit=20&offset=0
```

### Push-Benachrichtigung senden
```http
POST /api/notifications/push
Content-Type: application/json

{
  "userId": "user123",
  "title": "Neue Nachricht!",
  "body": "Du hast eine neue Nachricht von Max",
  "data": {
    "conversationId": "conv123"
  }
}
```

### Benachrichtigungseinstellungen
```http
PUT /api/notifications/settings/:userId
Content-Type: application/json

{
  "pushEnabled": true,
  "emailEnabled": true,
  "matchNotifications": true,
  "messageNotifications": true
}
```

---

## 📊 Analytics

### Event tracken
```http
POST /api/analytics/track
Content-Type: application/json

{
  "userId": "user123",
  "event": "profile_view",
  "properties": {
    "viewedUserId": "user456",
    "source": "matching"
  }
}
```

### Analytics-Dashboard
```http
GET /api/analytics/dashboard/:userId
```

### Benutzer-Statistiken
```http
GET /api/analytics/user-stats/:userId
```

---

## 📁 File Upload

### Bild hochladen
```http
POST /api/upload/image
Content-Type: multipart/form-data

file: <image-file>
type: "profile"
userId: "user123"
```

### Bild löschen
```http
DELETE /api/upload/image/:imageId
```

---

## 🎯 Onboarding

### Onboarding-Schritte abrufen
```http
GET /api/onboarding/steps/:userId
```

### Schritt abschließen
```http
POST /api/onboarding/step/:userId/:stepId
Content-Type: application/json

{
  "data": {
    "name": "Max Mustermann",
    "age": 30,
    "interests": ["Musik", "Sport"]
  }
}
```

### Onboarding-Fortschritt
```http
GET /api/onboarding/progress/:userId
```

### Onboarding abschließen
```http
POST /api/onboarding/complete/:userId
```

---

## 💰 Paywall-System

### Feature-Zugang prüfen
```http
GET /api/paywall/check/:userId/:feature
```

### Upgrade-Optionen
```http
GET /api/paywall/upgrade-options/:userId
```

### Upgrade durchführen
```http
POST /api/paywall/upgrade/:userId
Content-Type: application/json

{
  "planId": "monthly",
  "paymentMethod": "credit_card"
}
```

### "Später erinnern"
```http
POST /api/paywall/remind-later/:userId
Content-Type: application/json

{
  "feature": "unlimited_likes",
  "remindInHours": 24
}
```

### Feature-Limits
```http
GET /api/paywall/feature-limits/:userId
```

---

## 📱 WebSocket Events

### Verbindung
```javascript
const socket = io('https://api.harmony-dating.de');

// Authentifizierung
socket.emit('authenticate', { token: 'jwt-token' });
```

### Chat-Events
```javascript
// Nachricht empfangen
socket.on('message', (data) => {
  console.log('Neue Nachricht:', data);
});

// Typing-Indikator
socket.on('typing', (data) => {
  console.log('Benutzer tippt:', data);
});

// Nachricht senden
socket.emit('send_message', {
  conversationId: 'conv123',
  content: 'Hallo!',
  type: 'text'
});
```

---

## 🔒 Fehlerbehandlung

### Standard-Fehlerantworten

#### 400 - Bad Request
```json
{
  "success": false,
  "message": "Ungültige Anfrage",
  "errors": [
    {
      "field": "email",
      "message": "E-Mail-Adresse ist ungültig"
    }
  ]
}
```

#### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Nicht autorisiert",
  "code": "UNAUTHORIZED"
}
```

#### 403 - Forbidden
```json
{
  "success": false,
  "message": "Zugriff verweigert",
  "code": "FORBIDDEN"
}
```

#### 404 - Not Found
```json
{
  "success": false,
  "message": "Ressource nicht gefunden",
  "code": "NOT_FOUND"
}
```

#### 429 - Rate Limited
```json
{
  "success": false,
  "message": "Zu viele Anfragen",
  "code": "RATE_LIMITED",
  "retryAfter": 60
}
```

#### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Interner Serverfehler",
  "code": "INTERNAL_ERROR"
}
```

---

## 📈 Rate Limiting

### Limits
- **Authentifizierung**: 5 Anfragen/Minute
- **API-Endpunkte**: 100 Anfragen/Minute
- **File Upload**: 10 Anfragen/Minute
- **WebSocket**: 1000 Events/Minute

### Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 🧪 Testing

### Test-Umgebung
```bash
# Backend starten
cd harmony-backend
npm run dev

# Tests ausführen
npm test
```

### Beispiel-Anfragen
```bash
# Health Check
curl https://api.harmony-dating.de/health

# Registrierung
curl -X POST https://api.harmony-dating.de/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## 📚 SDKs und Libraries

### JavaScript/TypeScript
```bash
npm install @harmony/api-client
```

```javascript
import { HarmonyAPI } from '@harmony/api-client';

const api = new HarmonyAPI({
  baseURL: 'https://api.harmony-dating.de',
  token: 'your-jwt-token'
});

// Benutzer registrieren
const user = await api.auth.register({
  name: 'Max Mustermann',
  email: 'max@example.com',
  password: 'password123'
});
```

### React Hook
```javascript
import { useHarmonyAPI } from '@harmony/api-client/react';

function ProfileComponent() {
  const { data: profile, loading, error } = useHarmonyAPI('/users/profile/123');
  
  if (loading) return <div>Laden...</div>;
  if (error) return <div>Fehler: {error.message}</div>;
  
  return <div>{profile.name}</div>;
}
```

---

## 🔧 Entwicklung

### Setup
```bash
# Repository klonen
git clone https://github.com/iTeLLiiX/Harmony.git
cd Harmony

# Dependencies installieren
npm run install:all

# Environment konfigurieren
cp .env.example .env
# .env bearbeiten

# Anwendung starten
npm run dev
```

### Code-Standards
- **ESLint**: Code-Qualität
- **Prettier**: Code-Formatierung
- **TypeScript**: Typsicherheit
- **Jest**: Unit-Tests
- **Supertest**: API-Tests

---

## 📞 Support

### Dokumentation
- **API Docs**: https://docs.harmony-dating.de
- **SDK Docs**: https://sdk.harmony-dating.de
- **Changelog**: https://changelog.harmony-dating.de

### Kontakt
- **Email**: api-support@harmony-dating.de
- **Discord**: https://discord.gg/harmony
- **GitHub**: https://github.com/iTeLLiiX/Harmony

---

**Entwickelt mit ❤️ für die deutsche Dating-Community**