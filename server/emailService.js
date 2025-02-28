const nodemailer = require('nodemailer');

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service provider
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

// Send email function
const sendConfirmationEmail = (email, subject, message) => {
  const mailOptions = {
    from: 'youremail@gmail.com', // Sender's email
    to: email,                   // Recipient's email
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendConfirmationEmail;
