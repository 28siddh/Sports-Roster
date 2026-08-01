const allPlayers = require('../models/player.js');

const getPlayers = async (req, res, next) => {
    try {
        const players = await allPlayers.find({ user: req.user.id });
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
};

const getPlayerbyId = async (req, res, next) => {
    try {
        const player = await allPlayers.findOne({ _id: req.params.id, user: req.user.id });
        if (!player) {
            const error = new Error('Item not found or unauthorized.');
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

        if (!fullName || !contactNumber || !role || isAvailable === undefined || !battingStyle || !bowlingStyle) {
            const error = new Error('Every field is required.')
            error.statusCode = 400;
            return next(error);
        }

        const userId = req.user.id;
        const playerData = { ...req.body, user: userId };

        const newPlayer = await allPlayers.create(playerData);
        res.status(201).json(newPlayer);
    } catch (error) {
        next(error);
    }
};

const updatePlayer = async (req, res, next) => {
    try {
        const updated = await allPlayers.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            const error = new Error('Player not Found or unauthorized.');
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
        const deleted = await allPlayers.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!deleted) {
            const error = new Error('Player not found or unauthorized.')
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ message: 'Player deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPlayers, getPlayerbyId, createPlayer, updatePlayer, deletePlayer };