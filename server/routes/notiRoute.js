const express = require('express');
const router = express.Router();
const notiController = require('../controllers/notiController');

router.get('/discussionboard/:userId', notiController.getNotiBoard);

router.get('/activity/:OwnerActId', notiController.getNotiAct);

router.delete('/discussionboard/:userId', notiController.delNotiBoard);

router.delete('/activity/:userId', notiController.delNotiAct);

module.exports = router;