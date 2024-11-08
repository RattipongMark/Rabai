const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true, 
    },
    timestamp: {
        type: Date,
        default: Date.now,  
    },
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;