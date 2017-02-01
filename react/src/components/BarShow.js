import React from 'react';
import Review from './Review';

const BarShow = ({ id, averageRating, name, reviews }) => {
  let barReviews = reviews.map(review => {
    return(
      <Review
        key={review.id}
        id={review.id}
        rating={review.rating}
        body={review.body}
      />
    )
  })

  return(
    <div className="bar">
      <h2>{name}</h2>
      Average Rating: {averageRating}
      <div>
        {barReviews}
      </div>
    </div>
  )
}

export default BarShow;
