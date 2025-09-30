import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/users/profile
 * @desc    Benutzerprofil abrufen
 * @access  Private
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Vollständiges Benutzerprofil
    const mockProfile = {
      id: userId,
      name: 'Max Mustermann',
      age: 28,
      email: 'max@beispiel.de',
      phone: '+49123456789',
      photos: [
        {
          id: 'photo_1',
          url: 'https://example.com/photo1.jpg',
          isMain: true,
          uploadedAt: '2024-01-10T10:00:00Z'
        },
        {
          id: 'photo_2',
          url: 'https://example.com/photo2.jpg',
          isMain: false,
          uploadedAt: '2024-01-12T15:30:00Z'
        }
      ],
      bio: 'Liebe Musik, Sport und gutes Essen. Suche jemanden für gemeinsame Abenteuer!',
      location: {
        zipCode: '10115',
        city: 'Berlin',
        distance: 20
      },
      preferences: {
        ageRange: [22, 35],
        maxDistance: 30,
        gender: 'weiblich',
        lookingFor: 'Beziehung'
      },
      interests: ['Musik', 'Sport', 'Reisen', 'Kochen'],
      musicInterests: {
        genres: ['Pop', 'Rock', 'Hip-Hop'],
        artists: ['Ed Sheeran', 'Adele', 'Die Ärzte'],
        streamingServices: ['Spotify', 'Apple Music'],
        concertInterest: true,
        deutschVsInternational: 'beides'
      },
      sportInterests: {
        favoriteSport: 'Fußball',
        bundesligaClub: 'Bayern München',
        sportActivity: true,
        fitnessLevel: 7,
        outdoorActivities: ['Wandern', 'Radfahren']
      },
      filmInterests: {
        streamingServices: ['Netflix', 'Amazon Prime'],
        watchTatort: true,
        favoriteGenres: ['Komödie', 'Action', 'Romantik'],
        cinemaPreference: 'beides'
      },
      hobbyInterests: {
        cooking: { interest: true, skillLevel: 6 },
        traveling: { interest: true, preference: 'fern' },
        gaming: { interest: false, console: null },
        crafts: { interest: true, types: ['Holzarbeit'] }
      },
      personality: {
        traits: ['extrovertiert', 'humorvoll', 'abenteuerlustig'],
        values: ['Familie', 'Freundschaft', 'Abenteuer'],
        lifestyle: 'aktiv'
      },
      verification: {
        isVerified: false,
        verificationMethod: 'phone',
        verifiedAt: null
      },
      premium: {
        isPremium: false,
        subscriptionType: null,
        expiresAt: null,
        features: ['basic']
      },
      privacy: {
        showAge: true,
        showDistance: true,
        showOnlineStatus: true,
        allowMessages: 'matches'
      },
      stats: {
        profileViews: 156,
        likesReceived: 23,
        matches: 8,
        superLikesReceived: 2,
        lastActive: '2024-01-15T14:30:00Z'
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    };

    res.json({
      success: true,
      message: 'Profil erfolgreich abgerufen',
      data: mockProfile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen des Profils'
    });
  }
};

/**
 * @route   PUT /api/users/profile
 * @desc    Benutzerprofil aktualisieren
 * @access  Private
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Ungültige Profildaten', 400);
    }

    const { userId } = req.params;
    const updateData = req.body;

    // Validierung der wichtigsten Felder
    if (updateData.age && (updateData.age < 18 || updateData.age > 99)) {
      throw new CustomError('Alter muss zwischen 18 und 99 Jahren liegen', 400);
    }

    if (updateData.zipCode && !/^\d{5}$/.test(updateData.zipCode)) {
      throw new CustomError('Bitte gib eine gültige deutsche PLZ ein', 400);
    }

    // Mock: Profil aktualisieren
    const updatedProfile = {
      id: userId,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Profil erfolgreich aktualisiert',
      data: updatedProfile
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Aktualisieren des Profils'
      });
    }
  }
};

/**
 * @route   POST /api/users/photos
 * @desc    Foto hochladen
 * @access  Private
 */
export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { isMain = false } = req.body;

    // Mock: Foto-Upload
    const newPhoto = {
      id: 'photo_' + Date.now(),
      url: 'https://example.com/uploaded-photo.jpg',
      isMain,
      uploadedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Foto erfolgreich hochgeladen',
      data: newPhoto
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Hochladen des Fotos'
    });
  }
};

/**
 * @route   DELETE /api/users/photos/:photoId
 * @desc    Foto löschen
 * @access  Private
 */
export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { photoId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Foto erfolgreich gelöscht',
      data: {
        photoId,
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
      console.error('Delete photo error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Löschen des Fotos'
      });
    }
  }
};

/**
 * @route   PUT /api/users/photos/:photoId/main
 * @desc    Foto als Hauptfoto setzen
 * @access  Private
 */
export const setMainPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { photoId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    res.json({
      success: true,
      message: 'Hauptfoto erfolgreich gesetzt',
      data: {
        photoId,
        isMain: true,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Set main photo error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Setzen des Hauptfotos'
      });
    }
  }
};

/**
 * @route   GET /api/users/settings
 * @desc    Benutzereinstellungen abrufen
 * @access  Private
 */
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Benutzereinstellungen
    const mockSettings = {
      notifications: {
        newMatches: true,
        messages: true,
        likes: true,
        superLikes: true,
        marketing: false,
        pushNotifications: true,
        emailNotifications: true
      },
      privacy: {
        showAge: true,
        showDistance: true,
        showOnlineStatus: true,
        allowMessages: 'matches', // 'everyone', 'matches', 'none'
        showLastActive: true
      },
      discovery: {
        ageRange: [22, 35],
        maxDistance: 30,
        gender: 'weiblich',
        lookingFor: 'Beziehung'
      },
      account: {
        email: 'max@beispiel.de',
        phone: '+49123456789',
        language: 'de',
        timezone: 'Europe/Berlin'
      },
      premium: {
        isPremium: false,
        subscriptionType: null,
        expiresAt: null,
        autoRenew: false
      }
    };

    res.json({
      success: true,
      message: 'Einstellungen erfolgreich abgerufen',
      data: mockSettings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Einstellungen'
    });
  }
};

/**
 * @route   PUT /api/users/settings
 * @desc    Benutzereinstellungen aktualisieren
 * @access  Private
 */
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const settingsData = req.body;

    // Mock: Einstellungen aktualisieren
    const updatedSettings = {
      ...settingsData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Einstellungen erfolgreich aktualisiert',
      data: updatedSettings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Aktualisieren der Einstellungen'
    });
  }
};

/**
 * @route   DELETE /api/users/account
 * @desc    Benutzerkonto löschen
 * @access  Private
 */
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { password, reason } = req.body;

    if (!password) {
      throw new CustomError('Passwort ist erforderlich', 400);
    }

    // Mock: Konto löschen
    res.json({
      success: true,
      message: 'Benutzerkonto erfolgreich gelöscht',
      data: {
        deletedAt: new Date().toISOString(),
        reason: reason || 'Kein Grund angegeben'
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Delete account error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Löschen des Kontos'
      });
    }
  }
};
