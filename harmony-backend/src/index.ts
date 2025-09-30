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

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 900000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut.'
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Harmony Dating App API',
    version: '1.0.0',
    description: 'Deutsche Dating App für alle Altersgruppen',
    endpoints: {
      health: '/health'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Interner Serverfehler',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Etwas ist schiefgelaufen'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nicht gefunden',
    path: req.originalUrl
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🎵 Harmony Backend läuft auf Port ${PORT}`);
  console.log(`📚 API Dokumentation: http://localhost:${PORT}/`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;