const mongoose = require('mongoose');

const anonyRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true, 
    },
    
});

const AnonyRoom = mongoose.model('AnonyRoom', anonyRoomSchema);

module.exports = AnonyRoom;