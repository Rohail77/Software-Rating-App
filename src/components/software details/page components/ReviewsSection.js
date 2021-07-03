import { Component } from 'react';
import ReviewsList from '../../common/ReviewsList';
import RateLink from './RateLink';
import ReviewsLink from './ReviewsLink';

class ReviewsSection extends Component {
  render() {
    const { reviews, software } = this.props;

    return (
      <section className='reviews'>
        <h2 className='reviews-heading'>Reviews</h2>
        <p className='ask-for-review-para'>Write a review by rating this app</p>
        <RateLink software={software}/>

        <div className='review-feedback-content'>
          <div>
            <span className='reviews-qty'> {reviews.length} </span>
            <span>Reviews</span>
          </div>
          <ReviewsLink data={{ software, reviews }} />
        </div>

        <ReviewsList reviews={reviews.slice(0, 3)} />

        <ReviewsLink data={{ software, reviews }} />
      </section>
    );
  }
}

export default ReviewsSection;
