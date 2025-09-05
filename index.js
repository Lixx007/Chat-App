// index.js
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

// HTTP server create karo
const server = http.createServer(app);

// Socket.IO attach karo
const io = new Server(server);

// Port set karo
const port = process.env.PORT || 3000;

// Static files serve karo
app.use(express.static(__dirname + '/public'));

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io logic
io.on('connection', (socket) => {
    console.log("⚡ User connected");

    socket.on('send message', (data) => {
        io.emit('receive message', data);
    });

    socket.on('disconnect', () => {
        console.log("❌ User disconnected");
    });
});

// Server start karo
server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
