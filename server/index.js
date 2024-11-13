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
const AnonyUser = require('./models/anonyChat/anonyUserModel');
const boardRouter = require('./routes/discussBoard/boardRoute');
const commmentRouter  = require('./routes/discussBoard/commentRoute');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/anony', anonyUserRouter);
app.use('/api/room', anonyRoomRouter);
app.use('/api/tag', tagRouter);
app.use('/api/board', boardRouter);
app.use('/api/comment', commmentRouter);

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
    const roomUserCounts = Object.keys(usersInRoom).reduce((counts, roomName) => {
        counts[roomName] = usersInRoom[roomName].length; // Count users in each room
        return counts;
    }, {});

    socket.emit('allRoomUserCounts', roomUserCounts);

    socket.on('joinRoom', async (roomName, userName) => {
        console.log('Client connected');
        
        if (!userName) {
            return; // If there's no userName, don't join the room
        }

        socket.join(roomName);
        try {
            const user = await AnonyUser.findOne({ fakeName: userName });

            if (user) {
                // Add the user to usersInRoom
                if (!usersInRoom[roomName]) {
                    usersInRoom[roomName] = [];
                }
                if(!checkUser[userName]){
                    usersInRoom[roomName].push({ userName: user.fakeName, avatar: user.avatar });
                    checkUser[userName] = true;
                }
                

                // Emit the updated list of users to all clients in the room
                io.to(roomName).emit('updateRoomUsers', usersInRoom[roomName]);
                // console.log(usersInRoom[roomName].length)
                io.to(roomName).emit('updateUserCount', { roomName, count: usersInRoom[roomName].length });
            }
        } catch (error) {
            console.error('Error fetching user avatar:', error.message);
        }
    });

    

    socket.on('sendMessage', (newMessage) => {
        // Emit message to all connected clients
        io.emit('newMessage', {
            userId: newMessage.user.userId,
            userName: newMessage.user.userName,
            roomName: newMessage.roomName,
            content: newMessage.content,
            avatar: newMessage.user.avatar,
        });
    });

    
    socket.on("leaveRoom", async (roomName, userName, userId) => {
        socket.leave(roomName);
        
        if (!userName) {
            return; // Ensure userName is provided before removing
        }
       
        
        if (usersInRoom[roomName]) {
            if(checkUser[userName]){
                usersInRoom[roomName] = usersInRoom[roomName].filter(user => user.userName !== userName);
                checkUser[userName] = false;
            }

            if(usersInRoom[roomName].length == 0){
                try {
                    const res = await axios.delete(`http://localhost:3000/api/room/name/${roomName}`);
                    console.log("room delete succes");
                } catch (error) {
                    console.error('Error deleting user:', error.message);
                }
            }
            // Emit updated user list and count
            io.to(roomName).emit('updateRoomUsers', usersInRoom[roomName]);
            io.to(roomName).emit('updateUserCount', { roomName, count: usersInRoom[roomName].length });
        }

        // Optional: Delete the user from the database if required
        try {
            const res = await axios.delete(`http://localhost:3000/api/anony/${userId}`);
            console.log("delete succes");
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
