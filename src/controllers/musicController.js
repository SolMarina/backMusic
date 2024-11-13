const { getMusicFromItunes } = require('../services/musicService');
const cache = require('../utils/cache');

const searchTracks = async (req, res) => {
  const { name: bandName } = req.query;
  if (!bandName) {
    return res.status(400).json({ message: 'El parámetro name es requerido' });
  }

  const cacheKey = `search_tracks_${bandName}`;
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const songsData = await getMusicFromItunes(bandName);
    cache.set(cacheKey, songsData);
    res.json(songsData);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar la API de iTunes' });
  }
};

let favorites = []

const addFavorite = (req, res) => {
    const { nombre_banda, cancion_id, usuario, ranking } = req.body;
  
    // Validación de los campos requeridos
    if (!nombre_banda || !cancion_id || !usuario || !ranking) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: nombre_banda, cancion_id, usuario, ranking' });
    }
  
    // Validar que cancion_id sea un número
    if (isNaN(cancion_id)) {
      return res.status(400).json({ message: 'El campo cancion_id debe ser un número' });
    }
  
    // Verificar si la canción ya está en favoritos para el mismo usuario
    const exists = favorites.some(fav => fav.cancion_id === cancion_id && fav.usuario === usuario);
    if (exists) {
      return res.status(400).json({ message: 'Esta canción ya está en tus favoritos' });
    }
  
    // Agregar la canción a la lista de favoritos
    const favorite = { nombre_banda, cancion_id, usuario, ranking };
    favorites.push(favorite);
  
    res.status(201).json({ message: 'Canción agregada a favoritos', favorite });
  };
  
  const getFavorites = (req, res) => {
    res.json(favorites); // Devuelve todos los favoritos almacenados
  };

module.exports = {
  searchTracks,
  addFavorite,
  getFavorites,
};