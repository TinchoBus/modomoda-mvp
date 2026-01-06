const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products.routes'));

app.use('/api/categories', require('./routes/categories.routes'));


const PORT = 7777;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL conectado, Buenos dias jefe!');
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error DB:', err);
  });
