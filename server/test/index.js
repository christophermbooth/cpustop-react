require('dotenv').config();
const mysql = require('mysql2/promise');
const db = require('../db/db');
const data = require('../test/data');

const user = process.env.SQL_USER;
const host = process.env.SQL_HOST;
const database = process.env.SQL_DATABASE;
const password = process.env.SQL_PASS;
const port = process.env.SQL_PORT;

//Connects to mysql server to check for existence of database; creates and populates if not found
mysql.createConnection({ host, user, port, password })
  .then(conn => {
    conn.query(`SHOW DATABASES LIKE '${database}';`)
      .then(res => {
        if (res[0].length) { 
          console.log('Database already exists. Have you arleady run this script?')
          process.exit();
        }
        else { 
          conn.end();
          initialize();
        }
      })
      .catch(err => console.warn(err))
  })
  .catch(err => console.warn(err))


//Uses Sequelize to import example data into table
function importData() {
  const { Product } = db;
  console.info('Adding data items to database. Please wait...')
  data.forEach(item => {
    Product.findOrCreate({
      where: {
        manufacturer: item.manufacturer,
        model: item.model,
        description: item.description,
        cores: item.cores,
        threads: item.threads,
        clock: item.clock,
        likes: item.likes,
        price: item.price,
        image: item.image
      }
    })
    .then(numberEffected => {
      if (numberEffected) {
        return console.info('Item added to table');
      } else {
        return console.warn('Item not added to table');
      }
    })
    .catch(err => console.warn(err))
  })
}
//Handles creation of database and table. Imports example data
async function initialize() {
  await mysql.createConnection({ host, user, port, password })
  .then((conn) => {
    console.info('Connetion to database succesfull')
    conn.query(`CREATE DATABASE \`${database}\`;`)
      .then( () => {
        conn.end();
        db.sequelize.sync()
          .then(() => {
            importData();
          })
          .catch((err) => {
            console.warn(err)
          })
      })
      .catch(err => {
        console.warn('Databases already exists', err)
      })
  })
  .catch(err => console.warn('Cound not connect to database', err))
}
