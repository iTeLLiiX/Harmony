// Erweiterte TypeScript-Typen für die Harmony Dating App

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// User Types
export interface IUser {
  _id: string;
  handynummer: string;
  email?: string;
  name: string;
  age: number;
  gender: 'männlich' | 'weiblich' | 'divers';
  lookingFor: 'männlich' | 'weiblich' | 'alle';
  zipCode: string;
  distance: number;
  whatLookingFor: 'Beziehung' | 'Freundschaft' | 'Beides';
  photos: IPhoto[];
  bio?: string;
  interests: string[];
  musicInterests: IMusikInteressen;
  sportInterests: ISportInteressen;
  filmInterests: IFilmInteressen;
  hobbyInterests: IHobbyInteressen;
  personality: IPersoenlichkeit;
  verification: IVerification;
  premium: IPremium;
  privacy: IPrivacy;
  stats: IStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
  uploadedAt: Date;
}

export interface IMusikInteressen {
  genres: string[];
  artists: string[];
  streamingServices: string[];
  concertInterest: boolean;
  deutschVsInternational: 'deutsch' | 'international' | 'beides';
}

export interface ISportInteressen {
  favoriteSport: string;
  bundesligaClub?: string;
  sportActivity: boolean;
  fitnessLevel: number; // 1-10
  outdoorActivities: string[];
}

export interface IFilmInteressen {
  streamingServices: string[];
  watchTatort: boolean;
  favoriteGenres: string[];
  cinemaPreference: 'kino' | 'heimkino' | 'beides';
}

export interface IHobbyInteressen {
  cooking: { interest: boolean; skillLevel: number };
  traveling: { interest: boolean; preference: 'nah' | 'fern' };
  gaming: { interest: boolean; console?: string };
  crafts: { interest: boolean; types: string[] };
}

export interface IPersoenlichkeit {
  traits: string[];
  values: string[];
  lifestyle: 'aktiv' | 'entspannt' | 'ausgewogen';
}

export interface IVerification {
  isVerified: boolean;
  verificationMethod: 'phone' | 'email' | 'id';
  verifiedAt?: Date;
}

export interface IPremium {
  isPremium: boolean;
  subscriptionType?: 'monthly' | 'yearly';
  expiresAt?: Date;
  features: string[];
}

export interface IPrivacy {
  showAge: boolean;
  showDistance: boolean;
  showOnlineStatus: boolean;
  allowMessages: 'everyone' | 'matches' | 'none';
  showLastActive: boolean;
}

export interface IStats {
  profileViews: number;
  likesReceived: number;
  matches: number;
  superLikesReceived: number;
  lastActive: Date;
}

// Match Types
export interface IMatch {
  _id: string;
  user1: string;
  user2: string;
  user1Liked: boolean;
  user2Liked: boolean;
  matchedAt: Date;
  isActive: boolean;
}

// Chat Types
export interface IChat {
  _id: string;
  participants: string[];
  lastMessage?: IMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  type: 'text' | 'image' | 'emoji' | 'location';
  isRead: boolean;
  isEdited: boolean;
  editedAt?: Date;
  replyToMessageId?: string;
  createdAt: Date;
}

// Notification Types
export interface INotification {
  _id: string;
  userId: string;
  type: 'new_match' | 'new_like' | 'new_message' | 'super_like' | 'profile_view' | 'marketing' | 'system';
  title: string;
  message: string;
  data: any;
  isRead: boolean;
  createdAt: Date;
}

// Premium Types
export interface IPremiumPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'one_time';
  features: string[];
  popular: boolean;
  originalPrice?: number;
  discount?: number;
}

export interface ISubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  features: string[];
}

// Analytics Types
export interface IAnalytics {
  userId: string;
  event: string;
  properties: any;
  timestamp: Date;
  sessionId: string;
}

// Request/Response Types
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    phone: string;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// File Upload Types
export interface IUploadedFile {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimetype: string;
  uploadedAt: Date;
}

// Search and Filter Types
export interface ISearchFilters {
  ageRange?: [number, number];
  distance?: number;
  interests?: string[];
  gender?: string;
  location?: {
    city?: string;
    zipCode?: string;
  };
  premium?: boolean;
  online?: boolean;
}

// Matching Algorithm Types
export interface IMatchingScore {
  userId: string;
  score: number;
  reasons: string[];
  compatibility: {
    music: number;
    sport: number;
    films: number;
    hobbies: number;
    personality: number;
    location: number;
  };
}

// Socket.IO Types
export interface ISocketData {
  userId: string;
  chatId?: string;
  message?: string;
  isTyping?: boolean;
}

// Export all types
export * from './index';