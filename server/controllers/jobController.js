const Job = require('../models/Job');
const EmailLog = require('../models/EmailLog');
const nodemailer = require('nodemailer');

const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

exports.createJob = async (req, res) => {
  console.log(req);
  const { title, description, experienceLevel, candidates, endDate } = req.body;

  try {
    const job = new Job({
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
      company: req.body.company,
    });

    await job.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const companyName = req.body.company.companyName;
    const companyDescription = "We are a Unicorn";
    const companyAddress = "Mars";
    const companyPhone = "985665";
    const context = { title, companyName, description, experienceLevel, endDate, companyDescription, companyName, companyAddress, companyPhone };

    const templatePath = path.join(__dirname, '../templates', 'jobMail.hbs');

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = hbs.compile(templateSource);
    const html = template(context);

    candidates.forEach(async (candidate) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidate,
        subject: `Job Opportunity: ${title}`,
        html,
      };

      await transporter.sendMail(mailOptions);
    });

    const emailLog = new EmailLog({
      jobId: job._id,
      candidates,
    });

    await emailLog.save();

    res.status(201).json({ msg: 'Job created and emails sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
