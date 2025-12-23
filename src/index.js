const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { init } = require('./db');

const productsRoutes = require('./routes/products.routes');

const app = express();
const PORT = 7777;

app.use(cors());
app.use(bodyParser.json());

// 🔗 Rutas API
app.use('/api/products', productsRoutes);

// 🗄️ DB
init();

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
