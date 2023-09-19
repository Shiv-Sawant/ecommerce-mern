import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAccountInfo } from '../featrues/productSlice'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'


const Account = () => {
  const navigate = useNavigate()
  const alerts = useAlert()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.app
  })

  console.log(data, "datadata")

  useEffect(() => {
    if(data.isAuthenticate === false) {
      navigate('/login')
    }

    dispatch(userAccountInfo())
  }, [dispatch])

  return (
    <>
      {
        data?.loading ? <Loader />
          :
          <div className='account-container'>
            <div className='account-image'>
              <div><h1>My Profile</h1></div>
              <img src={data?.userInfo?.data?.user?.avatar?.url} alt="" />
              <br />

              <Link to="/me/profile">
                <button>Edit Profile</button>
              </Link>
            </div>

            <div className='account-info'>
              <div className='account-input'>
                <div>
                  <h3>Full Name</h3>
                  <span>{data?.userInfo?.data?.user?.name}</span>
                </div>
                <div>
                  <h3>Email</h3>
                  <span>{data?.userInfo?.data?.user?.email}</span>
                </div>
                <div>
                  <h3>Joined On</h3>
                  <span>2021-08-31</span>
                </div>
              </div>
              <div className='account-button'>
                <div>
                  <Link to="/orders">
                    <button>My Orders</button>
                  </Link>
                </div>
                <div>
                  {/* <Link to="/change-password"> */}
                  <button onClick={() => alerts.success('Coming Soon...')}>Change Password</button>
                  {/* </Link> */}
                </div>
              </div>
            </div>

          </div>
      }
    </>

  )
}

export default Account