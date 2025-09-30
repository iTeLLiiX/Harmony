import axios from 'axios';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('harmony_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('harmony_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  location: {
    city: string;
    zipCode: string;
    coordinates: [number, number];
  };
  photos: string[];
  bio: string;
  interests: string[];
  personalityType: string;
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
  lastActive: Date;
}

export interface Match {
  id: string;
  user: User;
  matchScore: number;
  matchedAt: Date;
  isActive: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'emoji';
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  maxAttendees: number;
  price: number;
  organizer: User;
  attendees: User[];
  isAttending: boolean;
}

// Auth API
export const authAPI = {
  // Register user
  register: async (userData: {
    phone: string;
    email?: string;
    name: string;
    age: number;
    gender: string;
    zipCode: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Send SMS code
  sendSMSCode: async (phone: string) => {
    const response = await api.post('/auth/send-sms', { phone });
    return response.data;
  },

  // Verify SMS code
  verifySMSCode: async (phone: string, code: string) => {
    const response = await api.post('/auth/verify-sms', { phone, code });
    return response.data;
  },

  // Login
  login: async (phone: string, password: string) => {
    const response = await api.post('/auth/login', { phone, password });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// User API
export const userAPI = {
  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  // Upload photo
  uploadPhoto: async (photo: File) => {
    const formData = new FormData();
    formData.append('photo', photo);
    const response = await api.post('/user/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Delete photo
  deletePhoto: async (photoId: string) => {
    const response = await api.delete(`/user/photos/${photoId}`);
    return response.data;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/user/preferences');
    return response.data;
  },

  // Update preferences
  updatePreferences: async (preferences: any) => {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  },
};

// Matching API
export const matchingAPI = {
  // Get potential matches
  getMatches: async (filters?: {
    ageRange?: [number, number];
    distance?: number;
    interests?: string[];
    gender?: string;
  }) => {
    const response = await api.get('/matching/potential', { params: filters });
    return response.data;
  },

  // Like a user
  likeUser: async (userId: string) => {
    const response = await api.post('/matching/like', { userId });
    return response.data;
  },

  // Dislike a user
  dislikeUser: async (userId: string) => {
    const response = await api.post('/matching/dislike', { userId });
    return response.data;
  },

  // Super like a user
  superLikeUser: async (userId: string) => {
    const response = await api.post('/matching/super-like', { userId });
    return response.data;
  },

  // Get matches
  getMatches: async (): Promise<Match[]> => {
    const response = await api.get('/matching/matches');
    return response.data;
  },

  // Get who liked me
  getWhoLikedMe: async () => {
    const response = await api.get('/matching/who-liked-me');
    return response.data;
  },
};

// Paywall API
export const paywallAPI = {
  // Check paywall status
  checkStatus: async (feature: string) => {
    const response = await api.get('/paywall/check', { params: { feature } });
    return response.data;
  },

  // Get upgrade options
  getUpgradeOptions: async (feature?: string) => {
    const response = await api.get('/paywall/upgrade-options', { params: { feature } });
    return response.data;
  },

  // Process upgrade
  processUpgrade: async (planId: string, feature: string) => {
    const response = await api.post('/paywall/upgrade', { planId, feature });
    return response.data;
  },

  // Remind later
  remindLater: async (feature: string, days: number = 7) => {
    const response = await api.post('/paywall/remind-later', { feature, reminderDays: days });
    return response.data;
  },

  // Get feature limits
  getFeatureLimits: async () => {
    const response = await api.get('/paywall/feature-limits');
    return response.data;
  }
};

// Onboarding API
export const onboardingAPI = {
  // Get onboarding steps
  getOnboardingSteps: async () => {
    const response = await api.get('/onboarding/steps');
    return response.data;
  },

  // Complete onboarding step
  completeOnboardingStep: async (stepId: number, data: any) => {
    const response = await api.post(`/onboarding/step/${stepId}`, data);
    return response.data;
  },

  // Get onboarding progress
  getOnboardingProgress: async () => {
    const response = await api.get('/onboarding/progress');
    return response.data;
  },

  // Complete onboarding
  completeOnboarding: async (skipPremium: boolean = false) => {
    const response = await api.post('/onboarding/complete', { skipPremium });
    return response.data;
  },

  // Skip premium pitch
  skipPremiumPitch: async () => {
    const response = await api.post('/onboarding/skip-premium');
    return response.data;
  }
};

// Chat API
export const chatAPI = {
  // Get all chats
  getChats: async (): Promise<Chat[]> => {
    const response = await api.get('/chat/chats');
    return response.data;
  },

  // Get chat messages
  getMessages: async (chatId: string, page = 1, limit = 50) => {
    const response = await api.get(`/chat/${chatId}/messages`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Send message
  sendMessage: async (chatId: string, content: string, type = 'text') => {
    const response = await api.post(`/chat/${chatId}/messages`, {
      content,
      type,
    });
    return response.data;
  },

  // Mark messages as read
  markAsRead: async (chatId: string) => {
    const response = await api.put(`/chat/${chatId}/read`);
    return response.data;
  },

  // Delete message
  deleteMessage: async (messageId: string) => {
    const response = await api.delete(`/chat/messages/${messageId}`);
    return response.data;
  },
};

// Events API
export const eventsAPI = {
  // Get all events
  getEvents: async (filters?: {
    category?: string;
    date?: string;
    location?: string;
    price?: string;
  }) => {
    const response = await api.get('/events', { params: filters });
    return response.data;
  },

  // Get event details
  getEvent: async (eventId: string) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  // Create event
  createEvent: async (eventData: {
    title: string;
    description: string;
    date: Date;
    location: string;
    category: string;
    maxAttendees: number;
    price: number;
  }) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  // Join event
  joinEvent: async (eventId: string) => {
    const response = await api.post(`/events/${eventId}/join`);
    return response.data;
  },

  // Leave event
  leaveEvent: async (eventId: string) => {
    const response = await api.post(`/events/${eventId}/leave`);
    return response.data;
  },

  // Get my events
  getMyEvents: async () => {
    const response = await api.get('/events/my-events');
    return response.data;
  },
};

// Premium API
export const premiumAPI = {
  // Get subscription status
  getSubscription: async () => {
    const response = await api.get('/premium/subscription');
    return response.data;
  },

  // Create subscription
  createSubscription: async (planId: string, paymentMethod: string) => {
    const response = await api.post('/premium/subscribe', {
      planId,
      paymentMethod,
    });
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async () => {
    const response = await api.post('/premium/cancel');
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async () => {
    const response = await api.get('/premium/payments');
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  // Get user analytics
  getAnalytics: async () => {
    const response = await api.get('/analytics/user');
    return response.data;
  },

  // Get profile views
  getProfileViews: async () => {
    const response = await api.get('/analytics/profile-views');
    return response.data;
  },

  // Get match statistics
  getMatchStats: async () => {
    const response = await api.get('/analytics/matches');
    return response.data;
  },
};

// Verification API
export const verificationAPI = {
  // Start verification process
  startVerification: async () => {
    const response = await api.post('/verification/start');
    return response.data;
  },

  // Upload verification photo
  uploadVerificationPhoto: async (photo: File, code: string) => {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('code', code);
    const response = await api.post('/verification/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Get verification status
  getVerificationStatus: async () => {
    const response = await api.get('/verification/status');
    return response.data;
  },
};

// Notification API
export const notificationAPI = {
  // Get notifications
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId: string) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};

// Report API
export const reportAPI = {
  // Report user
  reportUser: async (userId: string, reason: string, description?: string) => {
    const response = await api.post('/report/user', {
      userId,
      reason,
      description,
    });
    return response.data;
  },

  // Block user
  blockUser: async (userId: string) => {
    const response = await api.post('/report/block', { userId });
    return response.data;
  },

  // Unblock user
  unblockUser: async (userId: string) => {
    const response = await api.post('/report/unblock', { userId });
    return response.data;
  },

  // Get blocked users
  getBlockedUsers: async () => {
    const response = await api.get('/report/blocked');
    return response.data;
  },
};

export default api;
