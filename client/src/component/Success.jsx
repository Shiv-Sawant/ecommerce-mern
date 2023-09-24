import React from 'react'
import { Link } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';

const Success = () => {
  return (
    <div className='success-container'>
      <div>
        <CheckIcon />
      </div>

      <div>
        <h1>Your Order Has Been Placed Successfully</h1>
      </div>

      <div>
        <Link to='/order/me'>
          <button>View Order</button>
        </Link>
      </div>
    </div>
  )
}

export default Success