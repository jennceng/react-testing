import React from 'react';
import Review from './Review';
import { Link } from 'react-router';


const BarTile = ({ id, name, address, hours_of_operation }) => {
    let showReviews;

    // if(active) {
    //   showReviews = reviews.map(review => {
    //     return(
    //       <Review
    //       key={review.id}
    //       id={review.id}
    //       rating={review.rating}
    //       body={review.body}
    //       />
    //     )
    //   })
    // }

    return(
      <div className="bar">
        <Link to={`/bars/${id}`}> {name} </Link>
        <h3>Address: {address} </h3>
        <h3>Hours of Operation: {hours_of_operation} </h3>
      </div>
    )
  }

export default BarTile;
