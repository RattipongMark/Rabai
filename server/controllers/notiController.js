const NotiBoard = require('../models/discussBoard/notiBoardModel');
const NotiAct = require('../models/activity/notiActModel');

exports.getNotiBoard = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await NotiBoard.find({ userId })
            .populate('boardId')
            .populate({
                path: 'commentId', // ดึงข้อมูล Comment
                populate: { path: 'userId', select: 'name profile' } // ดึงข้อมูล User ของ Comment
            })
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotiAct = async (req, res) => {
    try {
        const { OwnerActId } = req.params;
        const notifications = await NotiAct.find({ OwnerActId })
            .populate('activityId')
            .populate({
                path: 'actregistId', // ดึงข้อมูล Activity Registration
                populate: { path: 'userId', select: 'name profile' } // ดึงข้อมูล User ของ Comment
            }
        )
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delNotiBoard = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await NotiBoard.deleteMany({ userId })
        
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delNotiAct = async (req, res) => {
    try {
        const { OwnerActId } = req.params;
        const notifications = await NotiAct.deleteMany({ OwnerActId })
        
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};