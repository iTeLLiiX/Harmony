import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/matching/profiles
 * @desc    Potentielle Matches abrufen
 * @access  Private
 */
export const getPotentialMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Ungültige Suchparameter', 400);
    }

    const { 
      ageRange, 
      distance, 
      interests, 
      gender, 
      page = 1, 
      limit = 10 
    } = req.query;

    // Mock: Erweiterte Matching-Algorithmus
    const mockProfiles = [
      {
        id: '1',
        name: 'Sarah',
        age: 28,
        distance: 5,
        matchScore: 85,
        photos: ['photo1.jpg', 'photo2.jpg'],
        bio: 'Liebe Musik, Sport und gutes Essen. Suche jemanden für gemeinsame Abenteuer!',
        interests: ['Musik', 'Sport', 'Reisen'],
        musicInterests: {
          genres: ['Pop', 'Rock'],
          artists: ['Ed Sheeran', 'Adele'],
          streamingServices: ['Spotify']
        },
        sportInterests: {
          favoriteSport: 'Fußball',
          bundesligaClub: 'Bayern München',
          fitnessLevel: 7
        },
        filmInterests: {
          streamingServices: ['Netflix'],
          watchTatort: true,
          favoriteGenres: ['Komödie', 'Romantik']
        },
        lastActive: 'vor 2 Stunden',
        isOnline: true,
        isPremium: false
      },
      {
        id: '2',
        name: 'Michael',
        age: 32,
        distance: 8,
        matchScore: 92,
        photos: ['photo1.jpg', 'photo2.jpg'],
        bio: 'Passionierter Koch und Fußballfan. Suche eine Partnerin für das Leben.',
        interests: ['Kochen', 'Fußball', 'Fitness'],
        musicInterests: {
          genres: ['Rock', 'Hip-Hop'],
          artists: ['Die Ärzte', 'Kraftklub'],
          streamingServices: ['Apple Music']
        },
        sportInterests: {
          favoriteSport: 'Fußball',
          bundesligaClub: 'Borussia Dortmund',
          fitnessLevel: 8
        },
        filmInterests: {
          streamingServices: ['Netflix', 'Amazon Prime'],
          watchTatort: true,
          favoriteGenres: ['Action', 'Komödie']
        },
        lastActive: 'vor 1 Stunde',
        isOnline: true,
        isPremium: true
      },
      {
        id: '3',
        name: 'Lisa',
        age: 25,
        distance: 12,
        matchScore: 78,
        photos: ['photo1.jpg'],
        bio: 'Kreative Seele, liebe Kunst und Musik. Suche jemanden mit ähnlichen Interessen.',
        interests: ['Kunst', 'Musik', 'Reisen'],
        musicInterests: {
          genres: ['Indie', 'Pop'],
          artists: ['Billie Eilish', 'Lana Del Rey'],
          streamingServices: ['Spotify']
        },
        sportInterests: {
          favoriteSport: 'Yoga',
          bundesligaClub: null,
          fitnessLevel: 5
        },
        filmInterests: {
          streamingServices: ['Netflix'],
          watchTatort: false,
          favoriteGenres: ['Drama', 'Romantik']
        },
        lastActive: 'vor 3 Stunden',
        isOnline: false,
        isPremium: false
      }
    ];

    // Filtering Logic
    let filteredProfiles = mockProfiles;

    if (ageRange) {
      const [minAge, maxAge] = (ageRange as string).split(',').map(Number);
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.age >= minAge && profile.age <= maxAge
      );
    }

    if (distance) {
      const maxDistance = Number(distance);
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.distance <= maxDistance
      );
    }

    if (gender) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name === gender || gender === 'alle'
      );
    }

    if (interests) {
      const interestList = (interests as string).split(',');
      filteredProfiles = filteredProfiles.filter(profile => 
        interestList.some(interest => profile.interests.includes(interest))
      );
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedProfiles = filteredProfiles.slice(startIndex, endIndex);

    res.json({
      success: true,
      message: 'Potentielle Matches erfolgreich abgerufen',
      data: {
        profiles: paginatedProfiles,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(filteredProfiles.length / Number(limit)),
          totalProfiles: filteredProfiles.length,
          hasNextPage: endIndex < filteredProfiles.length,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Get potential matches error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Abrufen der Matches'
      });
    }
  }
};

/**
 * @route   POST /api/matching/like
 * @desc    Profil liken
 * @access  Private
 */
