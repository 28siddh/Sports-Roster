const express = require('express')
const router = express.Router();
const { getPlayers, getPlayerbyId, createPlayer, updatePlayer, deletePlayer } = require('../controllers/playerController.js');
const protect = require('../middleware/authMiddleware.js');

router.get('/', protect, getPlayers);
router.get('/:id', protect, getPlayerbyId);
router.post('/', protect, createPlayer);
router.put('/:id', protect, updatePlayer);
router.delete('/:id', protect, deletePlayer);

module.exports = router;