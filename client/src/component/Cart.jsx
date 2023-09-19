import React, { useState } from 'react'
import img from '../assets/top1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { cartItems, removeCartItem } from '../featrues/productSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BsCartX } from 'react-icons/bs'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        return state.app
    })

    const handleIncrease = (id, stock, quantity) => {
        console.log('into iecrease')

        if (quantity < stock) {
            console.log('into if')

            let newqty = quantity + 1
            dispatch(cartItems({
                product: id,
                item: newqty
            }))
        }
    }

    const handleDecrease = (id, quantity) => {
        console.log('into de')
        if (quantity > 1) {
            let newQty = quantity - 1
            dispatch(cartItems({
                product: id,
                item: newQty
            }))
        }
    }

    const handleRemove = (id) => {
        dispatch(removeCartItem(id))
    }

    const handleCheckout = () => {
        navigate("/login?redirect=shipping")
    }


    return (
        <div className='cart-component'>
            <div className='cart-header'>
                <div>
                    Product
                </div>

                <div>
                    <div> Quantity</div>
                    <div> Subtotal</div>

                </div>
            </div>

            {
                data.cart.length <= 0 ?
                    <div className='empty-cart'>
                        <div className='emptycarticon'><BsCartX /></div>
                        <h1>No Product In Your Cart</h1>
                        <Link to="/products"> <h3>View Products</h3></Link>
                    </div>
                    :
                    <>
                        {
                            data.cart.map((item) => {
                                return (
                                    <div className='cart-body'>
                                        <div className='cart-body-left'>
                                            <div>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div>
                                                <h4> {item.name}</h4>
                                                <h5>Price: ₹{item.price}</h5>
                                                <button onClick={() => handleRemove(item.product)}>  Remove</button>
                                            </div>
                                        </div>

                                        <div className='cart-body-right'>
                                            <div>
                                                <button onClick={() => handleDecrease(item.product, item.quantity)}> -</button>
                                                {item.quantity}
                                                <button onClick={() => handleIncrease(item.product, item.stock, item.quantity)}> +</button>
                                            </div>
                                            <div>
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }
                        <div className='checkout-container'>
                            <div className='checkout-content'>
                                <h3>
                                    Gross Total
                                </h3>
                                <h3>
                                    ₹ {
                                        data.cart.reduce((acc, item) => acc + (item.quantity || 0) * item.price, 0)
                                    }
                                </h3>
                            </div>

                            <div className='checkout-button'>
                                <button onClick={handleCheckout}>
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </>
            }


        </div>
    )
}

export default Cart