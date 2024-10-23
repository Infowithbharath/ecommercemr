const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Setup email service
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send OTP via email
const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
};

// Request OTP (Phone or Email)
exports.requestOTP = async (req, res) => {
    const { phone, email } = req.body;

    if (!phone || !email) {
        return res.status(400).json({ message: 'Phone and email are required' });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ phone, email, otp, otpExpiry });
    } else {
        user.otp = otp;
        user.otpExpiry = otpExpiry;
    }

    await user.save();
    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent successfully to your email' });
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        message: 'OTP verified successfully',
        token,
        user: {
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
        },
    });
};
