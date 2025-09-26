import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface für Benutzer
export interface IBenutzer extends Document {
  handynummer: string;
  email?: string;
  passwort?: string;
  profil: {
    name: string;
    alter: number;
    geschlecht: 'männlich' | 'weiblich' | 'divers';
    suchtGeschlecht: 'männlich' | 'weiblich' | 'alle';
    plz: string;
    entfernung: number;
    wasSuchst: 'Beziehung' | 'Freundschaft' | 'Beides';
    bio?: string;
    bilder: string[];
  };
  interessen: {
    musik: string[];
    sport: string[];
    hobby: string[];
    filme: string[];
  };
  standort: {
    plz: string;
    stadt: string;
    bundesland: string;
    koordinaten: {
      lat: number;
      lng: number;
    };
  };
  verifiziert: boolean;
  isAdmin: boolean;
  letzteAktivitaet: Date;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Benutzer Schema
const BenutzerSchema = new Schema<IBenutzer>({
  handynummer: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true
  },
  passwort: {
    type: String,
    minlength: 6
  },
  profil: {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    alter: {
      type: Number,
      required: true,
      min: 18,
      max: 99
    },
    geschlecht: {
      type: String,
      required: true,
      enum: ['männlich', 'weiblich', 'divers']
    },
    suchtGeschlecht: {
      type: String,
      required: true,
      enum: ['männlich', 'weiblich', 'alle']
    },
    plz: {
      type: String,
      required: true,
      trim: true
    },
    entfernung: {
      type: Number,
      required: true,
      min: 5,
      max: 100
    },
    wasSuchst: {
      type: String,
      required: true,
      enum: ['Beziehung', 'Freundschaft', 'Beides']
    },
    bio: {
      type: String,
      maxlength: 500,
      trim: true
    },
    bilder: [{
      type: String,
      trim: true
    }]
  },
  interessen: {
    musik: [{
      type: String,
      trim: true
    }],
    sport: [{
      type: String,
      trim: true
    }],
    hobby: [{
      type: String,
      trim: true
    }],
    filme: [{
      type: String,
      trim: true
    }]
  },
  standort: {
    plz: {
      type: String,
      required: true,
      trim: true
    },
    stadt: {
      type: String,
      required: true,
      trim: true
    },
    bundesland: {
      type: String,
      required: true,
      trim: true
    },
    koordinaten: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  verifiziert: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  letzteAktivitaet: {
    type: Date,
    default: Date.now
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
});

// Passwort-Hashing vor dem Speichern
BenutzerSchema.pre('save', async function(next) {
  if (!this.isModified('passwort') || !this.passwort) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwort = await bcrypt.hash(this.passwort, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Passwort-Vergleich Methode
BenutzerSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.passwort) return false;
  return bcrypt.compare(candidatePassword, this.passwort);
};

// Statische Methode für Matching
BenutzerSchema.statics.findMatches = function(userId: string, limit: number = 50) {
  return this.aggregate([
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
        verifiziert: true
      }
    },
    {
      $addFields: {
        matchScore: {
          $add: [
            { $multiply: [{ $size: { $ifNull: ['$interessen.musik', []] } }, 10] },
            { $multiply: [{ $size: { $ifNull: ['$interessen.sport', []] } }, 5] },
            { $multiply: [{ $size: { $ifNull: ['$interessen.hobby', []] } }, 3] }
          ]
        }
      }
    },
    {
      $sort: { matchScore: -1, letzteAktivitaet: -1 }
    },
    {
      $limit: limit
    }
  ]);
};

export default mongoose.model<IBenutzer>('Benutzer', BenutzerSchema);
