import { Component } from 'react';
import Stars from '../../common/Stars';
import RatingsList from './RatingsList';

class SoftwareRating extends Component {
  getTotalStars() {
    const { stars_count } = this.props;
    let totalStars = 0;
    for (const key in stars_count) {
      totalStars += stars_count[key];
    }

    return totalStars;
  }

  render() {
    const { average_rating, stars_count } = this.props;

    return (
      <div className='software-rating'>
        <h2>Rating</h2>
        <div className='average-rating'>
          <span className='rating-qty'>{average_rating}</span>
          <Stars averageRating={average_rating} />
        </div>

        <RatingsList
          totalStars={this.getTotalStars()}
          stars_count={stars_count}
        />
      </div>
    );
  }
}

export default SoftwareRating;
