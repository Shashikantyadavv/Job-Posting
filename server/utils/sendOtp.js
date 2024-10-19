const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

exports.generateAndSendOtp = async (company, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        company.otp = otp;
        await company.save();

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: email,                    
            subject: 'Verify your account',
            text: `Your OTP is: ${otp}`,  
        };

        await transporter.sendMail(mailOptions);
        return "OTP sent successfully";
    } catch (err) {
        console.error(err);
        return err.message; 
    }
};
