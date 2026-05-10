const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');

router.get('/', shelterController.getAllShelters);
router.get('/nearest', shelterController.getNearestShelter);

module.exports = router;
