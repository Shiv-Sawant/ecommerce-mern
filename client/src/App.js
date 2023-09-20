import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
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


function App() {
  var user = useSelector((state) => state.app)
  const [StripeKey, setStripeKey] = useState()

  const getStripeKey = async () => {
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
      {/* <Router> */}
      <Header />
      {user?.isAuthenticate && <UserOptions user={user} />}
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
        <Route path='/process/payment' element={<ProceedPayment />} />

      </Routes>
      <Footer />
      {/* </Router> */}
    </div>
  );
}

export default App;
