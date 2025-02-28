const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
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

server.listen(4000, () => {
  console.log('Chat server running on port 4000');
});
