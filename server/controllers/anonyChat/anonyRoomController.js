const AnonyRoom = require('../../models/anonyChat/anonyRoomModel');
const Message = require('../../models/anonyChat/messageModel'); 

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



exports.getUserCountInRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        
        // นับจำนวน userId ที่ไม่ซ้ำในห้องที่มี roomId ที่ระบุ
        const userCount = await Message.distinct('userId', { room: roomId }).countDocuments();
        res.status(200).json({ roomId, userCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


