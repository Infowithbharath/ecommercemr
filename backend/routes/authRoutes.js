const express = require('express');
const { requestOTP, verifyOTP } = require('../controllers/authController');
const router = express.Router();

// POST: Request OTP
router.post('/request-otp', requestOTP);

// POST: Verify OTP
router.post('/verify-otp', verifyOTP);

module.exports = router;
