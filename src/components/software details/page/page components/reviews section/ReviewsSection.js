import { Component } from 'react';
import ReviewsList from '../../../common components/reviews/review list/ReviewsList';
import RateLink from '../../../common components/common links/RateLink';
import ReviewsLink from '../../../common components/common links/ReviewsLink';
import ReviewsCount from '../../../common components/reviews/reviews count/ReviewsCount';

class ReviewsSection extends Component {
  render() {
    const { software, reviews } = this.props;

    return (
      <section className='reviews'>
        <h2 className='reviews-heading'>Reviews</h2>
        <p className='ask-for-review-para'>Write a review by rating this app</p>
        <RateLink softwareID={software.id} />

        <div className='review-feedback-content'>
          <ReviewsCount total_reviews={software.total_reviews} />
          {software.total_reviews <= 3 ? null : (
            <ReviewsLink softwareID={software.id} />
          )}
        </div>

        <ReviewsList
          reviews={reviews.slice(0, 3)}
          softwareID={software.id}
          fromSoftwareDetailsPage={true}
        />

        {software.total_reviews <= 3 ? null : (
          <ReviewsLink softwareID={software.id} />
        )}
      </section>
    );
  }
}

export default ReviewsSection;
