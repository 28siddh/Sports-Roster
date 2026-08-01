const allPlayers = require('../models/player.js');

const getPlayers = async (req, res, next) => {
    try {
        const players = await allPlayers.find();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
};

const getPlayerbyId = async (req, res, next) => {
    try {
        const player = await allPlayers.findById(req.params.id);
        if (!player) {
            const error = new Error('Item not found.');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
};

const createPlayer = async (req, res, next) => {
    try {
        const { fullName, contactNumber, role, isAvailable, battingStyle, bowlingStyle } = req.body;
        if (!fullName || !contactNumber || !role || !isAvailable === undefined || !battingStyle || !bowlingStyle) {
            const error = new Error('Every field is required.')
            error.statusCode = 400;
            return next(error);
        }
        const newPlayer = await allPlayers.create(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        next(error);
    }
};

const updatePlayer = async (req, res, next) => {
    try {
        const updated = await allPlayers.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) {
            const error = new Error('Player not Found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

const deletePlayer = async (req, res, next) => {
    try {
        const deleted = await allPlayers.findByIdAndDelete(req.params.id);
        if (!deleted) {
            const error = new Error('Player not found.')
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ message: 'Player deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPlayers, getPlayerbyId, createPlayer, updatePlayer, deletePlayer };