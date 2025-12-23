console.log('ENV:', process.env.DB_USER, process.env.DB_PASSWORD);


const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'modomoda',
  'root',
  'root', // 👈 tu password real
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Product = require('./product.model')(sequelize, DataTypes);

db.sequelize.sync()
  .then(() => console.log('📦 Tablas sincronizadas'))
  .catch(err => console.error(err));


module.exports = db;


