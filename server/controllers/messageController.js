const Message = require('../models/messageModel'); 
const createError = require('../utils/appError');


exports.createMessage = async (req, res, next) => {
    try {
        const { content, room } = req.body;
        const userId = req.user._id; // ดึง userId จาก token ที่ส่งมา

        if (!content || !room) {
            return next(new createError('Content and room are required', 400));
        }

        const newMessage = await Message.create({
            userId,
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
        next(error);
    }
};


exports.getMessagesByRoom = async (req, res, next) => {
    try {
        const { room } = req.params;

        const messages = await Message.find({ room })
            .populate('userId', 'name email') // ดึงข้อมูลของผู้ส่ง
            .sort({ timestamp: -1 }); // เรียงตามเวลาใหม่ที่สุด

        res.status(200).json({
            status: 'success',
            results: messages.length,
            data: {
                messages,
            },
        });
    } catch (error) {
        next(error);
    }
};
