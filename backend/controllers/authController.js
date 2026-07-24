const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error('Username and password are required.')
            error.statusCode = 400;
            return next(error);
        }

        const existing = await User.findOne({ username });
        if (existing) {
            const error = new Error('Username already exists.')
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.create({ username, password });
        res.status(201).json({ id: user._id, username: user.username });
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            const error = new Error('Invalid User');
            error.statusCode = 401;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('invalid User');
            error.statusCode = 401;
            return next(error);
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = { registerUser, loginUser };