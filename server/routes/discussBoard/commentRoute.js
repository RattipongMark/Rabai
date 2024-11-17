const express = require('express');
const commentController = require('../../controllers/discussBoard/commentController');

const router = express.Router();

router.get('/', commentController.getAllComments);

router.get('/:boardId', commentController.getCommentByBoardId);

router.post('/', commentController.createComment);

router.delete('/delete', commentController.deleteComment);

module.exports = router;