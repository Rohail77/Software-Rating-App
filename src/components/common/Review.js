import { Component } from 'react';

class Review extends Component {
  render() {
    const { review } = this.props;
    return (
      <li className='review'>
        <div className='review__info'>
          <span className='reviewer'></span>
          {review.username}
          <span className='review-date'>{review.date}</span>
        </div>
        <div className='review__rating-type'>
          <span className='rating-qty'>{review.rating}</span>
          <img src='/images/red star.svg' alt='red star' />
        </div>
        <p className='review__para'>{review.review}</p>
      </li>
    );
  }
}

export default Review;
