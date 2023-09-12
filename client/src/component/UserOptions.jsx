import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { BsFillCartFill } from 'react-icons/bs'

import { userLogout } from '../featrues/productSlice'

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const alerts = useAlert()
  const dispatch = useDispatch()

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orderFunc },
    { icon: <PersonIcon />, name: "Profile", func: profileFunc },
    { icon: <BsFillCartFill />, name: "Cart", func: cartFunc },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutFunc },
  ]

  console.log(user)

  if (user?.userInfo?.data?.user?.role === 'admin') {
    options.unshift(
      { icon: <DashboardIcon />, name: "Dashboard", func: dashboardFunc },
    )
  }

  function dashboardFunc() {
    navigate('/')
  }

  function orderFunc() {
    navigate('/orders')
  }

  function profileFunc() {
    navigate('/account')
  }

  function logoutFunc() {
    dispatch(userLogout())
    navigate('/login')
    alerts.success('Logout Successfully')
  }

  function cartFunc() {
    navigate('/cart')
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        className='speeddial'
        icon={
          <img className='speeddialicon' src={user?.userInfo?.data?.user?.avatar?.url} alt='profile' />
        }
      >
        {
          options.map((res) => {
            return <SpeedDialAction icon={res.icon} tooltipTitle={res.name} onClick={res.func} />

          })
        }
      </SpeedDial>

    </>
  )
}

export default UserOptions