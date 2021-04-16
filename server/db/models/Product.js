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
      type: DataTypes.DECIMAL(10,1)
    },
    likes: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(10,2)
    },
    image: {
      type: DataTypes.TEXT
    }
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['manufacturer', 'model']
        }
      ]
    },
    {
      freezeTableName: true
    });

  return Product;
};
