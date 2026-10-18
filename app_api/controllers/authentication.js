const User = require('../models/user');
const passport = require('passport');

// Register a new user
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields required'
        });
    }

    try {
        const user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save();

        const token = user.generateJWT();

        return res.status(200).json({
            token: token
        });
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        return res.status(500).json({
            message: 'Error registering user'
        });
    }
};

// Login existing user
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields required'
        });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Authentication error'
            });
        }

        if (user) {
            const token = user.generateJWT();

            return res.status(200).json({
                token: token
            });
        }

        return res.status(401).json(
            info || { message: 'Invalid credentials' }
        );
    })(req, res);
};

module.exports = {
    register,
    login
};