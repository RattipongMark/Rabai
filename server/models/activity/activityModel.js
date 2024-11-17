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
    description: {
        type: String,
        required: true,  
    },
    location: {
        type: String,
        required: true, 
    },
    event_time: {
        type: Date,
        default: Date.now, 
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',  
        required: true,
        index: true,
    },
    create_at: {
        type: Date,
        default: Date.now, 
    },
});



const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;