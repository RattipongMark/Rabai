const AnonyUser = require('../../models/anonyChat/anonyUserModel'); 
const createError = require('../../utils/appError');
const Message = require('../../models/anonyChat/messageModel')

exports.createAnony = async (req, res, next) => {
    try {
        const { userId, fakeName,avatar } = req.body;
        // Check if the fake name already exists in the database
        const existingFakeName = await AnonyUser.findOne({ fakeName });
        console.log("from server",existingFakeName)
        if (existingFakeName) {
            return res.status(400).json({ message: 'Fake name already taken!' });
        }

        // Create a new FakeName entry
        const newFakeName = new AnonyUser({
            userId,
            fakeName,
            avatar
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
        const fakeName = await AnonyUser.findOne({ userId: req.params.userId });
        if (!fakeName) {
            return res.status(404).json({ message: 'Fake name not found' });
        }
        res.json(fakeName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteAnonyById = async (req, res) => {
    try {
        const fakeName = await AnonyUser.findOne({ userId: req.params.userId });
        if (!fakeName) {
            return res.status(404).json({ message: 'Fake Id not found' });
        }
        await AnonyUser.deleteOne({ userId: req.params.userId });
        // const result = await Message.deleteMany({ userId: fakeName._id });
        // console.log('Deleted messages:', result);
        res.json({ message: 'delete succes' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};