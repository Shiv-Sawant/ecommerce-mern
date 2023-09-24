import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'

const ConfirmOrder = () => {
  const navigation = useNavigate()
  const alerts = useAlert()
  const data = useSelector((state) => {
    return state.app
  })

  const subtotal = data.cart.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  )

  const shippingCharges = subtotal > 1000 ? 0 : 200

  const tax = subtotal * 0.18

  const totalCost = subtotal + shippingCharges + tax

  const handleProceed = () => {
    let data = {
      shippingCharges: shippingCharges,
      subtotal: subtotal,
      tax: tax,
      totalCost: totalCost
    }

    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    alerts.success('Proceed Successfull')
    navigation('/process/payment')
  }


  return (
    <div>
      <CheckoutSteps activeStep={1} />

      <div className='confirmordercontainer'>

        <div className='confirmfirstcontainer'>
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
            <h1>Order Summary</h1>
          </div>

          <div className='confirmsecondmiddle'>

            <div>
              <p>Subtotal : </p>
              <span>₹ {subtotal}</span>
            </div>

            <div>

              <p>Shipping Charges : </p>
              <span>₹ {shippingCharges}</span>
            </div>

            <div>

              <p>GST : </p>
              <span>₹ {tax}</span>
            </div>

          </div>

          <div className='confirmsecondbottom'>
            <h3>Total</h3>
            <span>₹ {totalCost}</span>
          </div>

          <div>
            <button onClick={handleProceed}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ConfirmOrder