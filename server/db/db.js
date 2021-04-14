const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const user = process.env.SQL_USER;
    const host = process.env.SQL_HOST;
    const database = process.env.SQL_DATABASE;
    const password = process.env.SQL_PASS;
    const port = process.env.SQL_PORT;

    const connection = await mysql.createConnection({ host, user, port, password })
      .then((conn) => {
        console.info('Connetion to database succesfull')
        conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
          .then(() => console.info('Database Created'))
          .catch(err => console.warn('Could not create database', err))
      })
      .catch(err => console.warn('Cound not connect to database', err))

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql',
      port,
      logging: true
     });

    // init models and add them to the exported db object
    db.Product = require('./models/Product')(sequelize, DataTypes);

    // sync all models with database
    await sequelize.sync()
      .then(() => console.info(`Model Sync Succesfull!`))
      .catch(err => console.warn(`Error Syncing Models`, err))
}
