const Activity = require('../../models/activity/activityModel'); 

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('userId').populate('tagId');
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activities' });
    }
};


exports.createActivity = async (req, res) => {
    try {
        const { userId, title, description, location, event_time, tagId } = req.body;
        const newActivity = new Activity({
            userId,
            title,
            description,
            location,
            event_time,
            tagId,
        });
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ error: 'Error creating activity' });
    }
};


exports.deleteActivity = async (req, res) => {
    try {
        const {id} = req.body;
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting activity' });
    }
};