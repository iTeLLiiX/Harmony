import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/analytics/dashboard
 * @desc    Analytics Dashboard abrufen
 * @access  Private
 */
export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { period = '30d' } = req.query;

    // Mock: Analytics Dashboard
    const dashboard = {
      overview: {
        profileViews: 156,
        likesReceived: 23,
        matches: 8,
        messagesSent: 45,
        responseRate: 67.5
      },
      activity: {
        dailyActive: true,
        lastActive: '2024-01-15T14:30:00Z',
        streakDays: 5,
        totalTimeSpent: '2h 15m'
      },
      performance: {
        matchRate: 12.5, // Matches pro 100 Likes
        responseRate: 67.5, // Antwortrate auf Nachrichten
        profileCompletion: 85,
        photoQuality: 8.5
      },
      insights: [
        {
          type: 'tip',
          title: 'Profil-Tipp',
          message: 'Füge mehr Fotos hinzu, um 3x mehr Matches zu bekommen!',
          priority: 'high'
        },
        {
          type: 'achievement',
          title: 'Meilenstein erreicht',
          message: 'Du hast 10 Matches erreicht! 🎉',
          priority: 'medium'
        },
        {
          type: 'suggestion',
          title: 'Optimierung',
          message: 'Deine Bio könnte interessanter sein',
          priority: 'low'
        }
      ],
      trends: {
        profileViews: [
          { date: '2024-01-10', count: 12 },
          { date: '2024-01-11', count: 18 },
          { date: '2024-01-12', count: 15 },
          { date: '2024-01-13', count: 22 },
          { date: '2024-01-14', count: 19 },
          { date: '2024-01-15', count: 25 }
        ],
        matches: [
          { date: '2024-01-10', count: 1 },
          { date: '2024-01-11', count: 2 },
          { date: '2024-01-12', count: 0 },
          { date: '2024-01-13', count: 3 },
          { date: '2024-01-14', count: 1 },
          { date: '2024-01-15', count: 1 }
        ]
      }
    };

    res.json({
      success: true,
      message: 'Analytics Dashboard erfolgreich abgerufen',
      data: dashboard
    });
  } catch (error) {
    console.error('Get analytics dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen des Analytics Dashboards'
    });
  }
};

/**
 * @route   GET /api/analytics/matches
 * @desc    Match-Analytics abrufen
 * @access  Private
 */
export const getMatchAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { period = '30d' } = req.query;

    // Mock: Match-Analytics
    const matchAnalytics = {
      summary: {
        totalMatches: 8,
        newMatches: 2,
        activeConversations: 5,
        matchRate: 12.5
      },
      demographics: {
        ageGroups: [
          { ageRange: '18-25', count: 3, percentage: 37.5 },
          { ageRange: '26-35', count: 4, percentage: 50 },
          { ageRange: '36-45', count: 1, percentage: 12.5 }
        ],
        locations: [
          { city: 'Berlin', count: 4, percentage: 50 },
          { city: 'München', count: 2, percentage: 25 },
          { city: 'Hamburg', count: 2, percentage: 25 }
        ],
        interests: [
          { interest: 'Musik', count: 6, percentage: 75 },
          { interest: 'Sport', count: 5, percentage: 62.5 },
          { interest: 'Reisen', count: 4, percentage: 50 }
        ]
      },
      performance: {
        bestPerformingPhotos: [
          { photoId: 'photo_1', views: 45, likes: 8, matchRate: 17.8 },
          { photoId: 'photo_2', views: 32, likes: 5, matchRate: 15.6 }
        ],
        bestTimes: [
          { day: 'Sonntag', hour: '20:00', matches: 3 },
          { day: 'Freitag', hour: '19:00', matches: 2 },
          { day: 'Samstag', hour: '21:00', matches: 2 }
        ]
      },
      trends: {
        dailyMatches: [
          { date: '2024-01-10', matches: 1 },
          { date: '2024-01-11', matches: 2 },
          { date: '2024-01-12', matches: 0 },
          { date: '2024-01-13', matches: 3 },
          { date: '2024-01-14', matches: 1 },
          { date: '2024-01-15', matches: 1 }
        ]
      }
    };

    res.json({
      success: true,
      message: 'Match-Analytics erfolgreich abgerufen',
      data: matchAnalytics
    });
  } catch (error) {
    console.error('Get match analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Match-Analytics'
    });
  }
};

/**
 * @route   GET /api/analytics/messages
 * @desc    Nachrichten-Analytics abrufen
 * @access  Private
 */
