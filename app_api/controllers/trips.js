const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /api/trips
// Returns all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips) {
            return res.status(404).json({
                message: 'Trips not found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// GET: /api/trips/:tripCode
// Returns a single trip based on the trip code
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({
            code: req.params.tripCode
        }).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};