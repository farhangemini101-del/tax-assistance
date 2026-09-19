require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');
const { initMySQL } = require('./config/mysql');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Databases
initMySQL();
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploads statically
const os = require('os');
const uploadDir = process.env.VERCEL 
  ? path.join(os.tmpdir(), 'uploads') 
  : path.join(__dirname, 'uploads');

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (e) {
  console.warn('Upload directory check warning:', e.message);
}

app.use('/uploads', express.static(uploadDir));

// Mount API Routes (mount at /api and also root to handle Vercel rewrites seamlessly)
app.use('/api', apiRoutes);
app.use(apiRoutes);

// Serve static client assets in production (when run directly outside Vercel)
const clientDistPath = path.join(__dirname, '../client/dist');
if (!process.env.VERCEL && fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else if (!process.env.VERCEL) {
  // Health route fallback if dist not built yet
  app.get('/', (req, res) => {
    res.json({
      firm: "Tax Assistance (TA), RHA Advisory & Co.",
      service: "Backend API Server",
      status: "Active",
      documentation: "/api/status"
    });
  });
}

// Only bind and listen to port if executed directly (standalone/local), not on Vercel serverless
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Tax Assistance Server running on port ${PORT}`);
    console.log(`📡 API Base: http://localhost:${PORT}/api`);
    console.log(`====================================================`);
  });
}

module.exports = app;
