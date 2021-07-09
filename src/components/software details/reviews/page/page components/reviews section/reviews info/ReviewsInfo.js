import ReviewsCount from '../../../../../common components/reviews/reviews count/ReviewsCount';
import FilterRatingForm from './filter rating form/FilterRatingForm';

function ReviewsInfo({ filterReviews, total_reviews }) {
  return (
    <div className='reviews__info'>
      <ReviewsCount total_reviews={total_reviews} />
      <FilterRatingForm filterReviews={filterReviews} />
    </div>
  );
}

export default ReviewsInfo;
