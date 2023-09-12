import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const Product = ({ products }) => {
  console.log(products)
  const options = {
    size: window.innerWidth < 600 ? 20 : 30,
    value: products.ratings,
    isHalf: true,
    // count:15,
    activeColor: "rgba(239,67,67,1)"
  }

  return (

    <Link className='product-container' to={`/product/${products._id}`}>
      <div>
        <img src={products.images[0].url} alt="" />
      </div>

      <div>
        <h1>
          {products.name}
        </h1>
      </div>

      <div className='stars'>
        <ReactStars {...options} />
        <span className='starts-span'>({products.numOfReview} reviews)</span>
      </div>

      <div className='price'>
        ₹ {products.price}
      </div>
    </Link>
  )
}

export default Product