const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        required: true,
        unique: true, 
    },
    tagColor:{
        type: String,
        require: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now,  
    },
});

TagSchema.pre('remove', async function(next) {
    try {
        // Find and delete all AnonyRooms that reference this Tag
        await AnonyRoom.deleteMany({ tagId: this._id });
        next();
    } catch (error) {
        next(error);
    }
});


const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;