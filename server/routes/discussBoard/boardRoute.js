const express = require('express');
const boardController = require('../../controllers/discussBoard/boardController');

const router = express.Router();

router.post('/create', boardController.createBoard);

router.delete('/:BoardId', boardController.deleteBoard);

module.exports = router;