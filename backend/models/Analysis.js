const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'News text is required'],
    trim: true
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'hi', 'ta', 'te', 'ml', 'kn', 'bn', 'es', 'fr', 'de', 'zh', 'ja', 'ar']
  },
  result: {
    type: String,
    enum: ['REAL', 'FAKE'],
    required: true
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  reason: {
    type: String,
    required: true
  },
  analysisTime: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
analysisSchema.index({ user: 1, createdAt: -1 });
analysisSchema.index({ result: 1 });

module.exports = mongoose.model('Analysis', analysisSchema);