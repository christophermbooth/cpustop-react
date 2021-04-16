const { Router } = require('express');
const { Product } = require('../db/db');

const productRoute = Router();

// retrieve all items
productRoute.get('/items', (req, res) => {
  Product.findAll()
    .then(products => {
      res.status(200).send(products)
    })
    .catch(err => {
      console.warn(err)
      res.sendStatus(500)
    })
})

//retrieve a single item
productRoute.get('/item/:item', (req, res) => {
  const { item } = req.params;
  Product.findOne({
    where: { id: item}
  })
    .then(item => {
      item ? res.status(200).send(item) : res.sendStatus(404)
    })
    .catch(err => {
      console.warn(err)
      res.sendStatus(500)
    })
})

//The following could be combined into one route with a little logic

//increment "likes"
productRoute.patch('/likes/add/:item', (req, res) => {
  const { item } = req.params;
  Product.increment('likes', { where : { id: item}})
    .then(() => res.sendStatus(204))
    .catch(err => {
      console.warn(err)
      res.sendStatus(500)
    })
})
//decrement "likes"
productRoute.patch('/likes/remove/:item', (req, res) => {
  const { item } = req.params;
  Product.decrement('likes', { where : { id: item}})
    .then(() => res.sendStatus(204))
    .catch(err => {
      console.warn(err)
      res.sendStatus(500)
    })
})

module.exports = {
  productRoute
}
