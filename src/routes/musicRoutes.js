const express = require('express');
const { searchTracks, addFavorite, getFavorites } = require('../controllers/musicController');

const router = express.Router();

router.get('/search_tracks', searchTracks);
router.post('/favoritos', addFavorite);
router.get('/favoritos', getFavorites);

module.exports = router;