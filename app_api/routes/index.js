const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Trips
router
    .route('/trips')
    .get(tripsController.tripsList);

// Specific trip by trip code
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;