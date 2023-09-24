import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header';
import React, { useEffect, useState } from 'react';
import webfont from 'webfontloader'
import Footer from './component/Footer';
import Home from './component/Home';
import ProductDetail from './component/ProductDetail';
import UserOptions from './component/UserOptions';
import Products from './component/Products';
import Login from './component/Login';
import Account from './component/Account';
import UpdateProfile from './component/UpdateProfile';
import Shipping from './component/Shipping'
import { store } from './store'
import { userAccountInfo } from './featrues/productSlice';
import { useSelector } from 'react-redux';
import Cart from './component/Cart';
import ConfirmOrder from './component/ConfirmOrder';
import ProceedPayment from './component/ProceedPayment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import Success from './component/Success';
import Orders from './component/Orders';
import OrderDetail from './component/OrderDetail';
import Dashboard from './component/Dashboard';
import AdminProducts from './component/AdminProducts';
import AdminCreateProducts from './component/AdminCreateProducts';
import UpdateProduct from './component/UpdateProduct';
import AdminOrders from './component/AdminOrders';
import UpdateOrder from './component/UpdateOrder';
import AdminUsers from './component/AdminUsers';
import AdminUpdateUser from './component/AdminUpdateUser';
import AdminAllReviews from './component/AdminAllReviews';


function App() {
  var user = useSelector((state) => state.app)
  const [StripeKey, setStripeKey] = useState()

  console.log(user, "userusers")

  const getStripeKey = async () => {
    if (user?.isAuthenticate !== false) {
      const data = await axios.get('http://localhost:3500/api/v1/sendApiKey',
        { withCredentials: true },
        {
          headers:
            { "Content-Type": "application/json" }
        }
      )
      setStripeKey(data.data.stripapikey)
      console.log(data, "datadata")
    }

  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Chilanka', 'Droid Sans']
      }
    })

    getStripeKey()
    store.dispatch(userAccountInfo())
  }, [])

  return (

    <div className='main-container'>
      <Router>
        <Header />
        {user?.isAuthenticate && <UserOptions user={user} />}
        {StripeKey && (
          <Elements stripe={loadStripe(StripeKey)}>
            <Routes>
              <Route path='/process/payment' element={<ProceedPayment />} />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/me/profile' element={<UpdateProfile />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          <Route path='/success' element={<Success />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/order/me' element={<Orders />} />
          <Route path='/order/:id' element={<OrderDetail />} />
          <Route path='/admin/products' element={<AdminProducts />} />
          <Route path='/admin/product' element={<AdminCreateProducts />} />
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
          <Route path='/admin/order/:id' element={<UpdateOrder />} />
          <Route path='/admin/Users' element={<AdminUsers />} />
          <Route path='/admin/user/:id' element={<AdminUpdateUser />} />
          <Route path='/admin/Reviews' element={<AdminAllReviews />} />
        </Routes >
        <Footer />
      </Router>
    </div>
  );
}

export default App;
