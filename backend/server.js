require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');

connectDB();

const app = express();

app.use(express.json());
app.use(requestLogger);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});