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
        enum: ['batsman', 'bowler', 'all-rounder', 'wicketkeeper'],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true,
    },
    battingStyle: {
        type: String,
        enum: ['right-handed', 'left-handed'],
        required: true,
    },
    bowlingStyle: {
        type: String,
        enum: ['right-handed', 'left-handed', 'pure-batsman'],
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Player', playerSchema);