import React, { Component } from 'react'
import Review from './Review';
import { v4 as uuidv4 } from 'uuid';

class ReviewsList extends Component {
  render() {

    const {reviews} = this.props;
    return (
      <ul className='reviews__list'>
        {reviews.map(review => (
          <Review review={review} key={uuidv4()} maxLength={50}/>
        ))}
      </ul>
    );
  }
}

export default ReviewsList
