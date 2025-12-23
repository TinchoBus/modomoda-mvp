// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./models'); // Importar modelos antes de levantar el server

// Puerto desde .env, si no existe usa 7777
const PORT = process.env.PORT || 7777;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de productos
const productsRoutes = require('./routes/products.routes');
app.use('/api/products', productsRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('API ModoModa OK');
});

// Conectar a MySQL y levantar servidor solo si la conexión es exitosa
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Conexión con MySQL exitosa');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar MySQL:', err);
    process.exit(1); // Salir del proceso si la DB falla
  });
