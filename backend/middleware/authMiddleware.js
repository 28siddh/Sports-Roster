const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        const error = new Error('No session token provided.')
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        error.statusCode = 401;
        error.message = 'Invalid or expired session token.'
        next(error);
    }
};

module.exports = protect;