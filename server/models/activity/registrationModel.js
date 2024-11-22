const mongoose = require('mongoose');


const actregistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
        index: true
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',  
        required: true,
        index: true,
    },
    create_at: {
        type: Date,
        default: Date.now, 
    },
});



const Actregist = mongoose.model('Actregist', actregistSchema);

module.exports = Actregist;