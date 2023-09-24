import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Rating } from "@material-ui/lab";


const ReviewCard = ({ review }) => {
  console.log(review, 'reviewreview')
  const options = {
    size: "large",
    value: Number(review?.rating),
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className='review-card-container'>
      <div className='review-profile'>
        <AiOutlineUser className='review-profile-icon' />
      </div>

      <div>
        {review.name}
      </div>

      <div>
        <Rating {...options} />
      </div>

      <p>
        {review.comment}
      </p>
      <br />
    </div>
  )
}

export default ReviewCard