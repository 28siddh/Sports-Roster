require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes.js');
const playerRoutes = require('./routes/playerRoutes.js');

connectDB();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/players', playerRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});