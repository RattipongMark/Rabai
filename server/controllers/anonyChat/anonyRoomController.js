const AnonyRoom = require('../../models/anonyChat/anonyRoomModel');
const Message = require('../../models/anonyChat/messageModel'); 

exports.createAnonyRoom = async (req, res) => {
    try {
        const { roomName, maxParticipants, tagId } = req.body;
        console.log("fromserve",roomName, maxParticipants, tagId)
        if (!roomName || !maxParticipants || !tagId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newRoom = new AnonyRoom({ roomName, maxParticipants, tagId });
        await newRoom.save();

        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


exports.getAnonyRoomByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await AnonyRoom.findById(roomId)
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteAnonyRoomByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await AnonyRoom.findById(roomId)

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAnonyRoomByName = async (req, res) => {
    try {
        const { roomName } = req.params;
        // เปลี่ยนจาก findById เป็น findOne และใช้ roomName ในการค้นหา
        const room = await AnonyRoom.findOne({ roomName });
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await AnonyRoom.deleteOne({ roomName: req.params.roomName });
        const result = await Message.deleteMany({ room: req.params.roomName });
        console.log('Deleted messages:', result);
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllAnonyRooms = async (req, res) => {
    try {
        // ดึงข้อมูลทุกห้องจากฐานข้อมูล
        const rooms = await AnonyRoom.find()

        if (rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found' });
        }

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




