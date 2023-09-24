import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/home.css'
import '../styles/featureproduct.css'
import { CgMouse } from "react-icons/cg";
import Product from './Product'
import { getProducts } from '../featrues/productSlice'
import { useAlert } from 'react-alert';
import Loader from './Loader'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.app
  })

  console.log(data, "datadata")
  console.log(data, "datadata")

  useEffect(() => {

    dispatch(getProducts())


    if (data?.error) {
      alert.error(data?.error?.response?.data?.message)
    }

  }, [dispatch, alert, data?.error])

  return (
    <>
      {
        data.loading ?
          // true ?
          <>
            <Loader />
          </>
          :
          <>
            <div className='home-container'>
              <div>
                <h1>
                  Welcome To Ecommerce
                </h1>
              </div>

              <div>
                <h3>
                  FIND AMAZING PRODUCTS BELOW
                </h3>
              </div>

              <div>
                <a href="#featureproduct" >
                  <h4>
                    Scroll <CgMouse />
                  </h4>
                </a>
              </div>
            </div>

            <div className='feature-container' id='featureproduct'>
              <div>
                <h1 className='feature-container-header'>
                  Feature Products {data?.products[0]?.data?.productCount}
                </h1>
              </div>
              {
                data && data.loading ?
                  <>
                    loading....
                  </>
                  :
                  <div className='product-component'>
                    {
                      console.log(data)

                    }
                    {
                      data && data?.products?.data?.products.map((res) => {
                        return (
                          <Product products={res} />
                        )
                      })
                    }
                  </div>
              }


            </div>
          </>
      }
    </>

  )
}

export default Home