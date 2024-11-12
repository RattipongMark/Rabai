const mongoose = require('mongoose');


const anonyUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
        unique: true, 
    },
    fakeName: {
        type: String,
        required: true,
        unique: true, 
    },
    avatar:{
        type: String,
        required: true,
    }
});



const AnonyUser  = mongoose.model('AnonyUser', anonyUserSchema);

module.exports = AnonyUser;