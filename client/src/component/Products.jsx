import React, { useEffect, useState } from 'react'
import Product from './Product'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../featrues/productSlice'
import Pagination from "react-js-pagination";
import { Typography, Slider } from '@mui/material'

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => {
    return state.app
  })

  // console.log(products)

  const setCurrentPageNo = (e) => {
    // console.log(e, "currentpage")
    setCurrentPage(e)
  }

  // console.log(price)

  const pricehandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  // console.log(price, "priceprice")

  useEffect(() => {
    if (error != null) {
      dispatch(clearErrors())
    }
    dispatch(getProducts({ currentPage, price }))
  }, [dispatch, currentPage, price,error])

  return (
    <>
      {
        loading ?
          <>
            <Loader />
          </>
          :
          <div className='products-container'>
            <div className='products-container-head'>
              <h1>
                Products
              </h1>

              <br />

              <div className='price-filter'>
                <Typography>Price Fiiter</Typography>
                <Slider
                  value={price}
                  onChange={pricehandler}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                />
              </div>

            </div>

            <div className='products-container-body'>
              {products?.data?.products.map((res) => {
                return (
                  <>
                    <Product products={res} />
                  </>

                )
              })}
            </div>

            {
              products?.data?.resultPerPage > products?.data?.productCount
                ?
                ""
                :
                <div className='pagination-container'>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={products?.data?.resultPerPage}
                    totalItemsCount={products?.data?.productCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass='page-item'
                    linkClass='page-link'
                    activeClass='pageItemActive'
                    activeLinkClass='pageLinkActive'
                  />
                </div>
            }


          </div>
      }
    </>

  )
}

export default Products