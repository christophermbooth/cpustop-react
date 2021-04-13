const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const public = path.join(__dirname, "../public");
const html = path.join(public, "index.html");

app.use(express.static(public));

app.get('/', (req, res) => {
  res.sendFile(html)
})

app.listen(port, () => {
  console.info(`Express Server Running on Port: ${port}`);
})
