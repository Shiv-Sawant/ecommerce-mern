import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import ReactStars from 'react-rating-stars-component'


const ReviewCard = ({ review }) => {
  console.log(review, "review")
  return (
    <div className='review-card-container'>
      <div className='review-profile'>
        <AiOutlineUser className='review-profile-icon' />
      </div>

      <div>
        {review.name}
      </div>

      <div>
        <ReactStars />
      </div>

      <p>
        {review.comment}
      </p>
      <br />
    </div>
  )
}

export default ReviewCard