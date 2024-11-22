const Actregist = require('../../models/activity/registrationModel'); 
const Activity = require('../../models/activity/activityModel');
const NotiAct = require('../../models/activity/notiActModel');

exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Actregist.find().populate('userId').populate('activityId');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching registrations' });
    }
};

exports.getIdRegistrations = async (req, res) => {
    try {
        const { userId } = req.params;
        const registrations = await Actregist.find({ userId })
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching registrations' });
    }
};
exports.getRegistrationsByActivityId = async (req, res) => {
    try {
        const { activityId } = req.params; // รับ boardId จากพารามิเตอร์

        // ค้นหาความคิดเห็นที่ตรงกับ boardId ที่ระบุ
        const registrations = await Actregist.find({ activityId }).populate('userId') // populate userId เพื่อดึงข้อมูล username ของผู้ใช้

        if (registrations.length === 0) {
            return res.status(404).json({ message: 'No registration found for this board' });
        }

        res.status(200).json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching registration by activityId' });
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

        // ค้นหาข้อมูลของ Board และเจ้าของ Board
        const activity = await Activity.findById(activityId);
        const activityOwnerId = activity.userId;

        if (activityOwnerId.toString() !== userId) {
            // สร้าง Notification ใหม่
            const newNotification = await NotiAct.create({
                userId: activityOwnerId,
                activityId,
                actregistId: savedRegistration._id,
            });

            // ค้นหา Notification พร้อม Populate
            const populatedNotification = await NotiAct.findById(newNotification._id)
                .populate('activityId')
                .populate({
                    path: 'actregistId',
                    populate: { path: 'userId', select: 'name profile' },
                });

            // ส่ง Notification ผ่าน Socket.io
            io.to(`ActNotifications_${activityOwnerId}`).emit('ActNotification', populatedNotification);
        }

        
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
