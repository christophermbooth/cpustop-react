require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db/db');
const { productRoute } = require('./routes/product');

const app = express();
const port = process.env.PORT || 3000;

const public = path.join(__dirname, "../public");
const html = path.join(public, "index.html");

//middleware
app.use(express.static(public));
app.use(cors());

//route
app.use('/api/products', productRoute);


db.sequelize.authenticate()
  .then(() => console.info('Connected to database'))
  .catch(err => console.warn('Error connecting to Database', err))

app.get('*', (req, res) => {
  res.sendFile(html)
})

app.listen(port, () => {
  console.info(`Express Server Running on Port: ${port}`);
})