export const getMessageAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { period = '30d' } = req.query;

    // Mock: Nachrichten-Analytics
    const messageAnalytics = {
      summary: {
        totalMessages: 127,
        messagesSent: 64,
        messagesReceived: 63,
        responseRate: 67.5,
        averageResponseTime: '2h 15m'
      },
      conversations: {
        activeConversations: 5,
        completedConversations: 3,
        averageMessagesPerConversation: 8.5,
        longestConversation: 25
      },
      performance: {
        bestResponseTimes: [
          { timeOfDay: '20:00-22:00', responseRate: 85 },
          { timeOfDay: '12:00-14:00', responseRate: 78 },
          { timeOfDay: '18:00-20:00', responseRate: 72 }
        ],
        messageTypes: [
          { type: 'text', count: 98, percentage: 77.2 },
          { type: 'emoji', count: 18, percentage: 14.2 },
          { type: 'image', count: 11, percentage: 8.6 }
        ]
      },
      trends: {
        dailyMessages: [
          { date: '2024-01-10', sent: 8, received: 6 },
          { date: '2024-01-11', sent: 12, received: 10 },
          { date: '2024-01-12', sent: 5, received: 7 },
          { date: '2024-01-13', sent: 15, received: 12 },
          { date: '2024-01-14', sent: 9, received: 11 },
          { date: '2024-01-15', sent: 15, received: 17 }
        ]
      }
    };

    res.json({
      success: true,
      message: 'Nachrichten-Analytics erfolgreich abgerufen',
      data: messageAnalytics
    });
  } catch (error) {
    console.error('Get message analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Nachrichten-Analytics'
    });
  }
};

/**
 * @route   GET /api/analytics/profile
 * @desc    Profil-Analytics abrufen
 * @access  Private
 */
export const getProfileAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Profil-Analytics
    const profileAnalytics = {
      completion: {
        overall: 85,
        sections: {
          photos: 100,
          bio: 90,
          interests: 80,
          music: 75,
          sport: 70,
          films: 60
        }
      },
      performance: {
        profileViews: 156,
        viewsPerDay: 5.2,
        peakViewingTimes: [
          { time: '20:00-22:00', views: 45 },
          { time: '12:00-14:00', views: 32 },
          { time: '18:00-20:00', views: 28 }
        ]
      },
      photos: {
        totalPhotos: 4,
        mainPhotoViews: 89,
        photoPerformance: [
          { photoId: 'photo_1', views: 45, likes: 8, matchRate: 17.8 },
          { photoId: 'photo_2', views: 32, likes: 5, matchRate: 15.6 },
          { photoId: 'photo_3', views: 28, likes: 3, matchRate: 10.7 },
          { photoId: 'photo_4', views: 22, likes: 2, matchRate: 9.1 }
        ]
      },
      recommendations: [
        {
          type: 'improvement',
          title: 'Füge mehr Fotos hinzu',
          description: 'Profile mit 5+ Fotos bekommen 3x mehr Matches',
          impact: 'high',
          action: 'upload_photos'
        },
        {
          type: 'optimization',
          title: 'Verbessere deine Bio',
          description: 'Eine längere Bio könnte mehr Interesse wecken',
          impact: 'medium',
          action: 'edit_bio'
        },
        {
          type: 'completion',
          title: 'Vervollständige deine Interessen',
          description: 'Füge mehr Musik- und Film-Interessen hinzu',
          impact: 'low',
          action: 'add_interests'
        }
      ]
    };

    res.json({
      success: true,
      message: 'Profil-Analytics erfolgreich abgerufen',
      data: profileAnalytics
    });
  } catch (error) {
    console.error('Get profile analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Profil-Analytics'
    });
  }
};

/**
 * @route   POST /api/analytics/event
 * @desc    Analytics-Event tracken
 * @access  Private
 */
export const trackEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, event, properties = {} } = req.body;

    if (!userId || !event) {
      throw new CustomError('Benutzer-ID und Event sind erforderlich', 400);
    }

    const validEvents = [
      'profile_view',
      'profile_like',
      'profile_dislike',
      'message_sent',
      'message_received',
      'match_created',
      'photo_uploaded',
      'profile_updated',
      'search_performed',
      'filter_applied'
    ];

    if (!validEvents.includes(event)) {
      throw new CustomError('Ungültiges Event', 400);
    }

    // Mock: Event tracken
    const trackedEvent = {
      id: 'event_' + Date.now(),
      userId,
      event,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: 'session_' + Math.random().toString(36).substr(2, 9)
    };

    res.json({
      success: true,
      message: 'Event erfolgreich getrackt',
      data: trackedEvent
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Track event error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Tracken des Events'
      });
    }
  }
};

/**
 * @route   GET /api/analytics/export
 * @desc    Analytics-Daten exportieren
 * @access  Private
 */
export const exportAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { format = 'json', period = '30d' } = req.query;

    if (!['json', 'csv', 'pdf'].includes(format as string)) {
      throw new CustomError('Ungültiges Export-Format', 400);
    }

    // Mock: Analytics-Export
    const exportData = {
      userId,
      period,
      format,
      generatedAt: new Date().toISOString(),
      data: {
        profileViews: 156,
        likesReceived: 23,
        matches: 8,
        messagesSent: 64,
        responseRate: 67.5
      },
      downloadUrl: `https://harmony-api.com/exports/analytics_${userId}_${Date.now()}.${format}`
    };

    res.json({
      success: true,
      message: 'Analytics-Daten erfolgreich exportiert',
      data: exportData
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Export analytics error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Exportieren der Analytics-Daten'
      });
    }
  }
};
