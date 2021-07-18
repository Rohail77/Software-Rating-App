import Review from './Review';
import { v4 as uuidv4 } from 'uuid';

function ReviewsList({
  reviews,
  softwareID,
  fromSoftwareDetailsPage,
  noReviewsPage,
}) {
  const data = {
    maxLength: 300,
    maxLengthDifference: 100,
  };

  return (
    <ul className='reviews__list'>
      {reviews.map(review => (
        <Review
          review={review}
          key={uuidv4()}
          {...data}
          softwareID={softwareID}
          fromSoftwareDetailsPage={
            fromSoftwareDetailsPage ? fromSoftwareDetailsPage : false
          }
          noReviewsPage={noReviewsPage ? noReviewsPage : false}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;
