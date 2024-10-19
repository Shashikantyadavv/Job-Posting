const express = require('express');
const { registerCompany, verifyOtp, loginCompany, sendEmailOtp } = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();


router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('employeeSize', 'Employee size is required').not().isEmpty(),
  ],
  registerCompany
);

router.post('/verify/:email/:otp', verifyOtp);

router.post('/send', sendEmailOtp);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginCompany
);

module.exports = router;
