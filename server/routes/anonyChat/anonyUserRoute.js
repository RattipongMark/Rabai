const express = require('express');
const anonyUserController = require('../../controllers/anonyChat/anonyUserController');

const router = express.Router();

// Route to create a new fake name
router.post('/setfake', anonyUserController.createAnony);

// Route to get the fake name by user ID
router.get('/:userId', anonyUserController.getAnony);

module.exports = router;