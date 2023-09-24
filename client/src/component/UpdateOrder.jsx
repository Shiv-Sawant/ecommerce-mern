import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetail, updateOrder } from '../featrues/productSlice'
import DashboardSidebar from './DashboardSidebar'
import img from '../assets/logo.png'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import AccountTreeIcon from "@material-ui/icons/AccountTree";


const UpdateOrder = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alerts = useAlert()
  const [updateStatus, setUpdateStatus] = useState('')

  const data = useSelector((state) => {
    return state.app
  })

  const subtotal = data.cart.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  )

  const shippingCharges = subtotal > 1000 ? 0 : 200

  const tax = subtotal * 0.18

  const totalCost = subtotal + shippingCharges + tax

  const handleUpdate = () => {

    let id = params.id

    let update = {
      status: updateStatus
    }

    dispatch(updateOrder({ id, update }))
  }


  useEffect(() => {
    dispatch(getOrderDetail(params.id))

    if (data?.error != null) {
      alerts.error(data?.error?.message)
      dispatch(clearErrors())
    }
  }, [dispatch, params.id])

  return (
    <div className='dashoardcontainer'>
      <div className='dashboardnavbar'>
        <Link to='/admin/dashboard'>
          <img src={img} alt="" />
        </Link>
      </div>
      <div className='dashboarddivided'>
        <DashboardSidebar />

        <div className='confirmordercontainer updateContainer '>

          <div className='confirmfirstcontainer updateordercontainer '>
            <div className='confirmfirsttop'>
              <div>
                <h1>Shipping Info</h1>
              </div>

              <div>
                <h3>Name : <span>{data?.userInfo?.data?.user?.name}</span></h3>
                <h3>Phone : <span>{data?.shipping?.PhoneNumber}</span></h3>
                <h3>Address : <span>{data?.shipping?.Address}</span></h3>
              </div>
            </div>

            <div className='confirmfirsttop'>
              <div>
                <h1>Payment</h1>
              </div>
              <div>
                <h3> <span>PAID</span></h3>
                <h3>BALANCE <span>{Math.round(totalCost)}</span></h3>
              </div>
            </div>

            <div className='confirmfirsttop'>
              <div>
                <h1>Order Status</h1>
              </div>
              <div>
                <h3> <span>{data?.orderDetail?.data?.order.orderStatus}</span></h3>
              </div>
            </div>

            <div className='confirmfirstbottom'>
              <div><h1>Your Cart Items : </h1></div>

              <div className='confirlastchild'>
                {
                  data.cart.map((item) => {
                    return (
                      <>
                        <div className='confirlastchild-1'>
                          <div >
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                          </div>

                          <div>
                            <p>{item.quantity}&nbsp; X   &nbsp;₹{item.price} = ₹{item.quantity * item.price}</p>
                          </div>
                        </div>

                      </>
                    )
                  })
                }

              </div>
            </div>
          </div>

          <div className='confirmsecondcontainer'>
            <div>
              <h1>Process Order</h1>
            </div>

            <div className='confirmsecondmiddle'>

              <div>
                <AccountTreeIcon />

                <select name="" id="" onChange={(e) => setUpdateStatus(e.target.value)}>
                  <option value="">Update Process</option>
                  {
                    data?.orderDetail?.data?.order.orderStatus === 'Shipped' && (
                      <option value="Delivered">Delivered</option>
                    )
                  }

                  {
                    data?.orderDetail?.data?.order.orderStatus === 'Processing' && (
                      <option value="Shipped">Shipped</option>
                    )
                  }

                </select>
              </div>

            </div>

            <div>
              <button onClick={handleUpdate}>Update Order Status</button>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default UpdateOrder