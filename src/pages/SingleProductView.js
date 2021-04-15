import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleProduct } from '../components';
import axios from 'axios';

const SingleProductView = () => {
  const { itemId } = useParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/api/products/item/${itemId}`)
      .then((res) => {
        const { data } = res;
        setProduct(data);
        setIsLoading(false);
      })
      .catch(err => console.warn(err))

  }, [itemId])

  return (
    <>
    {isLoading && <p>Loading product...please wait</p>}
    { !isLoading && <SingleProduct product={product} />}
    </>
  )
}

export default SingleProductView
