require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

app.get('/boom', (req, res, next) => next(new Error('test')))

app.use(express.json());
app.use(requestLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});