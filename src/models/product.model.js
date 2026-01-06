module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
    categoryId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'Products',     // <-- ajustá si tu tabla se llama distinto
    timestamps: true           // <-- ya que agregaste createdAt/updatedAt
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };

  return Product;
};
