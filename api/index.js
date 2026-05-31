require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../sena-server/config/db');
const userRoutes = require('../sena-server/routes/useRoutes');
const articleRoutes = require('../sena-server/routes/articleRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('/{*splat}', cors(corsOptions));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Sena server API is running' });
});

const withDatabase = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
};

app.use('/api/users', withDatabase);
app.use('/api/users', userRoutes);
app.use('/api/articles', withDatabase);
app.use('/api/articles', articleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// Export for Vercel Serverless Functions
module.exports = app;
