import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {

  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(product.likes)
  const { id } = product

  const handleLikeClick = () => {
    //if not liked, hit increment API, set liked to true
    if (!liked) {
      setLiked(true)
      setCurrentLikes(product.likes++)
      axios.patch(`/api/products/likes/add/${id}`)
        .catch(err => console.warn(err))
    } else {
      setLiked(false)
      setCurrentLikes(product.likes--)
      axios.patch(`/api/products/likes/remove/${id}`)
        .catch(err => console.warn(err))

    }
  }
  
  return (
    <div className="card">
      <img src={product.image} />
      <h1>{`${product.manufacturer} ${product.model}`}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <p>Likes: {product.likes}</p>
      <button onClick={handleLikeClick}>{liked ? "Unlike" : "Like" }</button>
      <Link to="/">Return to All Products</Link>
    </div>
  )
}

export default SingleProduct
