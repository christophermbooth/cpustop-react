require('dotenv').config();
const {Product} = require('../db/db');
const data = require('../test/data');

const importData = () => {
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
        console.log(numberEffected);
        return console.info('Item added to table');
      } else {
        return console.warn('Item not added to table');
      }
    })
    .catch(err => console.warn(err))
  })
  return;
}

importData();
