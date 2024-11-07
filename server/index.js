const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute')
const messageRouter = require('./routes/messageRoute');
const socketIo = require('socket.io');
const app = express();

// middle wares
app.use(cors());
app.use(express.json());

// route
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

// db connect
mongoose
    .connect('mongodb+srv://Iamdev:password1234@rabaiweb.gpd3d.mongodb.net/rabaiweb?retryWrites=true&w=majority&appName=RabaiWeb')
    .then(() => console.log('Connected to DB success!!'))
    .catch((error) => console.error('Failed to connect DB : ',error));

// global error handler
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
})

// server
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// start Socket.IO with server
const io = socketIo(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');


    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});