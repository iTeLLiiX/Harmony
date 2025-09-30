import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/chat/conversations
 * @desc    Alle Chat-Unterhaltungen abrufen
 * @access  Private
 */
export const getConversations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    // Mock: Chat-Unterhaltungen
    const mockConversations = [
      {
        id: 'conv_1',
        matchId: 'match_1',
        user: {
          id: '2',
          name: 'Michael',
          age: 32,
          photos: ['photo1.jpg'],
          isOnline: true,
          lastActive: 'vor 1 Stunde'
        },
        lastMessage: {
          id: 'msg_1',
          text: 'Hey! Wie geht es dir?',
          senderId: '2',
          timestamp: '2024-01-15T14:20:00Z',
          type: 'text'
        },
        unreadCount: 2,
        updatedAt: '2024-01-15T14:20:00Z'
      },
      {
        id: 'conv_2',
        matchId: 'match_2',
        user: {
          id: '3',
          name: 'Lisa',
          age: 25,
          photos: ['photo1.jpg'],
          isOnline: false,
          lastActive: 'vor 3 Stunden'
        },
        lastMessage: {
          id: 'msg_2',
          text: 'Das klingt super! Wann treffen wir uns?',
          senderId: 'current_user',
          timestamp: '2024-01-15T09:15:00Z',
          type: 'text'
        },
        unreadCount: 0,
        updatedAt: '2024-01-15T09:15:00Z'
      }
    ];

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedConversations = mockConversations.slice(startIndex, endIndex);

    res.json({
      success: true,
      message: 'Chat-Unterhaltungen erfolgreich abgerufen',
      data: {
        conversations: paginatedConversations,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(mockConversations.length / Number(limit)),
          totalConversations: mockConversations.length,
          hasNextPage: endIndex < mockConversations.length,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Chat-Unterhaltungen'
    });
  }
};

/**
 * @route   GET /api/chat/messages/:conversationId
 * @desc    Nachrichten einer Unterhaltung abrufen
 * @access  Private
 */
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // Mock: Nachrichten
    const mockMessages = [
      {
        id: 'msg_1',
        conversationId: conversationId,
        senderId: '2',
        text: 'Hey! Wie geht es dir?',
        type: 'text',
        timestamp: '2024-01-15T14:20:00Z',
        isRead: false,
        isEdited: false,
        editedAt: null
      },
      {
        id: 'msg_2',
        conversationId: conversationId,
        senderId: 'current_user',
        text: 'Hallo! Mir geht es gut, danke! Und dir?',
        type: 'text',
        timestamp: '2024-01-15T14:25:00Z',
        isRead: true,
        isEdited: false,
        editedAt: null
      },
      {
        id: 'msg_3',
        conversationId: conversationId,
        senderId: '2',
        text: 'Auch gut! Hast du Lust auf einen Kaffee?',
        type: 'text',
        timestamp: '2024-01-15T14:30:00Z',
        isRead: false,
        isEdited: false,
        editedAt: null
      }
    ];

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedMessages = mockMessages.slice(startIndex, endIndex);

    res.json({
      success: true,
      message: 'Nachrichten erfolgreich abgerufen',
      data: {
        messages: paginatedMessages,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(mockMessages.length / Number(limit)),
          totalMessages: mockMessages.length,
          hasNextPage: endIndex < mockMessages.length,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Nachrichten'
    });
  }
};

/**
 * @route   POST /api/chat/message
 * @desc    Nachricht senden
 * @access  Private
 */
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Ungültige Nachrichtendaten', 400);
    }

    const { 
      conversationId, 
      senderId, 
      text, 
      type = 'text',
      replyToMessageId = null 
    } = req.body;

    if (!conversationId || !senderId || !text) {
      throw new CustomError('Konversations-ID, Sender-ID und Text sind erforderlich', 400);
    }

    const messageTypes = ['text', 'image', 'emoji', 'location'];
    if (!messageTypes.includes(type)) {
      throw new CustomError('Ungültiger Nachrichtentyp', 400);
    }

    // Mock: Nachricht erstellen
    const newMessage = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId,
      text,
      type,
      timestamp: new Date().toISOString(),
      isRead: false,
      isEdited: false,
      editedAt: null,
      replyToMessageId
    };

    res.json({
      success: true,
      message: 'Nachricht erfolgreich gesendet',
      data: newMessage
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Send message error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Senden der Nachricht'
      });
    }
  }
};

/**
 * @route   PUT /api/chat/message/:messageId
 * @desc    Nachricht bearbeiten
 * @access  Private
 */
export const editMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messageId } = req.params;
    const { text, senderId } = req.body;

    if (!text || !senderId) {
      throw new CustomError('Text und Sender-ID sind erforderlich', 400);
    }

    // Mock: Nachricht bearbeiten
    const editedMessage = {
      id: messageId,
      text,
      senderId,
      isEdited: true,
      editedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Nachricht erfolgreich bearbeitet',
      data: editedMessage
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Edit message error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Bearbeiten der Nachricht'
      });
    }
  }
};

/**
 * @route   DELETE /api/chat/message/:messageId
 * @desc    Nachricht löschen
 * @access  Private
 */
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messageId } = req.params;
    const { senderId } = req.body;

    if (!senderId) {
      throw new CustomError('Sender-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Nachricht erfolgreich gelöscht',
      data: {
        messageId,
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
      console.error('Delete message error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Löschen der Nachricht'
      });
    }
  }
};

/**
 * @route   POST /api/chat/mark-read
 * @desc    Nachrichten als gelesen markieren
 * @access  Private
 */
export const markMessagesAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { conversationId, userId } = req.body;

    if (!conversationId || !userId) {
      throw new CustomError('Konversations-ID und Benutzer-ID sind erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Nachrichten als gelesen markiert',
      data: {
        conversationId,
        userId,
        markedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Mark messages as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Markieren der Nachrichten'
      });
    }
  }
};

/**
 * @route   POST /api/chat/typing
 * @desc    Typing-Indikator senden
 * @access  Private
 */
export const setTypingIndicator = async (req: Request, res: Response): Promise<void> => {
  try {
    const { conversationId, userId, isTyping } = req.body;

    if (!conversationId || !userId || typeof isTyping !== 'boolean') {
      throw new CustomError('Konversations-ID, Benutzer-ID und Typing-Status sind erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Typing-Indikator erfolgreich gesetzt',
      data: {
        conversationId,
        userId,
        isTyping,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Set typing indicator error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Setzen des Typing-Indikators'
      });
    }
  }
};
