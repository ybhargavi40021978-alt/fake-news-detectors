const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// ============ ROUTES ============

// Base API route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'AI Truth Engine API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        socialLogin: 'POST /api/auth/social-login',
        me: 'GET /api/auth/me'
      },
      analysis: {
        analyze: 'POST /api/analysis/analyze',
        history: 'GET /api/analysis/history',
        stats: 'GET /api/analysis/stats'
      },
      users: {
        profile: 'PUT /api/users/profile',
        stats: 'GET /api/users/stats',
        delete: 'DELETE /api/users/account'
      }
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ============ AUTH ROUTES ============
app.post('/api/auth/register', (req, res) => {
  console.log('📝 Register:', req.body);
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and password'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }
  
  res.json({
    success: true,
    message: 'Registration successful!',
    data: {
      _id: 'user_' + Date.now(),
      name: name,
      email: email,
      token: 'jwt_token_' + Date.now()
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }
  
  res.json({
    success: true,
    message: 'Login successful!',
    data: {
      _id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      token: 'jwt_token_' + Date.now()
    }
  });
});

app.post('/api/auth/social-login', (req, res) => {
  console.log('🌐 Social Login:', req.body);
  const { provider, email, name } = req.body;
  
  res.json({
    success: true,
    message: `${provider} login successful!`,
    data: {
      _id: 'social_' + Date.now(),
      name: name,
      email: email,
      token: 'social_jwt_token_' + Date.now()
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization;
  console.log('🔑 Get me:', token ? 'Has token' : 'No token');
  
  res.json({
    success: true,
    data: {
      _id: 'user_123',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890'
    }
  });
});

// ============ USER ROUTES ============
app.put('/api/users/profile', (req, res) => {
  console.log('📝 Update Profile:', req.body);
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: 'user_123',
      name: req.body.name || 'User',
      email: req.body.email || 'user@example.com',
      phone: req.body.phone || ''
    }
  });
});

app.get('/api/users/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 25,
      real: 18,
      fake: 7,
      accuracy: 72
    }
  });
});

app.delete('/api/users/account', (req, res) => {
  res.json({
    success: true,
    message: 'Account deleted successfully'
  });
});

// ============ ANALYSIS ROUTES ============
app.post('/api/analysis/analyze', (req, res) => {
  console.log('🤖 Analyze:', { 
    text: req.body.text?.substring(0, 50), 
    language: req.body.language 
  });
  
  const { text, language = 'en' } = req.body;
  
  if (!text || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'News text is required'
    });
  }
  
  // Simulate AI analysis
  const isReal = Math.random() > 0.3;
  const confidence = Math.floor(Math.random() * 20) + 80;
  
  const responses = {
    REAL: {
      en: "✅ Verified patterns match trusted news sources.",
      hi: "✅ सत्यापित पैटर्न विश्वसनीय समाचार स्रोतों से मेल खाते हैं।",
      ta: "✅ சரிபார்க்கப்பட்ட வடிவங்கள் நம்பகமான செய்தி ஆதாரங்களுடன் பொருந்துகின்றன."
    },
    FAKE: {
      en: "⚠️ Suspicious wording and low credibility indicators detected.",
      hi: "⚠️ संदिग्ध शब्दावली और कम विश्वसनीयता संकेतक का पता चला है।",
      ta: "⚠️ சந்தேகத்திற்கிடமான வார்த்தைகள் மற்றும் குறைந்த நம்பகத்தன்மை குறிகாட்டிகள் கண்டறியப்பட்டுள்ளன."
    }
  };
  
  const result = isReal ? 'REAL' : 'FAKE';
  const reason = responses[result][language] || responses[result].en;
  
  res.json({
    success: true,
    message: 'Analysis completed',
    data: {
      _id: 'analysis_' + Date.now(),
      result: result,
      confidence: confidence,
      reason: reason,
      language: language,
      analysisTime: Math.floor(Math.random() * 1500) + 500,
      createdAt: new Date().toISOString()
    }
  });
});

app.get('/api/analysis/history', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  // Mock history data
  const mockHistory = [
    {
      _id: '1',
      text: 'NASA confirms discovery of water on Mars...',
      result: 'REAL',
      confidence: 94,
      reason: 'Verified patterns match trusted news sources.',
      language: 'en',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      text: 'Breaking: Scientists discover cure for all diseases!',
      result: 'FAKE',
      confidence: 87,
      reason: 'Suspicious wording detected.',
      language: 'en',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  
  res.json({
    success: true,
    data: mockHistory,
    pagination: {
      page,
      limit,
      total: mockHistory.length,
      pages: Math.ceil(mockHistory.length / limit)
    }
  });
});

app.get('/api/analysis/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 156,
      real: 98,
      fake: 58,
      accuracy: 63,
      languageStats: [
        { _id: 'en', count: 89 },
        { _id: 'hi', count: 34 },
        { _id: 'ta', count: 18 }
      ]
    }
  });
});

app.get('/api/analysis/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      text: 'Sample news text...',
      result: 'REAL',
      confidence: 92,
      reason: 'Verified information.',
      language: 'en',
      createdAt: new Date().toISOString()
    }
  });
});

app.delete('/api/analysis/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Analysis deleted successfully'
  });
});

app.delete('/api/analysis/history/clear', (req, res) => {
  res.json({
    success: true,
    message: 'All history cleared successfully'
  });
});

// ============ 404 HANDLER ============
app.use('*', (req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`
  });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

// MongoDB connection (optional)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_truth_engine')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('⚠️ MongoDB not connected:', err.message));

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`${'='.repeat(50)}\n`);
  
  console.log('📋 Available Endpoints:');
  console.log('   GET    /api');
  console.log('   GET    /api/health');
  console.log('   POST   /api/auth/register');
  console.log('   POST   /api/auth/login');
  console.log('   POST   /api/analysis/analyze');
  console.log('   GET    /api/analysis/history');
  console.log('   GET    /api/analysis/stats');
  console.log('   PUT    /api/users/profile');
  console.log('   GET    /api/users/stats');
  console.log(`${'='.repeat(50)}\n`);
});