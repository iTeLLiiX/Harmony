import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import matchingRoutes from './routes/matching';
import chatRoutes from './routes/chat';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Import database connection
import connectDB from './utils/database';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Max 100 Requests pro IP
  message: {
    error: 'Zu viele Anfragen von dieser IP, bitte versuche es später erneut.',
    retryAfter: '15 Minuten'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Data sanitization
app.use(mongoSanitize());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/chat', chatRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Harmony Dating App API',
    version: '1.0.0',
    description: 'Deutsche Dating App für alle Altersgruppen',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      matching: '/api/matching',
      chat: '/api/chat',
      health: '/health'
    },
    documentation: 'https://docs.harmony-dating.de'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Socket.IO für Echtzeit-Chat
io.on('connection', (socket) => {
  console.log('Benutzer verbunden:', socket.id);

  // Chat-Room beitreten
  socket.on('join-chat', (chatId: string) => {
    socket.join(chatId);
    console.log(`Benutzer ${socket.id} ist Chat ${chatId} beigetreten`);
  });

  // Nachricht senden
  socket.on('send-message', (data: { chatId: string; message: string; senderId: string }) => {
    // Nachricht an alle im Chat-Room senden
    io.to(data.chatId).emit('new-message', {
      id: Date.now().toString(),
      text: data.message,
      senderId: data.senderId,
      timestamp: new Date().toISOString()
    });
  });

  // Typing-Indikator
  socket.on('typing', (data: { chatId: string; userId: string; isTyping: boolean }) => {
    socket.to(data.chatId).emit('user-typing', {
      userId: data.userId,
      isTyping: data.isTyping
    });
  });

  // Verbindung trennen
  socket.on('disconnect', () => {
    console.log('Benutzer getrennt:', socket.id);
  });
});

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🎵 Harmony Backend läuft auf Port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🗄️ Database: ${process.env.MONGODB_URI ? 'Verbunden' : 'Nicht konfiguriert'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM empfangen, Server wird heruntergefahren...');
  server.close(() => {
    console.log('Server erfolgreich heruntergefahren');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT empfangen, Server wird heruntergefahren...');
  server.close(() => {
    console.log('Server erfolgreich heruntergefahren');
    process.exit(0);
  });
});

export default app;
