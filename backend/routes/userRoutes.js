const express = require('express');
const router = express.Router();

// Update profile
router.put('/profile', (req, res) => {
  console.log('📝 Profile update:', req.body);
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: '123456',
      name: req.body.name || 'User',
      email: req.body.email || 'user@example.com',
      phone: req.body.phone || ''
    }
  });
});

// Get user stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      real: 0,
      fake: 0,
      accuracy: 0
    }
  });
});

// Delete account
router.delete('/account', (req, res) => {
  res.json({
    success: true,
    message: 'Account deleted successfully'
  });
});

module.exports = router;