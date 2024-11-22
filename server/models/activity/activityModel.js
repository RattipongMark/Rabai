const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
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
    detail: {
        type: String,
        required: true,  
    },
    location: {
        type: String,
        required: true, 
    },
    participant: {
        type: Number,
        required: true, 
    }, 
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',  
        required: true,
    },
    create_at: {
        type: Date,
        default: Date.now, 
    },
});


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;