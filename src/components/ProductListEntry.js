import React from 'react'
import { Link } from 'react-router-dom';

const ProductListEntry = ({ product }) => {
  return (
    <div className="product-card">
        <img src={product.image} alt="product image" />
        <h1>{`${product.manufacturer} ${product.model}`}</h1>
        <p className="price">${product.price}</p>
        <Link to={`/product/${product.id}`}><button className="card-button">View More</button></Link>
    </div>
  )
}

export default ProductListEntry
