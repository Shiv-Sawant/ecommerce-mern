import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartItems, getProducts, productDetail } from '../featrues/productSlice'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Carousel from 'react-material-ui-carousel'
import ReviewCard from './ReviewCard'
import Loader from './Loader'
import { useAlert } from 'react-alert'
import axios from 'axios'

const ProductDetail = () => {
  const alerts = useAlert()
  const params = useParams()
  const dispatch = useDispatch()
  const [item, setItem] = useState(1)
  const [isItem, setIsItem] = useState(false)

  const productDetails = useSelector((state) => {
    return state.app
  })

  console.log(productDetails, "productDetails")


  const handleIncrease = () => {
    if (Number(productDetails?.productDetails?.data?.product?.Stock) !== item) {
      setItem(item + 1)
    }
  }

  const handleDecrease = () => {
    if (item !== 0) {
      setItem(item - 1)
    }
  }

  const handleCart = async () => {
    alerts.success('Added Item Into Cart')

    dispatch(cartItems({
      product: params.id,
      item
    }))

  }


  useEffect(() => {
    dispatch(productDetail(params.id))
  }, [dispatch])

  return (
    <>
      {
        productDetails?.loading ?
          <Loader />
          :
          <>
            <div className='product-detail-container'>
              <div className='product-detail-box'>
                {/* <div className='product-image-box'> */}
                <Carousel
                  // next={() => { }}
                  className='product-image-box'
                // prev={() => { }}
                >
                  {
                    productDetails?.productDetails?.data?.product?.images &&
                    productDetails?.productDetails?.data?.product?.images.map((item, i) => {
                      // console.log(item,"itemitem")
                      // console.log(i,"itemitem")
                      return (
                        <div className='inner-img-div'>
                          <img src={item.url} key={item.url} alt={`${i} Slide`} />
                        </div>
                      )

                    })
                    // items.map( (item, i) => <Item key={i} item={item} /> )
                  }
                </Carousel>
                {/* </div> */}

                <div className='product-details'>
                  <div>
                    <h1>subscribe</h1>
                    Product # {productDetails?.productDetails?.data?.product?._id}
                  </div>

                  <div className='product-detail-stars'>
                    <ReactStars
                    />
                    <span>
                      ({productDetails?.data?.product?.numOfReview} Reviews)
                    </span>
                  </div>

                  <div>
                    <h2>
                      ₹10000
                    </h2>
                    <br />
                    <div>
                      <button className='input-button' onClick={handleDecrease}>-</button>
                      <input value={item} disabled={true} type="number" readOnly />
                      <button className='input-button second' onClick={handleIncrease}>+</button>
                      <button onClick={handleCart}>
                        Add to Cart
                      </button>
                    </div>
                    <br />
                  </div>

                  <div>
                    <h5>
                      Status: <span style={{ color: productDetails?.productDetails?.data?.product.Stock > 0 ? "green" : "red" }}>
                        {
                          productDetails?.productDetails?.data?.product.Stock > 0 ?
                            "InStock"
                            :
                            "OutOfStock"
                        }
                      </span>
                    </h5>
                  </div>

                  <div>
                    <h3>
                      Description:
                    </h3>
                    this is a sample product
                    <br />

                    <div>
                      <button style={{ marginTop: "20px" }}>
                        Submit Review
                      </button>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div className='review-container'>
              <div>
                <h1>
                  REVIEWS
                </h1>
              </div>

              <div className='reivew-card'>
                {
                  productDetails?.data?.product.reviews[0]
                    ?
                    (
                      productDetails?.data?.product.reviews.map((review) => {
                        return (
                          < ReviewCard review={review} />
                        )
                      })
                    )
                    :
                    (
                      <div className='no-reivew'>
                        NO REVIEWS YET
                      </div>
                    )
                }
              </div>

            </div >
          </>
      }
    </>
  )
}

export default ProductDetail