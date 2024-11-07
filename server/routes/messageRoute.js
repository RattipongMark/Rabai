const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/', messageController.createMessage); 
router.get('/:room', messageController.getMessagesByRoom); 

module.exports = router;