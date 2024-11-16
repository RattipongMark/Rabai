const express = require('express');
const commentController = require('../../controllers/discussBoard/commentController');

const router = express.Router();

router.get('/', commentController.getAllComments);

router.post('/create', commentController.createComment);

router.delete('/:CommentId', commentController.deleteComment);

module.exports = router;