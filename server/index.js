const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute')
const app = express();

// middle wares
app.use(cors());
app.use(express.json());

// route
app.use('/api/auth', authRouter);
// db connect
mongoose
    .connect('mongodb+srv://Iamdev:password1234@rabaiweb.gpd3d.mongodb.net/rabaiweb?retryWrites=true&w=majority&appName=RabaiWeb')
    .then(() => console.log('Connected to DB success!!'))
    .catch((erorr) => console.error('Failed to connect DB : ',error));

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
app.listen(PORT,()=>{
    console.log(`App running on ${PORT}`);
})

