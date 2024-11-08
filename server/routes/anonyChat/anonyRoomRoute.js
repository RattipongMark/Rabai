// routes/anonyRoomRoutes.js
const express = require('express');
const router = express.Router();
const anonyRoomController = require('../../controllers/anonyChat/anonyRoomController');

// สร้างห้องใหม่
router.post('/create', anonyRoomController.createAnonyRoom);

// ดึงข้อมูลห้องตามชื่อห้อง
router.get('/:roomName', anonyRoomController.getAnonyRoomByRoomName);

// ลบห้องตามชื่อห้อง
router.delete('/:roomName', anonyRoomController.deleteAnonyRoomByRoomName);

module.exports = router;