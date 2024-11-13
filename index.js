const express = require('express');
const musicRoutes = require('./src/routes/musicRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(express.json());

// Rutas
app.use('/api', musicRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
