// Typen für die Harmony Dating App

export interface Benutzer {
  id: string;
  handynummer: string;
  email: string;
  name: string;
  alter: number;
  geschlecht: 'männlich' | 'weiblich' | 'divers';
  suchtGeschlecht: 'männlich' | 'weiblich' | 'alle';
  plz: string;
  entfernungKm: number;
  profilVollstaendig: boolean;
  verifiziert: boolean;
  erstelltAm: Date;
  profilfotos: Profilfoto[];
  interessen: Interesse[];
  lebensstil: Lebensstil;
}

export interface Profilfoto {
  id: string;
  url: string;
  istHauptfoto: boolean;
  reihenfolge: number;
}

export interface Interesse {
  id: string;
  kategorie: 'musik' | 'sport' | 'film' | 'hobby';
  wert: string;
  gewichtung: number;
}

export interface Lebensstil {
  beruf: string;
  raucher: 'ja' | 'nein' | 'gelegentlich';
  alkohol: 'ja' | 'nein' | 'gelegentlich';
  kinder: 'habe' | 'möchte' | 'keine';
  haustiere: 'habe' | 'möchte' | 'allergisch';
  auto: 'habe' | 'brauche' | 'egal';
  wohnsituation: 'eigene_wohnung' | 'wg' | 'bei_eltern';
}

export interface MusikInteressen {
  genres: string[];
  lieblingsKuenstler: string[];
  streamingDienste: string[];
  konzertInteresse: boolean;
  musikrichtungSlider: number; // 1-10 (Klassik bis Metal)
  deutschVsInternational: 'deutsch' | 'international' | 'beides';
  liveMusikVsRadio: 'live' | 'radio' | 'beides';
}

export interface SportInteressen {
  lieblingsSport: string;
  bundesligaVerein?: string;
  sportMachen: boolean;
  sportImTV: boolean;
  fitnessLevel: number; // 1-10 Slider
  stadionBesuche: boolean;
  outdoorVsIndoor: 'outdoor' | 'indoor' | 'beides';
}

export interface HobbyInteressen {
  kochen: { interesse: boolean; skillLevel: number };
  reisen: { interesse: boolean; praeferenz: 'nah' | 'fern' };
  gaming: { interesse: boolean; konsole?: string };
  lesen: { interesse: boolean; genres: string[] };
  handwerk: { interesse: boolean };
  gartenarbeit: { interesse: boolean };
  haustiere: { status: 'habe' | 'möchte' | 'allergisch'; art?: string };
  fotografieren: { interesse: boolean; level: 'handy' | 'profi' };
}

export interface FilmInteressen {
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

export interface Match {
  id: string;
  benutzer1Id: string;
  benutzer2Id: string;
  matchScore: number;
  status: 'pending' | 'matched' | 'blocked';
  erstelltAm: Date;
  gemeinsameInteressen: string[];
  matchBegruendung: string;
}

export interface Chat {
  id: string;
  matchId: string;
  nachrichten: Nachricht[];
  letzteNachricht?: Nachricht;
  erstelltAm: Date;
}

export interface Nachricht {
  id: string;
  senderId: string;
  empfaengerId: string;
  text: string;
  typ: 'text' | 'emoji' | 'foto';
  gelesen: boolean;
  gesendetAm: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RegistrierungDaten {
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

export interface ProfilVervollstaendigung {
  beruf: string;
  lebensstil: Lebensstil;
  musik: MusikInteressen;
  sport: SportInteressen;
  hobby: HobbyInteressen;
  film: FilmInteressen;
  profilfotos: Profilfoto[];
}

// Navigation Types
export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
};

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    background: string;
    surface: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}
