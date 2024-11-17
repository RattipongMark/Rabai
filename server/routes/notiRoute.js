const express = require('express');
const router = express.Router();
const notiController = require('../controllers/notiController');

router.get('/discussionboard/:userId', notiController.getNotiBoard);

router.delete('/discussionboard/:userId', notiController.delNotiBoard);

module.exports = router;