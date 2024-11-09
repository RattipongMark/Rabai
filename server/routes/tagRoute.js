const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Route สำหรับสร้าง Tag
router.post('/tags', tagController.createTag);

// Route สำหรับดึงข้อมูลทั้งหมดของ Tags
router.get('/tags', tagController.getTags);

router.get('/tags/:id', tagController.getTagById);

module.exports = router;
