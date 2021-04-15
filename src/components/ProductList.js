import React from 'react'
import { ProductListEntry } from '../components';

const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      {products.map( item => <ProductListEntry product={item} /> )}
    </div>
  )
}

export default ProductList
