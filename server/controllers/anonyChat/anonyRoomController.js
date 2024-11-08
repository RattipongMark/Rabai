const AnonyRoom = require('../../models/anonyChat/anonyRoomModel');

exports.createAnonyRoom = async (req, res) => {
    try {
        const { roomName, maxParticipants, tagId } = req.body;

        if (!roomName || !maxParticipants || !tagId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newRoom = new AnonyRoom({ roomName, maxParticipants, tagId });
        await newRoom.save();

        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAnonyRoomByRoomName = async (req, res) => {
    try {
        const { roomName } = req.params;
        const room = await AnonyRoom.findOne({ roomName }).populate('tagId'); // Populate tag details if needed

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteAnonyRoomByRoomName = async (req, res) => {
    try {
        const { roomName } = req.params;
        const room = await AnonyRoom.findOneAndDelete({ roomName });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};