import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";

const Product = ({ products }) => {
  const options = {
    size: "large",
    value: products?.ratings,
    readOnly: true,
    precision: 0.5,
  };

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
        <Rating {...options} />
        <span className='starts-span'>({products.numOfReview} reviews)</span>
      </div>

      <div className='price'>
        ₹ {products.price}
      </div>
    </Link>
  )
}

export default Product