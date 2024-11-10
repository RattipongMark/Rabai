const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',  
        required: true,
    },
    content: {
        type: String,
        required: true,  
    },
    create_at: {
        type: Date,
        default: Date.now, 
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;