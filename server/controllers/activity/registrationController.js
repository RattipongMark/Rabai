const Actregist = require('../../models/activity/registrationModel'); 

exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Actregist.find().populate('userId').populate('activityId');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching registrations' });
    }
};


exports.createRegistration = async (req, res) => {
    try {
        const { userId, activityId } = req.body;
        const newRegistration = new Actregist({
            userId,
            activityId,
        });
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        res.status(500).json({ error: 'Error creating registration' });
    }
};


exports.deleteRegistration = async (req, res) => {
    try {
        const {id} = req.body;
        const registration = await Actregist.findByIdAndDelete(id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting registration' });
    }
};
