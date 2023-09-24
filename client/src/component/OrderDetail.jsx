import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetail } from '../featrues/productSlice'

const OrderDetail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        return state.app
    })

    console.log(data?.orderDetail?.data?.order.orderItems)

    console.log(data, 'order detail')

    useEffect(() => {
        dispatch(getOrderDetail(params.id))
    }, [dispatch, params.id])

    return (
        <div className='orderdetailcontainer'>
            <div>
                {/* <Link to={`//`}> */}
                <h1>Order #{data?.orderDetail?.data?.order?._id} </h1>
                {/* </Link> */}
            </div>

            <div className='orderdetailcontainer-div'>
                <div>
                    <h2>Shipping Info</h2>
                </div>
                <div>
                    <p>Name: <span>{data?.userInfo?.data?.user?.name}</span></p>
                    <p>Phone: <span>{data?.shipping?.PhoneNumber}</span></p>
                    <p>Address: <span>{data?.shipping?.Address}</span></p>
                </div>
            </div>

            <div className='orderdetailcontainer-div'>
                <div>
                    <h2>Payment</h2>
                </div>
                <div>
                    <p>PAID: <span></span></p>
                    <p>Amount: <span>{Math.round(data?.orderDetail?.data?.order?.totalPrice)}</span></p>
                </div>
            </div>

            <div className='orderdetailcontainer-div'>
                <div>
                    <h2>Order Status</h2>
                </div>
                <div>
                    <p>{data?.orderDetail?.data?.order?.orderStatus}</p>
                </div>
            </div>

            <div className='orderdetailcontainer-div'>
                <div>
                    <h2>Order Items:</h2>
                </div>

                {
                    data?.orderDetail?.data?.order?.orderItems.map((item, index) => {
                        return (
                            <div className='cart-body orderdetail-cart-body' key={index}>
                                <div className='cart-body-left orderdetail-cart-body-left'>
                                    <div>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div>
                                        <h4>{item.name}</h4>
                                    </div>
                                </div>

                                <div className='cart-body-right orderdetail-cart-body-right'>
                                    <div>
                                        {item.quantity} X {item.price}
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }

            </div>

        </div>
    )
}

export default OrderDetail