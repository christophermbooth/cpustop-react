const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    manufacturer: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    cores: {
      type: DataTypes.INTEGER
    },
    threads: {
      type: DataTypes.INTEGER
    },
    clock: {
      type: DataTypes.DECIMAL
    },
    likes: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  },
    {
      freezeTableName: true

    });
  return Product;
}
