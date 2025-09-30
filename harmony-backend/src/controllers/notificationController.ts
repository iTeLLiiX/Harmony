import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/notifications
 * @desc    Benachrichtigungen abrufen
 * @access  Private
 */
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, type, unreadOnly = false } = req.query;

    // Mock: Benachrichtigungen
    const mockNotifications = [
      {
        id: 'notif_1',
        userId,
        type: 'new_match',
        title: 'Neues Match! 🎉',
        message: 'Du hast ein neues Match mit Sarah!',
        data: {
          matchId: 'match_1',
          userName: 'Sarah',
          userPhoto: 'https://example.com/sarah.jpg'
        },
        isRead: false,
        createdAt: '2024-01-15T14:30:00Z'
      },
      {
        id: 'notif_2',
        userId,
        type: 'new_like',
        title: 'Jemand hat dich geliket! ❤️',
        message: 'Michael hat dein Profil geliket',
        data: {
          likerId: 'user_2',
          likerName: 'Michael',
          likerPhoto: 'https://example.com/michael.jpg'
        },
        isRead: false,
        createdAt: '2024-01-15T12:15:00Z'
      },
      {
        id: 'notif_3',
        userId,
        type: 'new_message',
        title: 'Neue Nachricht',
        message: 'Lisa hat dir eine Nachricht geschickt',
        data: {
          conversationId: 'conv_2',
          senderName: 'Lisa',
          messagePreview: 'Hey! Wie geht es dir?'
        },
        isRead: true,
        createdAt: '2024-01-15T10:45:00Z'
      },
      {
        id: 'notif_4',
        userId,
        type: 'super_like',
        title: 'Super-Like erhalten! ⭐',
        message: 'Tom hat dir einen Super-Like gesendet',
        data: {
          likerId: 'user_3',
          likerName: 'Tom',
          likerPhoto: 'https://example.com/tom.jpg'
        },
        isRead: false,
        createdAt: '2024-01-15T09:20:00Z'
      },
      {
        id: 'notif_5',
        userId,
        type: 'profile_view',
        title: 'Profilaufruf',
        message: 'Anna hat dein Profil angeschaut',
        data: {
          viewerId: 'user_4',
          viewerName: 'Anna',
          viewerPhoto: 'https://example.com/anna.jpg'
        },
        isRead: true,
        createdAt: '2024-01-15T08:30:00Z'
      }
    ];

    // Filtering
    let filteredNotifications = mockNotifications;

    if (type) {
      filteredNotifications = filteredNotifications.filter(notif => notif.type === type);
    }

    if (unreadOnly === 'true') {
      filteredNotifications = filteredNotifications.filter(notif => !notif.isRead);
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

    res.json({
      success: true,
      message: 'Benachrichtigungen erfolgreich abgerufen',
      data: {
        notifications: paginatedNotifications,
        unreadCount: filteredNotifications.filter(n => !n.isRead).length,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(filteredNotifications.length / Number(limit)),
          totalNotifications: filteredNotifications.length,
          hasNextPage: endIndex < filteredNotifications.length,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Benachrichtigungen'
    });
  }
};

/**
 * @route   PUT /api/notifications/:notificationId/read
 * @desc    Benachrichtigung als gelesen markieren
 * @access  Private
 */
export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Benachrichtigung als gelesen markiert',
      data: {
        notificationId,
        isRead: true,
        readAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Mark notification as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Markieren der Benachrichtigung'
      });
    }
  }
};

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Alle Benachrichtigungen als gelesen markieren
 * @access  Private
 */
export const markAllNotificationsAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Alle Benachrichtigungen als gelesen markiert',
      data: {
        userId,
        markedAt: new Date().toISOString(),
        count: 5 // Mock: Anzahl der markierten Benachrichtigungen
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Mark all notifications as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Markieren aller Benachrichtigungen'
      });
    }
  }
};

/**
 * @route   DELETE /api/notifications/:notificationId
 * @desc    Benachrichtigung löschen
 * @access  Private
 */
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Benachrichtigung erfolgreich gelöscht',
      data: {
        notificationId,
        deletedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Delete notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Löschen der Benachrichtigung'
      });
    }
  }
};

/**
 * @route   GET /api/notifications/settings
 * @desc    Benachrichtigungseinstellungen abrufen
 * @access  Private
 */
export const getNotificationSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Benachrichtigungseinstellungen
    const settings = {
      push: {
        newMatches: true,
        newMessages: true,
        newLikes: true,
        superLikes: true,
        profileViews: false,
        marketing: false
      },
      email: {
        newMatches: true,
        newMessages: false,
        newLikes: false,
        superLikes: true,
        profileViews: false,
        marketing: false,
        weeklyDigest: true
      },
      inApp: {
        newMatches: true,
        newMessages: true,
        newLikes: true,
        superLikes: true,
        profileViews: true,
        marketing: false
      },
      quietHours: {
        enabled: true,
        startTime: '22:00',
        endTime: '08:00',
        timezone: 'Europe/Berlin'
      }
    };

    res.json({
      success: true,
      message: 'Benachrichtigungseinstellungen erfolgreich abgerufen',
      data: settings
    });
  } catch (error) {
    console.error('Get notification settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Benachrichtigungseinstellungen'
    });
  }
};

/**
 * @route   PUT /api/notifications/settings
 * @desc    Benachrichtigungseinstellungen aktualisieren
 * @access  Private
 */
export const updateNotificationSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const settingsData = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    // Mock: Einstellungen aktualisieren
    const updatedSettings = {
      ...settingsData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Benachrichtigungseinstellungen erfolgreich aktualisiert',
      data: updatedSettings
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Update notification settings error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Aktualisieren der Benachrichtigungseinstellungen'
      });
    }
  }
};

/**
 * @route   POST /api/notifications/send
 * @desc    Benachrichtigung senden (Admin)
 * @access  Private
 */
export const sendNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      userId, 
      type, 
      title, 
      message, 
      data = {} 
    } = req.body;

    if (!userId || !type || !title || !message) {
      throw new CustomError('Benutzer-ID, Typ, Titel und Nachricht sind erforderlich', 400);
    }

    const notificationTypes = [
      'new_match',
      'new_like', 
      'new_message',
      'super_like',
      'profile_view',
      'marketing',
      'system'
    ];

    if (!notificationTypes.includes(type)) {
      throw new CustomError('Ungültiger Benachrichtigungstyp', 400);
    }

    // Mock: Benachrichtigung senden
    const notification = {
      id: 'notif_' + Date.now(),
      userId,
      type,
      title,
      message,
      data,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Benachrichtigung erfolgreich gesendet',
      data: notification
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Send notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Senden der Benachrichtigung'
      });
    }
  }
};
