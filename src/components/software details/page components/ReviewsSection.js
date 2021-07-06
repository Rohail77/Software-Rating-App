import { Component } from 'react';
import ReviewsList from '../../common/ReviewsList';
import RateLink from './RateLink';
import ReviewsLink from './ReviewsLink';
import ReviewsCount from '../../common/ReviewsCount';

class ReviewsSection extends Component {
  render() {
    const { software, reviews } = this.props;

    return (
      <section className='reviews'>
        <h2 className='reviews-heading'>Reviews</h2>
        <p className='ask-for-review-para'>Write a review by rating this app</p>
        <RateLink
          software={{
            name: software.name,
            developer: software.developer,
            id: software.id,
          }}
        />

        <div className='review-feedback-content'>
          <ReviewsCount total_reviews={software.total_reviews} />
          {software.total_reviews <= 3 ? null : (
            <ReviewsLink softwareID={software.id} />
          )}
        </div>

        <ReviewsList reviews={reviews.slice(0, 3)} />

        {software.total_reviews <= 3 ? null : (
          <ReviewsLink softwareID={software.id} />
        )}
      </section>
    );
  }
}

export default ReviewsSection;
