const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnonyUser',  
        required: true,
        index: true
    },
    userName:{
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,  
    },
    content: {
        type: String,
        required: true,  
    },
    timestamp: {
        type: Date,
        default: Date.now,  
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;