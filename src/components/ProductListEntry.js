import React from 'react'

const ProductListEntry = ({ product }) => {
  return (
    <div className="card">
        <img src={product.image} />
        <h1>{`${product.manufacturer} ${product.model}`}</h1>
        <p className="price">${product.price}</p>
    </div>
  )
}

export default ProductListEntry
