const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');
const { generateAndSendOtp } = require('../utils/sendOtp')

exports.registerCompany = async (req, res) => {
  console.log(req.body);
  const { name, email, companyName, password, phone, employeeSize } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let company = await Company.findOne({ email });
    if (company) return res.status(400).json({ msg: 'Company already exists' });

    company = new Company({ name, email, companyName, password, phone, employeeSize });

    await company.save();
    const responseMessage = await generateAndSendOtp(company, email);
    res.status(201).json({ msg: 'Company registered, verification email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.sendEmailOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const company = await Company.findOne({ email });
    console.log(company);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }
    console.log(company.isVerified, typeof company.isVerified);
    console.log(company.isVerified);

    if (company.isVerified === true) {
      console.log("hello");
      return res.status(200).json({ message: 'Email Already verified' });
    }
    else {
      const responseMessage = await generateAndSendOtp(company, email);
      return res.status(200).json({ message: 'Email OTP Sent!' });
    }

  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
};


exports.verifyOtp = async (req, res) => {
  console.log(req);
  const { email, otp } = req.params;
  console.log(email, otp);

  const company = await Company.findOne({ email });
  if (!company) return res.status(404).json({ message: 'Company not found.' });
  if (company.isVerified) {
    return res.status(200).json({ message: 'Email Already verified' });
  }

  if (company.otp === otp) {
    company.isVerified = true;
    company.otp = undefined;
    await company.save();
    return res.status(200).json({ message: 'Email verified successfully!' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }
};

exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ msg: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(404).json({ msg: 'Invalid credentials' });
    
    if (!company.isVerified) return res.status(403).json({ msg: 'Please verify your email first' });
    
    const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const id = company._id ;

    res.json({ token,id});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
