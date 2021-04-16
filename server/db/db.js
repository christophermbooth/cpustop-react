const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const productModel = require('./models/Product');

//configs
const user = process.env.SQL_USER;
const host = process.env.SQL_HOST;
const database = process.env.SQL_DATABASE;
const password = process.env.SQL_PASS;
const port = process.env.SQL_PORT;

const db = {};

//initalize sequelize connection for models to be used in routes
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: false
});

//Sync and assign models
db.Product = productModel(sequelize, Sequelize);
db.sequelize = sequelize;

module.exports = db;
