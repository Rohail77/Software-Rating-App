import { Component } from 'react';
import Rating from './Rating';
import { v4 as uuidv4 } from 'uuid';

class RatingsList extends Component {
  getStarPercentage(starCount) {
    const { totalStars } = this.props;

    return totalStars === 0 ? 0 : (starCount / totalStars) * 100;
  }

  render() {
    const { stars_count } = this.props;

    return (
      <ul className='ratings-list'>
        {Object.keys(stars_count).map(star => (
          <Rating
            ratingPercentage={this.getStarPercentage(stars_count[star])}
            ratingQty={star}
            key={uuidv4()}
          />
        ))}
      </ul>
    );
  }
}

export default RatingsList;
