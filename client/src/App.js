import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './component/Header';
import React, { useEffect } from 'react';
import webfont from 'webfontloader'
import Footer from './component/Footer';
import Home from './component/Home';
import ProductDetail from './component/ProductDetail';
import UserOptions from './component/UserOptions';
import Products from './component/Products';
import Login from './component/Login';
import Account from './component/Account';
import UpdateProfile from './component/UpdateProfile';

import { store } from './store'
import { userAccountInfo } from './featrues/productSlice';
import { useSelector } from 'react-redux';
import Cart from './component/Cart';

function App() {
  const navigate = useNavigate()
  var user = useSelector((state) => state.app)

  console.log(user, "app user")
  console.log(user?.isAuthenticate === "false", "app user")

  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Chilanka', 'Droid Sans']
      }
    })

    store.dispatch(userAccountInfo())

    // if (user?.isAuthenticate === false) {
    //   navigate('/login')
    // }
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
      </Routes>
      <Footer />
      {/* </Router> */}
    </div>
  );
}

export default App;
