# 🎵 Harmony - Deutsche Dating App

> **Benutzerfreundliche Dating App für alle Altersgruppen (18-99 Jahre)**

## 🎯 Konzept

Harmony ist eine deutsche Dating App, die sich durch **maximale Benutzerfreundlichkeit** und **interesse-basiertes Matching** auszeichnet. Die App richtet sich an alle Altersgruppen und ist speziell für deutsche Nutzer optimiert.

### ✨ Hauptmerkmale

- 🎵 **Musik-Matching**: Spotify/Apple Music Integration
- ⚽ **Sport-Interessen**: Bundesliga-Vereine, Fitness-Level
- 🎬 **Film-Präferenzen**: Netflix, Tatort, deutsche Serien
- 🎨 **Hobby-System**: Kochen, Reisen, Gaming, Handwerk
- 📱 **Android + Web**: Native App + Progressive Web App
- 🇩🇪 **Deutsche Kultur**: DSGVO-konform, deutsche Server

## 🏗️ Projektstruktur

```
harmony-dating-app/
├── harmony-web/          # React Web-Anwendung
├── harmony-backend/      # Node.js/Express Backend
├── harmony-android/      # Kotlin Android App
├── .cursorrule          # Entwicklungsregeln
└── README.md           # Diese Datei
```

## 🚀 Schnellstart

### 1. Installation
```bash
# Alle Dependencies installieren
npm run install:all
```

### 2. Entwicklung starten
```bash
# Web + Backend parallel starten
npm run dev
```

### 3. Build für Produktion
```bash
# Alles bauen
npm run build
```

## 🎨 Design-Prinzipien

### Benutzerfreundlichkeit (PRIORITÄT #1)
- **Große Buttons** (min. 48dp Touch-Target)
- **Klare Navigation** (max. 5 Hauptbereiche)
- **Hilfe-Button** auf jeder Seite
- **Tutorial** kann nicht übersprungen werden
- **Alle Altersgruppen** (18-99 Jahre)

### Deutsche Besonderheiten
- **Tatort-Präferenz** (wichtig für deutsche Nutzer!)
- **Bundesliga-Vereine** mit Vereins-Logos
- **Deutsche vs. internationale** Musik/Filme
- **Regionale Unterschiede** (Nord/Süd)

## 🔧 Entwicklung

### Web-App (React)
```bash
cd harmony-web
npm run dev
```

### Backend (Node.js)
```bash
cd harmony-backend
npm run dev
```

### Android App (Kotlin)
```bash
cd harmony-android
./gradlew assembleDebug
```

## 📱 Features

### Phase 1 - MVP
- [x] Registrierung (Handy + Email)
- [x] Basis-Profil (Foto, Alter, Interessen)
- [x] Musik-Geschmack (einfach)
- [x] Swipe-System mit großen Buttons
- [x] Chat-System (Text + Emoji)
- [x] Blockieren/Melden Funktion
- [x] PLZ-basierte Umkreis-Suche

### Phase 2 - Premium
- [ ] Premium-Version (9,99€/Monat)
- [ ] Sport-Matching erweitern
- [ ] Film-Präferenzen hinzufügen
- [ ] Gruppen-Feature
- [ ] Event-Vorschläge

### Phase 3 - Community
- [ ] Lokale Events
- [ ] Erfolgsgeschichten
- [ ] Dating-Tipps
- [ ] Partnerschaften

## 🎵 Musik-Matching

```javascript
// Beispiel: Musik-Interessen erfassen
const musikInteressen = {
  genres: ['Pop', 'Rock', 'Schlager', 'Hip-Hop'],
  lieblingsKuenstler: ['Ed Sheeran', 'Adele', 'Die Ärzte'],
  streamingDienste: ['Spotify', 'Apple Music'],
  konzertInteresse: true,
  deutschVsInternational: 'beides'
};
```

## ⚽ Sport & Hobby Matching

```javascript
// Sport-Interessen
const sportInteressen = {
  lieblingsSport: 'Fußball',
  bundesligaVerein: 'Bayern München',
  sportMachen: true,
  fitnessLevel: 7 // 1-10 Slider
};

// Hobby-Interessen
const hobbyInteressen = {
  kochen: { interesse: true, skillLevel: 5 },
  reisen: { interesse: true, praeferenz: 'fern' },
  gaming: { interesse: true, konsole: 'PlayStation' }
};
```

## 🎬 Film & Serien

```javascript
// Film-Präferenzen
const filmInteressen = {
  streamingDienste: ['Netflix', 'Amazon Prime'],
  tatortSchauen: true, // WICHTIG für deutsche Nutzer!
  lieblingsGenres: ['Komödie', 'Action', 'Romantik'],
  kinoDate: true
};
```

## 🔒 Sicherheit & DSGVO

- **Deutsche Server** (DSGVO-konform)
- **Verschlüsselte Datenübertragung**
- **Einwilligung erfassen**
- **Datenlöschung** auf Anfrage
- **Datenexport** möglich

## 💰 Premium Features

### Kostenlos
- 5 Likes pro Tag
- Basis-Matching
- Chat-Funktionen
- Profil bearbeiten

### Premium (9,99€/Monat)
- Unbegrenzte Likes
- Sehen wer mich geliket hat
- Erweiterte Suche
- Profil-Boost
- Keine Werbung

## 🧪 Testing

```bash
# Alle Tests ausführen
npm run test

# Web-Tests
npm run test:web

# Backend-Tests
npm run test:backend
```

## 📊 Analytics

- **Google Analytics 4** für Web
- **Firebase Analytics** für Android
- **Custom Events** für Matching-Verhalten
- **DSGVO-konforme** Datenerfassung

## 🚀 Deployment

### Web-App
- **Vercel** für Frontend
- **Heroku** für Backend
- **MongoDB Atlas** für Datenbank

### Android App
- **Google Play Store**
- **Firebase** für Push-Notifications
- **Crashlytics** für Fehlerberichterstattung

## 📞 Support

- **Hilfe-Button** in der App
- **FAQ** auf der Website
- **Email-Support** auf Deutsch
- **Telefon-Support** für Premium-Nutzer

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

---

**Entwickelt mit ❤️ für deutsche Nutzer aller Altersgruppen**
