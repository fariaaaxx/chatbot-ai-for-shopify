// src/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    
    // TODO: Integrate with OpenAI API to get a response
    // const response = "AI response"; // Placeholder for actual AI response
    // socket.emit('chat message', response);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
