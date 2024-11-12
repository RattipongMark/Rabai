const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
        index: true
    },
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,  
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',  
        required: true,
        index: true
    },
    like: {
        type: Number,
        default: 0,  
    },
    create_at: {
        type: Date,
        default: Date.now, 
    },
    update_at: {
        type: Date,
        default: Date.now,
        required: true, 
    },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;