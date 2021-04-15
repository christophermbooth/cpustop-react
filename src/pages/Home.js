import React, { useState, useEffect } from 'react'
// import ProductList from '../components/ProductList';
import { ProductList } from '../components';
import axios from 'axios';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/items')
      .then(res => {
        const { data } = res;
        setProducts(data)
        setIsLoading(false)
      })
  }, [])


  return (
    <div>
      {isLoading && <p>Loading products...please wait</p>}
      {!isLoading && <ProductList products={products} />}
    </div>
  )
}

export default Home
