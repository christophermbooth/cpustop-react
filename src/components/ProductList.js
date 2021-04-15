import React from 'react'
import ProductListEntry from './ProductListEntry';

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map( item => <ProductListEntry product={item} /> )}
    </div>
  )
}

export default ProductList