export const likeProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, targetUserId, isSuperLike = false } = req.body;

    if (!userId || !targetUserId) {
      throw new CustomError('Benutzer-ID und Ziel-Benutzer-ID sind erforderlich', 400);
    }

    // Mock: Like-Logik
    const likeResult = {
      isMatch: Math.random() > 0.7, // 30% Match-Wahrscheinlichkeit
      matchId: Math.random() > 0.7 ? 'match_' + Date.now() : null,
      message: Math.random() > 0.7 ? 'Es ist ein Match! 🎉' : 'Like erfolgreich gespeichert'
    };

    res.json({
      success: true,
      message: likeResult.message,
      data: {
        isMatch: likeResult.isMatch,
        matchId: likeResult.matchId,
        isSuperLike,
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
      console.error('Like profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Liken des Profils'
      });
    }
  }
};

/**
 * @route   POST /api/matching/dislike
 * @desc    Profil ablehnen
 * @access  Private
 */
export const dislikeProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
      throw new CustomError('Benutzer-ID und Ziel-Benutzer-ID sind erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Profil erfolgreich abgelehnt',
      data: {
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
      console.error('Dislike profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Ablehnen des Profils'
      });
    }
  }
};

/**
 * @route   GET /api/matching/matches
 * @desc    Alle Matches abrufen
 * @access  Private
 */
export const getMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Matches abrufen
    const mockMatches = [
      {
        id: 'match_1',
        user: {
          id: '2',
          name: 'Michael',
          age: 32,
          photos: ['photo1.jpg'],
          lastActive: 'vor 1 Stunde',
          isOnline: true
        },
        matchedAt: '2024-01-15T10:30:00Z',
        lastMessage: {
          text: 'Hey! Wie geht es dir?',
          timestamp: '2024-01-15T14:20:00Z',
          senderId: '2'
        },
        unreadCount: 2
      },
      {
        id: 'match_2',
        user: {
          id: '3',
          name: 'Lisa',
          age: 25,
          photos: ['photo1.jpg'],
          lastActive: 'vor 3 Stunden',
          isOnline: false
        },
        matchedAt: '2024-01-14T16:45:00Z',
        lastMessage: {
          text: 'Das klingt super! Wann treffen wir uns?',
          timestamp: '2024-01-15T09:15:00Z',
          senderId: 'current_user'
        },
        unreadCount: 0
      }
    ];

    res.json({
      success: true,
      message: 'Matches erfolgreich abgerufen',
      data: {
        matches: mockMatches,
        totalMatches: mockMatches.length
      }
    });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Matches'
    });
  }
};

/**
 * @route   GET /api/matching/who-liked-me
 * @desc    Wer hat mich geliket abrufen (Premium Feature)
 * @access  Private
 */
export const getWhoLikedMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Wer hat mich geliket
    const mockLikes = [
      {
        id: 'like_1',
        user: {
          id: '4',
          name: 'Anna',
          age: 29,
          photos: ['photo1.jpg'],
          distance: 6,
          matchScore: 88
        },
        likedAt: '2024-01-15T12:30:00Z',
        isSuperLike: false
      },
      {
        id: 'like_2',
        user: {
          id: '5',
          name: 'Tom',
          age: 31,
          photos: ['photo1.jpg'],
          distance: 4,
          matchScore: 91
        },
        likedAt: '2024-01-15T08:15:00Z',
        isSuperLike: true
      }
    ];

    res.json({
      success: true,
      message: 'Likes erfolgreich abgerufen',
      data: {
        likes: mockLikes,
        totalLikes: mockLikes.length
      }
    });
  } catch (error) {
    console.error('Get who liked me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Likes'
    });
  }
};

/**
 * @route   POST /api/matching/block
 * @desc    Benutzer blockieren
 * @access  Private
 */
export const blockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, targetUserId, reason } = req.body;

    if (!userId || !targetUserId) {
      throw new CustomError('Benutzer-ID und Ziel-Benutzer-ID sind erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Benutzer erfolgreich blockiert',
      data: {
        blockedUserId: targetUserId,
        reason: reason || 'Kein Grund angegeben',
        blockedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Block user error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Blockieren des Benutzers'
      });
    }
  }
};

/**
 * @route   POST /api/matching/report
 * @desc    Benutzer melden
 * @access  Private
 */
export const reportUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, targetUserId, reason, description } = req.body;

    if (!userId || !targetUserId || !reason) {
      throw new CustomError('Benutzer-ID, Ziel-Benutzer-ID und Grund sind erforderlich', 400);
    }

    const reportReasons = [
      'Unangemessene Inhalte',
      'Spam oder Betrug',
      'Belästigung',
      'Falsche Identität',
      'Sonstiges'
    ];

    if (!reportReasons.includes(reason)) {
      throw new CustomError('Ungültiger Meldegrund', 400);
    }

    res.json({
      success: true,
      message: 'Meldung erfolgreich eingereicht',
      data: {
        reportId: 'report_' + Date.now(),
        reportedUserId: targetUserId,
        reason,
        description: description || '',
        reportedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Report user error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Melden des Benutzers'
      });
    }
  }
};
