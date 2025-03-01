const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const dns = require('dns');

// Force DNS resolution to use IPv4
dns.setDefaultResultOrder('ipv4first');

const server = http.createServer(app);
const io = socketIo(server);

// POST route to handle form submissions
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hakke_inquiries'
  });

app.use(cors());

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// Fallback for handling the root route and serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static('client'));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Handle sending message
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

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
        user: '',
        pass: ''  // Use app password if using 2FA
      },
      tls: {
        rejectUnauthorized: false  // Disable certificate validation (not secure)
      }
    });
    

    const mailOptions = {
      from: 'dslohith4@gmail.com',
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

// Start the server on a specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
