const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    OwnerActId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    actregistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Actregist', required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const NotiAct = mongoose.model('NotiAct', notificationSchema);
module.exports = NotiAct