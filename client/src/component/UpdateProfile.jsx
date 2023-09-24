import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  userUpdate } from '../featrues/productSlice'

const UpdateProfile = () => {
  let alerts = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const data = useSelector((state) => {
    return state.app
  })

  const [UpdateInput, setUpdateInput] = useState({
    updateNameInput: "",
    updateEmailInput: "",
    updateAvatarInput: data?.userInfo?.data?.user?.avatar?.url,
  })

  console.log(data, "data")
  console.log(UpdateInput)

  const handleUserInput = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpdateInput((prevState) => ({ ...prevState, updateAvatarInput: reader.result }))
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }


  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(userUpdate(UpdateInput))
    navigate('/account')
  }

  useEffect(() => {
    setUpdateInput({
      updateNameInput: data?.userInfo?.data?.user?.name,
      updateEmailInput: data?.userInfo?.data?.user?.email,
      updateAvatarInput: "",
    })

  }, [dispatch, data?.error, alerts, data?.isAuthenticate, data, navigate])

  return (
    <div className='login-container'>
      <form onSubmit={handleRegister}>
        <div className='login-box'>

          <div className='login-top'>
            <div className='login-header'>
              <h1>Update Profile</h1>
            </div>

          </div>

          <div className='register-input-box'>
            <input type="text" required placeholder='name' id='name' value={UpdateInput.updateNameInput} name='name' onChange={(e) => setUpdateInput((prevState) => ({ ...prevState, updateNameInput: e.target.value }))} />
            <input type="text" required placeholder='email' id='email' name='email' value={UpdateInput.updateEmailInput} onChange={(e) => setUpdateInput((prevState) => ({ ...prevState, updateEmailInput: e.target.value }))} />
            {/* <input type="text" required placeholder='password' id='password' name='password' onChange={handleUserInput} /> */}
          </div>

          <div className='register-image-upload'>
            <div>
              <img src={data?.userInfo?.data?.user?.avatar?.url} alt="" />
            </div>

            <div>
              <input type="file" id='avatar' name='avatar' onChange={handleUserInput} />
            </div>
          </div>


          <div className='login-button'>
            <button>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile