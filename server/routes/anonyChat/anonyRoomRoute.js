// routes/anonyRoomRoutes.js
const express = require('express');
const router = express.Router();
const anonyRoomController = require('../../controllers/anonyChat/anonyRoomController');

router.post('/create', anonyRoomController.createAnonyRoom);

router.get('/:roomId', anonyRoomController.getAnonyRoomByRoomId);

router.get('/count/:roomId', anonyRoomController.getUserCountInRoom);

router.get('/', anonyRoomController.getAllAnonyRooms);

router.delete('/:RoomId', anonyRoomController.deleteAnonyRoomByRoomId);

module.exports = router;