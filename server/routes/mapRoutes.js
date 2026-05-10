const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

router.get('/admin-boundaries', mapController.getAdminBoundaries);
router.get('/settlements', mapController.getSettlements);

module.exports = router;
