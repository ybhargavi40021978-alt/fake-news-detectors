const Analysis = require('../models/Analysis');
const aiService = require('../services/aiService');

// @desc    Analyze news
// @route   POST /api/analysis/analyze
// @access  Private
const analyzeNews = async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'News text is required'
      });
    }

    console.log(`🔍 Analyzing news in ${language}...`);
    console.log(`📝 Text preview: ${text.substring(0, 100)}...`);
    
    // Call ML model for analysis
    const analysisResult = await aiService.analyzeNews(text, language);
    
    console.log(`✅ Analysis result: ${analysisResult.result} (${analysisResult.confidence}%)`);
    
    // Save analysis to database
    const analysis = await Analysis.create({
      user: req.user._id,
      text: text.trim(),
      language,
      result: analysisResult.result,
      confidence: analysisResult.confidence,
      reason: analysisResult.reason,
      analysisTime: 0
    });

    res.status(201).json({
      success: true,
      message: 'Analysis completed successfully',
      data: {
        _id: analysis._id,
        result: analysis.result,
        confidence: analysis.confidence,
        reason: analysis.reason,
        language: analysis.language,
        analysisTime: analysis.analysisTime,
        createdAt: analysis.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user analysis history
// @route   GET /api/analysis/history
// @access  Private
const getAnalysisHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Analysis.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: analyses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single analysis by ID
// @route   GET /api/analysis/:id
// @access  Private
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('❌ Get analysis by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete analysis
// @route   DELETE /api/analysis/:id
// @access  Private
const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete analysis error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Clear all analysis history
// @route   DELETE /api/analysis/history/clear
// @access  Private
const clearAllHistory = async (req, res) => {
  try {
    await Analysis.deleteMany({ user: req.user._id });

    res.json({
      success: true,
      message: 'All analysis history cleared successfully'
    });
  } catch (error) {
    console.error('❌ Clear history error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get analysis stats
// @route   GET /api/analysis/stats
// @access  Private
const getAnalysisStats = async (req, res) => {
  try {
    const total = await Analysis.countDocuments({ user: req.user._id });
    const real = await Analysis.countDocuments({ user: req.user._id, result: 'REAL' });
    const fake = await Analysis.countDocuments({ user: req.user._id, result: 'FAKE' });
    
    const languageStats = await Analysis.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$language', count: { $sum: 1 } } }
    ]);

    const accuracy = total > 0 ? Math.round((real / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        total,
        real,
        fake,
        accuracy,
        languageStats
      }
    });
  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  analyzeNews,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
  clearAllHistory,
  getAnalysisStats
};