
const express = require('express');
const Feedback = require('../models/feedback');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { rating, message } = req.body;

    // Validation
    if (!rating || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both rating and message'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const feedback = new Feedback({
      name: req.user.name,
      email: req.user.email,
      rating: Number(rating),
      message: message.trim()
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your valuable feedback! We appreciate your input.',
      feedback
    });

    console.log(`✅ Feedback submitted by ${req.user.email} - Rating: ${rating}/5`);
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/feedback
 * @desc    Get all feedback (Admin only)
 * @access  Private/Admin
 */
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Fetch feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/feedback/stats
 * @desc    Get feedback statistics (Admin only)
 * @access  Private/Admin
 */
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalFeedback: { $sum: 1 },
          fiveStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] }
          },
          fourStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] }
          },
          threeStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] }
          },
          twoStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] }
          },
          oneStarCount: {
            $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      averageRating: 0,
      totalFeedback: 0,
      fiveStarCount: 0,
      fourStarCount: 0,
      threeStarCount: 0,
      twoStarCount: 0,
      oneStarCount: 0
    };

    res.json({
      success: true,
      stats: result
    });
  } catch (error) {
    console.error('Fetch feedback stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   DELETE /api/feedback/:id
 * @desc    Delete feedback (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });

    console.log(`✅ Feedback ${feedback._id} deleted by ${req.user.email}`);
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;