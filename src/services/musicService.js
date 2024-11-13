const axios = require('axios');

const getMusicFromItunes = async (bandName) => {
  const response = await axios.get(`https://itunes.apple.com/search`, {
    params: { term: bandName, entity: 'musicTrack', limit: 50 },
  });

  const songs = response.data.results
    .filter((song) => song.artistName.toLowerCase() === bandName.toLowerCase())
    .slice(0, 25);

  const albums = Array.from(new Set(songs.map((song) => song.collectionName)));

  return {
    total_albumes: albums.length,
    total_canciones: songs.length,
    albumes: albums,
    canciones: songs.map((song) => ({
      cancion_id: song.trackId,
      nombre_album: song.collectionName,
      nombre_tema: song.trackName,
      preview_url: song.previewUrl,
      fecha_lanzamiento: song.releaseDate,
      precio: {
        valor: song.trackPrice || 'N/A',
        moneda: song.currency || 'N/A',
      },
    })),
  };
};

module.exports = {
  getMusicFromItunes,
};