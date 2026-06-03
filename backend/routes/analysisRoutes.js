const express = require('express');
const router = express.Router();
const {
  analyzeNews,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
  clearAllHistory,
  getAnalysisStats
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)
router.use(protect);

// Analysis routes
router.post('/analyze', analyzeNews);
router.get('/history', getAnalysisHistory);
router.get('/stats', getAnalysisStats);
router.delete('/history/clear', clearAllHistory);
router.get('/:id', getAnalysisById);
router.delete('/:id', deleteAnalysis);

module.exports = router;