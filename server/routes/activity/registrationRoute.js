const express = require('express');
const registrationController = require('../../controllers/activity/registrationController');

const router = express.Router();

router.get('/', registrationController.getAllRegistrations);

router.post('/create', registrationController.createRegistration);

router.delete('/delete', registrationController.deleteRegistration);

module.exports = router;