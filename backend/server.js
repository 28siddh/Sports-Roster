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

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/players', playerRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});