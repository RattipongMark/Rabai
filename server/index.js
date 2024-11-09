const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const messageRouter = require('./routes/anonyChat/messageRoute');
const socketIo = require('socket.io');
const app = express();
const anonyUserRouter = require('./routes/anonyChat/anonyUserRoute');
const anonyRoomRouter = require('./routes/anonyChat/anonyRoomRoute');
const tagRouter = require('./routes/tagRoute')
const axios = require('axios');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/anony', anonyUserRouter);
app.use('/api/room', anonyRoomRouter);
app.use('/api/tag', tagRouter);

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


let usersInRoom = {};
let checkUser = {};

io.on('connection', (socket) => {
    socket.emit('allRoomUserCounts', usersInRoom);

    socket.on('joinRoom', (roomName, userName) => {
        console.log('Client connected');
        
        if (!userName) {
            return; // If there's no userName, don't join the room
        }

        socket.join(roomName);

        // If user is new, increment the user count for the room
        if (!checkUser[userName]) {
            usersInRoom[roomName] = usersInRoom[roomName] ? usersInRoom[roomName] + 1 : 1;
        }
        checkUser[userName] = true; // Mark user as already joined

        // Emit updated user count to everyone in the room
        io.emit('updateUserCount', { roomName, count: usersInRoom[roomName] });
        

        console.log(`${userName} joined ${roomName} : ${usersInRoom[roomName]}`);
    });

    

    socket.on('sendMessage', (newMessage) => {
        // Emit message to all connected clients
        io.emit('newMessage', {
            userId: newMessage.user.userId,
            userName: newMessage.user.userName,
            roomName: newMessage.roomName,
            content: newMessage.content,
        });
    });

    
    socket.on("leaveRoom", async (roomName, userName, userId) => {
        socket.leave(roomName);
        
        if (!userName) {
            return; // Ensure userName is provided before removing
        }

        if (checkUser[userName]) {
            // Decrease the user count when they leave the room
            usersInRoom[roomName] = usersInRoom[roomName] ? usersInRoom[roomName] - 1 : 0;
        }

        checkUser[userName] = false; // Mark user as left the room
        try {
            const response = await axios.delete(`http://localhost:3000/api/anony/${userId}`);
            console.log('Delete response:', response.data); // Log the API response
    
            // Emit updated user count to everyone in the room
            io.emit('updateUserCount', { roomName, count: usersInRoom[roomName] });
            console.log(`${userName} left ${roomName} : ${usersInRoom[roomName]}`);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    });

    // Handle disconnection of a client
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Here, you could clean up user counts or manage other disconnect logic if needed
    });
});
