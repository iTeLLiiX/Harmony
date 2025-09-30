import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // Für Demo-Zwecke: App ohne Datenbank starten
    console.log('⚠️ App läuft im Demo-Modus ohne Datenbank');
    console.log('✅ Backend bereit für Demo-Tests');
    return;
  } catch (error) {
    console.error('❌ Fehler beim Verbinden zur Datenbank:', error);
    // Für Demo-Zwecke: App trotzdem starten
    console.log('⚠️ App läuft im Demo-Modus ohne Datenbank');
  }
};

export default connectDB;