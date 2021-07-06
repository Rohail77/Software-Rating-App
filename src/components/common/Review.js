import { Component } from 'react';
import { Link } from 'react-router-dom';

class Review extends Component {
  render() {
    const { review, maxLength } = this.props;
    const lengthDifference = review.review.length - maxLength;

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
        <p className='review__para'>
          {lengthDifference > 20
            ? `${review.review.slice(0, maxLength)} ....`
            : review.review}
        </p>
        {lengthDifference > 20 ? (
          <Link
            className='see-more-link'
            to={{
              pathname: `/software_details/reviews/review/${review.username}`,
            }}
          >
            See more
          </Link>
        ) : null}
      </li>
    );
  }
}

export default Review;
