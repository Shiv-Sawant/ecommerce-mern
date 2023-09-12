import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail } from '../featrues/productSlice'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import Carousel from 'react-material-ui-carousel'
import ReviewCard from './ReviewCard'
import Loader from './Loader'

const ProductDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const { productDetails, loading } = useSelector((state) => {
    return state.app
  })

  console.log(productDetails, "loader")
  console.log(loading, "loader")

  useEffect(() => {
    dispatch(productDetail(params.id))
  }, [dispatch])

  return (
    <>
      {
        loading ?
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
                    productDetails?.data?.product?.images &&
                    productDetails?.data?.product?.images.map((item, i) => {
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
                    Product # {productDetails?.data?.product?._id}
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
                      <button className='input-button'>-</button>
                      <input value="1" disabled={true} type="number" />
                      <button className='input-button second'>+</button>
                      <button>
                        Add to Cart
                      </button>
                    </div>
                    <br />
                  </div>

                  <div>
                    <h5>
                      Status: <span style={{ color: productDetails?.data?.product.Stock > 0 ? "green" : "red" }}>
                        {
                          productDetails?.data?.product.Stock > 0 ?
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