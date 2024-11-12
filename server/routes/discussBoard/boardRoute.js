const express = require('express');
const boardController = require('../../controllers/discussBoard/boardController');

const router = express.Router();

router.get('/', boardController.getAllBoards);

router.post('/create', boardController.createBoard);

router.delete('/:BoardId', boardController.deleteBoard);

module.exports = router;