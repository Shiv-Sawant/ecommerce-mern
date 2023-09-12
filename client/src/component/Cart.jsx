import React from 'react'
import img from '../assets/top1.jpg'

const Cart = () => {
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

            <div className='cart-body'>
                <div className='cart-body-left'>
                    <div>
                        <img src={img} alt="" />
                    </div>
                    <div>
                        <h4> subscribe</h4>
                        <h5>Price: ₹10000</h5>
                        <a href='/#' alt="">  Remove</a>
                    </div>
                </div>

                <div className='cart-body-right'>
                    <div>
                        <button> -</button>
                        3
                        <button> +</button>
                    </div>
                    <div>
                        ₹ 30000
                    </div>
                </div>
            </div>

            <div className='checkout-container'>
                <div className='checkout-content'>
                    <h3>
                        Gross Total
                    </h3>
                    <h3>
                        ₹ 600
                    </h3>
                </div>

                <div className='checkout-button'>
                    <button>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart