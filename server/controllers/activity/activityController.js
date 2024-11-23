const Actregist = require('../../models/activity/registrationModel'); 
const Activity = require('../../models/activity/activityModel');

exports.getAllActivities = async (req, res) => {
    try {
        // ดึงข้อมูลกิจกรรมทั้งหมด
        const activities = await Activity.find()
          .populate({
            path: 'userId',
            select: 'name profile'  // ดึงเฉพาะฟิลด์ name และ profile
          })
          .populate('tagId');
    
        // ใช้ Promise.all เพื่อรอการนับจำนวนผู้เข้าร่วมแต่ละกิจกรรมแบบ asynchronous
        const activitiesWithCount = await Promise.all(activities.map(async (activity) => {
          // นับจำนวนผู้เข้าร่วมในแต่ละกิจกรรม
          const participantCount = await Actregist.countDocuments({ activityId: activity._id });
          
          // เพิ่มฟิลด์จำนวนผู้เข้าร่วมเข้าไปใน Object
          return {
            ...activity.toObject(),  // แปลง Mongoose Document เป็น Object
            participantCount,        // เพิ่มจำนวนผู้เข้าร่วม
          };
        }));
        res.status(200).json(activitiesWithCount);  // ส่งข้อมูลกลับไป
    } catch (error) {
        res.status(500).json({ error: 'Error fetching activities' });
    }
};


exports.createActivity = async (req, res) => {
    try {
        const { userId, title, detail, location, participant, start_time, end_time, deadline, tagId } = req.body;
        const newActivity = new Activity({
            userId,
            title,
            detail,
            location,
            participant,
            start_time,
            end_time,
            deadline,
            tagId,
        });
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ error: 'Error creating activity' });
    }
};


exports.deleteActivity = async (req, res) => {
    try {
        const {id} = req.body;
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting activity' });
    }
};