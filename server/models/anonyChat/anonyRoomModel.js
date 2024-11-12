const mongoose = require('mongoose');

const anonyRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true, 
    },
    maxParticipants: {
        type: Number,
        required: true,  
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',  
        required: true,
        unique: false,
        index: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,  
    },
});

const AnonyRoom = mongoose.model('AnonyRoom', anonyRoomSchema);

module.exports = AnonyRoom;