const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['batsman', 'bowler', 'all-rounder', 'wicketkeeper']
    },
    availabilityStatus: {
        type: Boolean,
        default: true,
    },
    battingStyle: {
        type: String,
        enum: ['right-handed', 'left-handed'],
    },
    bowlingStyle: {
        type: String,
        enum: ['right-handed', 'left-handed', 'pure-batsman'],
    },
});

module.exports = mongoose.model('Player', playerSchema);