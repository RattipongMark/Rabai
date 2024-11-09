const Message = require('../../models/anonyChat/messageModel'); 
const createError = require('../../utils/appError');


exports.createMessage = async (req, res, next) => {
    try {
        const { content, room , userId,userName} = req.body;
        if (!content || !room) {
            return next(new createError('Content and room are required', 400));
        }

        const newMessage = await Message.create({
            userId,
            userName,
            room,
            content,
        });

        res.status(201).json({
            status: 'success',
            message: 'Message create successfully',
            data: {
                message: newMessage,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getMessagesByRoom = async (req, res, next) => {
    try {
        const { room } = req.params;

        const messages = await Message.find({ room })
            .populate('userId', 'userName') // ดึงข้อมูลของผู้ส่ง
            .sort({ timestamp: -1 }); // เรียงตามเวลาใหม่ที่สุด

        res.status(200).json({
            status: 'success',
            results: messages.length,
            data: {
                messages,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMessagesByRoom = async (req, res, next) => {
    try {
        const { room } = req.params;
        const del_room = await Message.deleteMany({ room });

        if (del_room.deletedCount === 0) {
            return res.status(404).json({ message: 'No messages found for this room' });
        }

        res.status(200).json({ message: 'Messages deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

