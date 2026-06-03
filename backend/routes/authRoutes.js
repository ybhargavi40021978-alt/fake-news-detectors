const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth route is working' });
});

// Register
router.post('/register', (req, res) => {
  console.log('📝 Register request:', req.body);
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and password'
    });
  }
  
  res.json({
    success: true,
    message: 'Registration successful!',
    data: {
      _id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    }
  });
});

// Login
router.post('/login', (req, res) => {
  console.log('🔐 Login request:', req.body);
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
      _id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    }
  });
});

// Social login
router.post('/social-login', (req, res) => {
  console.log('🌐 Social login:', req.body);
  const { provider, email, name } = req.body;
  
  res.json({
    success: true,
    message: `${provider} login successful!`,
    data: {
      _id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 20)
    }
  });
});

// Get current user
router.get('/me', (req, res) => {
  res.json({
    success: true,
    data: {
      _id: '123456',
      name: 'Test User',
      email: 'test@example.com'
    }
  });
});

module.exports = router;