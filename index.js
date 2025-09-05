const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

// Static files
app.use(express.static(__dirname + '/public'));

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// ✅ Secret Key
const SECRET_KEY = "suhas2699";

// Middleware for authentication
io.use((socket, next) => {
    const passkey = socket.handshake.auth.passkey;
    if (passkey === SECRET_KEY) {
        return next();
    }
    return next(new Error("Invalid Passkey!"));
});

// Chat events
io.on('connection', (socket) => {
    console.log("⚡ User connected");

    socket.on('send message', (data) => {
        io.emit('receive message', data);
    });

    socket.on('disconnect', () => {
        console.log("❌ User disconnected");
    });
});

server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});


