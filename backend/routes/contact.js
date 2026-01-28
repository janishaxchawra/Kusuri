
const express = require('express');
const { sendContactNotification } = require('../utils/whatsapp');

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Handle contact form submission
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, message'
      });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Send WhatsApp notification to admin
    const contactDetails = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim()
    };

    // Send notification asynchronously
    sendContactNotification(contactDetails).catch(err => {
      console.error('WhatsApp notification error:', err);
    });

    res.json({
      success: true,
      message: 'Thank you for contacting us! Admin has been notified via WhatsApp. We will get back to you soon via email or phone.'
    });

    console.log(`✅ Contact form submitted by ${email}`);
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;