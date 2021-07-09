import Rating from './Rating';
import { v4 as uuidv4 } from 'uuid';

function RatingsList({ totalStars, stars_count }) {
  function getStarPercentage(starCount) {
    return totalStars === 0 ? 0 : (starCount / totalStars) * 100;
  }

  return (
    <ul className='ratings-list'>
      {Object.keys(stars_count).map(star => (
        <Rating
          ratingPercentage={getStarPercentage(stars_count[star])}
          ratingQty={star}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
}

export default RatingsList;
