import { Document } from 'mongoose';

// Benutzer Interface
export interface IBenutzer extends Document {
  _id: string;
  handynummer: string;
  email?: string;
  name: string;
  alter: number;
  geschlecht: 'männlich' | 'weiblich' | 'divers';
  suchtGeschlecht: 'männlich' | 'weiblich' | 'alle';
  plz: string;
  entfernungKm: number;
  profilVollstaendig: boolean;
  verifiziert: boolean;
  erstelltAm: Date;
  letzteAktivitaet: Date;
  profilfotos: IProfilfoto[];
  interessen: IInteresse[];
  lebensstil: ILebensstil;
  musikInteressen: IMusikInteressen;
  sportInteressen: ISportInteressen;
  hobbyInteressen: IHobbyInteressen;
  filmInteressen: IFilmInteressen;
  passwort?: string;
  refreshToken?: string;
}

export interface IProfilfoto {
  _id: string;
  url: string;
  istHauptfoto: boolean;
  reihenfolge: number;
  hochgeladenAm: Date;
}

export interface IInteresse {
  _id: string;
  kategorie: 'musik' | 'sport' | 'film' | 'hobby';
  wert: string;
  gewichtung: number;
}

export interface ILebensstil {
  beruf: string;
  raucher: 'ja' | 'nein' | 'gelegentlich';
  alkohol: 'ja' | 'nein' | 'gelegentlich';
  kinder: 'habe' | 'möchte' | 'keine';
  haustiere: 'habe' | 'möchte' | 'allergisch';
  auto: 'habe' | 'brauche' | 'egal';
  wohnsituation: 'eigene_wohnung' | 'wg' | 'bei_eltern';
}

export interface IMusikInteressen {
  genres: string[];
  lieblingsKuenstler: string[];
  streamingDienste: string[];
  konzertInteresse: boolean;
  musikrichtungSlider: number; // 1-10 (Klassik bis Metal)
  deutschVsInternational: 'deutsch' | 'international' | 'beides';
  liveMusikVsRadio: 'live' | 'radio' | 'beides';
}

export interface ISportInteressen {
  lieblingsSport: string;
  bundesligaVerein?: string;
  sportMachen: boolean;
  sportImTV: boolean;
  fitnessLevel: number; // 1-10 Slider
  stadionBesuche: boolean;
  outdoorVsIndoor: 'outdoor' | 'indoor' | 'beides';
}

export interface IHobbyInteressen {
  kochen: { interesse: boolean; skillLevel: number };
  reisen: { interesse: boolean; praeferenz: 'nah' | 'fern' };
  gaming: { interesse: boolean; konsole?: string };
  lesen: { interesse: boolean; genres: string[] };
  handwerk: { interesse: boolean };
  gartenarbeit: { interesse: boolean };
  haustiere: { status: 'habe' | 'möchte' | 'allergisch'; art?: string };
  fotografieren: { interesse: boolean; level: 'handy' | 'profi' };
}

export interface IFilmInteressen {
  streamingDienste: string[];
  tvProgramme: string[];
  kinoGanger: 'ja' | 'nein' | 'gelegentlich';
  lieblingsGenres: string[];
  deutschVsInternational: 'deutsch' | 'international' | 'beides';
  serienVsFilme: 'serien' | 'filme' | 'beides';
  tatortSchauen: boolean; // WICHTIG für deutsche Nutzer!
  dokumentationen: boolean;
  kinoDate: boolean;
  heimkinoVsKino: 'heimkino' | 'kino' | 'beides';
}

// Match Interface
export interface IMatch extends Document {
  _id: string;
  benutzer1Id: string;
  benutzer2Id: string;
  matchScore: number;
  status: 'pending' | 'matched' | 'blocked';
  erstelltAm: Date;
  gemeinsameInteressen: string[];
  matchBegruendung: string;
  benutzer1Liked: boolean;
  benutzer2Liked: boolean;
}

// Chat Interface
export interface IChat extends Document {
  _id: string;
  matchId: string;
  teilnehmer: string[];
  letzteNachricht?: INachricht;
  erstelltAm: Date;
  aktualisiertAm: Date;
}

export interface INachricht extends Document {
  _id: string;
  chatId: string;
  senderId: string;
  empfaengerId: string;
  text: string;
  typ: 'text' | 'emoji' | 'foto';
  gelesen: boolean;
  gesendetAm: Date;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Request Types
export interface RegistrierungRequest {
  handynummer: string;
  smsCode: string;
  email?: string;
  name: string;
  alter: number;
  geschlecht: 'männlich' | 'weiblich' | 'divers';
  suchtGeschlecht: 'männlich' | 'weiblich' | 'alle';
  plz: string;
  entfernung: number;
  wasSuchst: 'Beziehung' | 'Freundschaft' | 'Beides';
}

export interface LoginRequest {
  handynummer: string;
  smsCode?: string;
  email?: string;
  passwort?: string;
}

export interface ProfilUpdateRequest {
  name?: string;
  alter?: number;
  plz?: string;
  entfernungKm?: number;
  lebensstil?: Partial<ILebensstil>;
  musikInteressen?: Partial<IMusikInteressen>;
  sportInteressen?: Partial<ISportInteressen>;
  hobbyInteressen?: Partial<IHobbyInteressen>;
  filmInteressen?: Partial<IFilmInteressen>;
}

export interface MatchingRequest {
  alterMin?: number;
  alterMax?: number;
  entfernungMax?: number;
  nurMitFotos?: boolean;
  nurVerifiziert?: boolean;
  geschlecht?: 'männlich' | 'weiblich' | 'alle';
}

export interface LikeRequest {
  targetUserId: string;
  isSuperLike?: boolean;
}

export interface ChatMessageRequest {
  chatId: string;
  text: string;
  typ?: 'text' | 'emoji' | 'foto';
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  handynummer: string;
  iat: number;
  exp: number;
}

// Socket.IO Types
export interface SocketData {
  userId: string;
  chatId?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

export interface TypingEvent {
  chatId: string;
  userId: string;
  isTyping: boolean;
}

// Error Types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// File Upload Types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// SMS Service Types
export interface SMSService {
  sendSMS(handynummer: string, message: string): Promise<boolean>;
  generateSMSCode(): string;
  validateSMSCode(handynummer: string, code: string): Promise<boolean>;
}

// Email Service Types
export interface EmailService {
  sendEmail(to: string, subject: string, html: string): Promise<boolean>;
  sendWelcomeEmail(email: string, name: string): Promise<boolean>;
  sendVerificationEmail(email: string, token: string): Promise<boolean>;
}

// Matching Algorithm Types
export interface MatchingScore {
  totalScore: number;
  musikScore: number;
  sportScore: number;
  hobbyScore: number;
  filmScore: number;
  gemeinsameInteressen: string[];
  matchBegruendung: string;
}

export interface MatchingFilters {
  alterMin: number;
  alterMax: number;
  entfernungMax: number;
  nurMitFotos: boolean;
  nurVerifiziert: boolean;
  geschlecht?: string;
  plz?: string;
}

// Database Connection Types
export interface DatabaseConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
  };
}

// Rate Limiting Types
export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}

// Environment Variables
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  FRONTEND_URL: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
}
