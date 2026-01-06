const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const db = require('./models');

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/products', require('./routes/products.routes'));

const PORT = 7777;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL conectado');
    return db.sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error DB:', err);
  });
