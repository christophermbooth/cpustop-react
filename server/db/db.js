const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
const productModel = require('./models/Product');

//configs
const user = process.env.SQL_USER;
const host = process.env.SQL_HOST;
const database = process.env.SQL_DATABASE;
const password = process.env.SQL_PASS;
const port = process.env.SQL_PORT;

const db = {};

//Connects to mysql server to check for existence of database; creates if not found
mysql.createConnection({ host, user, port, password })
  .then(conn => {
    conn.query(`SHOW DATABASES LIKE '${database}';`)
      .then(res => {
        if (res[0].length) { return; }
        else { 
          initialize()
          conn.end();
        }
      })
      .catch(err => console.warn(err))
  })
  .catch(err => console.warn(err))

//initalize sequelize connection for models to be used in routes
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: false
});

db.Product = productModel(sequelize, Sequelize);
db.sequelize = sequelize;

module.exports = db;

//creates database and table if needed
async function initialize() {
  await mysql.createConnection({ host, user, port, password })
  .then((conn) => {
    console.info('Connetion to database succesfull')
    conn.query(`CREATE DATABASE \`${database}\`;`)
      .then( () => {
        console.info('Database Created')
        conn.end();
        //use sequelize to create table from model
        const sequelize = new Sequelize(database, user, password, {
          host,
          dialect: 'mysql',
          port,
          logging: false
        });

        productModel(sequelize, Sequelize);
        // sync all models with database
        sequelize.sync()
          .then(() => console.info(`Model Sync Succesfull!`))
          .catch(err => console.warn(`Error Syncing Models`, err))
      })
      .catch(err => {
        console.warn('Databases already exists', err)
      })
  })
  .catch(err => console.warn('Cound not connect to database', err))
}
