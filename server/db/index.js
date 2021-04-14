const { Sequelize } = require('sequelize');

const username = process.env.SQL_USER;
const host = process.env.SQL_HOST;
const database = process.env.SQL_DATABASE;
const password = process.env.SQL_PASS;
const port = process.env.SQL_PORT;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'mysql',
        port,
        logging: false
    }
);

const ProductModel = require('./models/Product');

const Beer = ProductModel(sequelize, Sequelize);

const models = {
  Product
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;
