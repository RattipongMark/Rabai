const express = require('express');
const router = express.Router();
const profileEditController = require('../controllers/profileEditController');


// Route to get profile by ID
router.get('/', profileEditController.getProfilebyID);

// Route to update profile by ID (use PUT or PATCH for updating)
router.put('/updateprofile/', profileEditController.updateProfile);

module.exports = router;
