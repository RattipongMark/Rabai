const express = require('express');
const anonyController = require('../controllers/anonyUserController');

const router = express.Router();

// Route to create a new fake name
router.post('/setfake', anonyController.createAnony);

// Route to get the fake name by user ID
router.get('/:userId', anonyController.getAnony);

module.exports = router;
