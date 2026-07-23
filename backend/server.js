require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes.js');

connectDB();

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});