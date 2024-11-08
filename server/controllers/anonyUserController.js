const AnonyUser = require('../models/anonyUserModel'); 
const createError = require('../utils/appError');

exports.createAnony = async (req, res, next) => {
    try {
        const { userId, fakeName } = req.body;
        console.log("this ms from serve ->",userId, fakeName)
        // Check if the fake name already exists in the database
        const existingFakeName = await AnonyUser.findOne({ fakeName });
        if (existingFakeName) {
            return res.status(400).json({ message: 'Fake name already taken!' });
        }

        // Create a new FakeName entry
        const newFakeName = new AnonyUser({
            userId,
            fakeName,
        });

        // Save the new entry to the database
        await newFakeName.save();
        res.status(201).json({ message: 'Fake name saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAnony = async (req, res, next) => {
    try {
        // Find the fake name by userId
        console.log("hello from serve ->",req.params.userId);
        const fakeName = await AnonyUser.findOne({ userId: req.params.userId });
        console.log("fakename is",fakeName);
        if (!fakeName) {
            return res.status(404).json({ message: 'Fake name not found' });
        }
        res.json(fakeName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
