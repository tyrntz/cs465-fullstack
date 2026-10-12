
const Trip = require('../models/travlr');

// GET: /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({
            code: req.params.tripCode
        }).exec();

        if (trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// POST: /api/trips
const tripsAddTrip = async (req, res) => {
    try {
        const {
            code, name, length, start,
            resort, perPerson, image, description
        } = req.body;

        const existingTrip = await Trip.findOne({ code });

        if (existingTrip) {
            return res.status(409).json({
                message: 'A trip with this code already exists'
            });
        }

        const newTrip = await Trip.create({
            code, name, length, start,
            resort, perPerson, image, description
        });

        return res.status(201).json(newTrip);
    } catch (err) {
        if (err.name === 'ValidationError' ||
            err.name === 'CastError') {
            return res.status(400).json({
                message: err.message
            });
        }

        return res.status(500).json({ message: err.message });
    }
};

// PUT: /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                $set: {
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        if (err.name === 'ValidationError' ||
            err.name === 'CastError') {
            return res.status(400).json({
                message: err.message
            });
        }

        return res.status(500).json({ message: err.message });
    }
};

// DELETE: /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!deletedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json({
            message: 'Trip deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
