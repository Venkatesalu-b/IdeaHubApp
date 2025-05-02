const express = require('express');
const http = require('http'); // Required for Socket.io
const { Server } = require('socket.io'); // Import Socket.io
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 7000;
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: `http://localhost:${port}`, 
        methods: ["GET", "POST"],
    },
});

// Import Routes & Pass io
const createProfile = require('./backend_code/createprofile/createProfile');
const signUp = require('./backend_code/signUpWithProfile/signUpWithProfile');
const RequestPage = require('./backend_code/Request/Request');
const ChatAPI = require('./backend_code/ChatApi/ChatAPI')

app.use('/', createProfile);
app.use('/', signUp);
app.use('/', RequestPage);
app.use('/', ChatAPI);

// Handle WebSocket Events
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        io.emit('receiveMessage', data); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start Server with WebSockets
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
