import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartItems, clearErrors, createProductReview, getProductReview, productDetail } from '../featrues/productSlice'
import { useParams,useNavigate } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import ReviewCard from './ReviewCard'
import Loader from './Loader'
import { useAlert } from 'react-alert'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetail = () => {
  const alerts = useAlert()
  const params = useParams()
  const dispatch = useDispatch()
  const [item, setItem] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [Reviews, setReview] = useState([])
  const [Ratings, setRating] = useState([])
const navigate = useNavigate()
  const productDetails = useSelector((state) => {
    return state.app
  })



  console.log(productDetails, "productDetailsproductDetails")

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

  const handleSubmitOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleReviewSubmit = () => {
    if(productDetails.isAuthenticate) {
      dispatch(createProductReview({
        rating: Ratings,
        comment: Reviews,
        productId: params.id
      }))
    } else {
      navigate('/login')
    }
  
    setIsOpen(!isOpen)
  }

  const options = {
    size: "large",
    value: productDetails?.productDetails?.data?.product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {

    if (productDetails?.error != null) {
      alerts.error(productDetails?.error?.message)
      // console.log(productDetails?.error?.message,"productDetails?.error?.message")
      dispatch(clearErrors())
    }

    dispatch(productDetail(params.id))


    // dispatch(getProductReview(params.id))

    if (productDetails?.newReview?.data?.success) {
      alerts.success('Review Send Successfully  ')
    }

  }, [dispatch, productDetails?.error, alerts, productDetails?.newReview?.data?.success, params.id])

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
                      // // console.log(item,"itemitem")
                      // // console.log(i,"itemitem")
                      return (
                        <div className='inner-img-div'>
                          <img src={item.url} key={item.url} alt={`${i} Slide`} />
                        </div>
                      )

                    })
                  }
                </Carousel>
                {/* </div> */}

                <div className='product-details'>
                  <div>
                    <h1>{productDetails?.productDetails?.data?.product?.name}</h1>
                    Product # {productDetails?.productDetails?.data?.product?._id}
                  </div>

                  <div className='product-detail-stars'>
                    <Rating {...options} />
                    <span>
                      ({productDetails?.productDetails?.data?.product?.numOfReview} Reviews)
                    </span>
                  </div>

                  <div>
                    <h2>
                      ₹{productDetails?.productDetails?.data?.product?.price}
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
                      <button onClick={handleSubmitOpen} style={{ marginTop: "20px" }}>
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

              {
                isOpen && (
                  <>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={isOpen}
                      onClose={handleSubmitOpen}
                    >
                      <DialogTitle>Submit Review</DialogTitle>
                      <DialogContent>
                        <Rating
                          size="large"
                          value={Ratings}
                          onChange={(e) => setRating(e.target.value)}
                        />

                        <textarea
                          className="submitDialogTextArea"
                          cols="30"
                          rows="5"
                          value={Reviews}
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSubmitOpen} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={handleReviewSubmit} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )
              }

              <div className='reivew-card'>
                {
                  productDetails.productDetails?.data?.product.reviews[0]
                    ?
                    (
                      productDetails.productDetails?.data?.product.reviews.map((review) => {
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