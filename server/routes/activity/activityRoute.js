const express = require('express');
const activityController = require('../../controllers/activity/activityController');

const router = express.Router();

router.get('/', activityController.getAllActivities);

router.post('/create', activityController.createActivity);

router.delete('/:BoardId', activityController.deleteActivity);

module.exports = router;