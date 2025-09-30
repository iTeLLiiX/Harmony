import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';

// Multer-Konfiguration für File-Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Erlaubte Dateitypen
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Nur Bilddateien (JPEG, PNG, GIF, WebP) sind erlaubt'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB Limit
  },
  fileFilter: fileFilter
});

/**
 * @route   POST /api/upload/photo
 * @desc    Profilfoto hochladen
 * @access  Private
 */
export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      throw new CustomError('Keine Datei hochgeladen', 400);
    }

    const { userId, isMain = false } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    // Mock: Foto-URL generieren (in Produktion: Cloudinary, AWS S3, etc.)
    const photoUrl = `https://harmony-api.com/uploads/${req.file.filename}`;

    const uploadedPhoto = {
      id: 'photo_' + Date.now(),
      userId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: photoUrl,
      size: req.file.size,
      mimetype: req.file.mimetype,
      isMain: isMain === 'true',
      uploadedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Foto erfolgreich hochgeladen',
      data: uploadedPhoto
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Upload photo error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Hochladen des Fotos'
      });
    }
  }
};

/**
 * @route   POST /api/upload/multiple-photos
 * @desc    Mehrere Fotos hochladen
 * @access  Private
 */
export const uploadMultiplePhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      throw new CustomError('Keine Dateien hochgeladen', 400);
    }

    const { userId } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    if (files.length > 6) {
      throw new CustomError('Maximal 6 Fotos erlaubt', 400);
    }

    const uploadedPhotos = files.map((file, index) => ({
      id: 'photo_' + Date.now() + '_' + index,
      userId,
      filename: file.filename,
      originalName: file.originalname,
      url: `https://harmony-api.com/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
      isMain: index === 0, // Erstes Foto als Hauptfoto
      uploadedAt: new Date().toISOString()
    }));

    res.json({
      success: true,
      message: `${files.length} Fotos erfolgreich hochgeladen`,
      data: {
        photos: uploadedPhotos,
        count: files.length
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Upload multiple photos error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Hochladen der Fotos'
      });
    }
  }
};

/**
 * @route   DELETE /api/upload/photo/:photoId
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

    // Mock: Foto löschen
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
 * @route   PUT /api/upload/photo/:photoId/main
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

    // Mock: Hauptfoto setzen
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
 * @route   GET /api/upload/photos/:userId
 * @desc    Benutzerfotos abrufen
 * @access  Private
 */
export const getUserPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Benutzerfotos
    const photos = [
      {
        id: 'photo_1',
        userId,
        url: 'https://harmony-api.com/uploads/photo1.jpg',
        isMain: true,
        uploadedAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 'photo_2',
        userId,
        url: 'https://harmony-api.com/uploads/photo2.jpg',
        isMain: false,
        uploadedAt: '2024-01-12T15:30:00Z'
      }
    ];

    res.json({
      success: true,
      message: 'Fotos erfolgreich abgerufen',
      data: {
        photos,
        count: photos.length
      }
    });
  } catch (error) {
    console.error('Get user photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Fotos'
    });
  }
};

/**
 * @route   POST /api/upload/avatar
 * @desc    Avatar hochladen
 * @access  Private
 */
export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      throw new CustomError('Keine Datei hochgeladen', 400);
    }

    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    // Avatar-spezifische Validierung
    if (req.file.size > 2 * 1024 * 1024) { // 2MB für Avatare
      throw new CustomError('Avatar-Datei zu groß (max. 2MB)', 400);
    }

    const avatarUrl = `https://harmony-api.com/avatars/${req.file.filename}`;

    const uploadedAvatar = {
      id: 'avatar_' + Date.now(),
      userId,
      filename: req.file.filename,
      url: avatarUrl,
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Avatar erfolgreich hochgeladen',
      data: uploadedAvatar
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Upload avatar error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Hochladen des Avatars'
      });
    }
  }
};
