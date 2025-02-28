const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hakke_inquiries'
});

// Middleware
app.use(bodyParser.json());

// POST endpoint to save inquiry
app.post('/submit-inquiry', (req, res) => {
  const { name, email, phone, product_id, quantity, additional_requirements } = req.body;

  const sql = 'INSERT INTO customers (name, email, phone, product_id, quantity, additional_requirements) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, product_id, quantity, additional_requirements], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    // Send email confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });

    const mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject: 'Inquiry Confirmation',
      text: 'Thank you for your inquiry. We will get back to you soon.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });

    res.status(200).send('Inquiry submitted successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
