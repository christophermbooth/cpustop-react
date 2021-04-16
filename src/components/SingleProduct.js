import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {

  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(product.likes)
  const { id } = product

  const handleLikeClick = () => {
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
    <>
      <Link to="/"><button className="return-button">Return to All Products</button></Link>
    <div className="sp">
      <div className="left-column">
        <img src={product.image} />
      </div>
      <div className="right-column">
        <div className="product-description">
          <span>Processor</span>
          <h1>{`${product.manufacturer} ${product.model}`}</h1>
          <p className="price">Price: ${product.price}</p>
          <p>Likes: {product.likes}</p>
          <button onClick={handleLikeClick}>{liked ? "Unlike" : "Like" }</button>
          <h2>Details:</h2>
          <p>Cores: {product.cores}</p>
          <p>Threads: {product.threads}</p>
          <p>Base Clock Speed: {product.clock}</p>
          <div className="product-description">
            <h2>Description:</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleProduct
