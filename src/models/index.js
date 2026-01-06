const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Product = require('./product.model')(sequelize, DataTypes);

db.Category = require('./category.model')(sequelize, DataTypes);

// Relaciones
db.Category.hasMany(db.Product, {
  foreignKey: 'categoryId'
});

db.Product.belongsTo(db.Category, {
  foreignKey: 'categoryId'
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;
