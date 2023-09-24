import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CraditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { clearErrors, newOrder } from '../featrues/productSlice'

const ProceedPayment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const data = useSelector((state) => {
    return state.app
  })
  const dispatch = useDispatch()
  const alerts = useAlert()
  const stripe = useStripe()
  const elements = useElements()
  const payBtn = useRef(null)
  const navigate = useNavigate()

  const order = {
    shippingInfo: data.shipping,
    orderItems: data.cart,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalCost
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true

    try {
      const headers = {
        'Content-Type': 'application/json'
      }

      const paymentData = {
        amount: Math.round(orderInfo.totalCost * 100)
      }

      const data = await axios.post('http://localhost:3500/api/v1/proceed/payment', paymentData, { withCredentials: true }, { headers })

      const client_secret = data.data.client_secret

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: data?.userInfo?.data?.user?.name,
            email: data?.userInfo?.data?.user?.email,
            address: {
              line1: data?.shipping?.Address,
              city: data?.shipping?.City,
              state: data?.shipping?.State,
              postal_code: data?.shipping?.Pincode,
              country: data?.shipping?.Country,
            }
          }
        }
      })

      if (result.error) {
        payBtn.current.disabled = false
        alerts.error(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          dispatch(newOrder(order))
          navigate('/success')
        } else { alerts.error("There's some issue while payment") }
      }
    } catch (error) {
      payBtn.current.disabled = false
      alerts.error(error?.message)
    }
  }

  useEffect(() => {
    dispatch(clearErrors())
  }, [dispatch, alerts])

  return (
    <div>
      <CheckoutSteps activeStep={2} />

      <div className='payment-container'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div><h1>Card Info</h1></div>
          <div>
            <CraditCardIcon />
            <CardNumberElement className='payment-input' />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className='payment-input' />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className='payment-input' />
          </div>

          <input type="submit" value={`Pay - ₹ ${orderInfo && Math.round(orderInfo.totalCost)}`} ref={payBtn} />
        </form>

      </div>


    </div>
  )
}

export default ProceedPayment