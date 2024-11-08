const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const messageRouter = require('./routes/anonyChat/messageRoute');
const socketIo = require('socket.io');
const app = express();
const anonyUserRouter = require('./routes/anonyChat/anonyUserRoute');
const anonyRoomRouter = require('./routes/anonyChat/anonyRoomRoute');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/anony', anonyUserRouter);
app.use('/api/room', anonyRoomRouter);

// DB Connection
mongoose
    .connect('mongodb+srv://Iamdev:password1234@rabaiweb.gpd3d.mongodb.net/rabaiweb?retryWrites=true&w=majority&appName=RabaiWeb')
    .then(() => console.log('Connected to DB success!!'))
    .catch((error) => console.error('Failed to connect DB : ', error));

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Server setup
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Start Socket.IO with server
const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for incoming messages
    socket.on('sendMessage', (newMessage) => {
        console.log('New message received:', newMessage);

        // ตรวจสอบให้แน่ใจว่ามี `userId` และ `userName` อยู่ใน `newMessage.user`
        const messageToEmit = {
            userId: newMessage.user.userId,
            userName: newMessage.user.userName,
            roomName: newMessage.roomName,
            content: newMessage.content,
        };

        // Emit the message to all connected clients
        io.emit('newMessage', messageToEmit);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
