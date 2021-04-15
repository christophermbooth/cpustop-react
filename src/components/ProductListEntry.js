import React from 'react'
import { Link } from 'react-router-dom';

const ProductListEntry = ({ product }) => {
  return (
    <div className="card">
        <img src={product.image} />
        <h1>{`${product.manufacturer} ${product.model}`}</h1>
        <p className="price">${product.price}</p>
        <Link to={`/product/${product.id}`}>View More</Link>
    </div>
  )
}

export default ProductListEntry
