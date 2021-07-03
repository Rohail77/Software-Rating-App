import { Component } from 'react';
import Stars from '../../common/Stars';
import RatingsList from './RatingsList';

class SoftwareRating extends Component {
  getTotalRatings() {
    return this.props.rating.categories.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.count;
      },
      0
    );
  }

  render() {
    const { rating } = this.props;

    return (
      <div className='software-rating'>
        <h2>Rating</h2>
        <div className='average-rating'>
          <span className='rating-qty'>{rating.average}</span>
          <Stars averageRating={rating.average} />
        </div>

        <RatingsList
          ratingCount={this.getTotalRatings()}
          ratingCategories={rating.categories}
        />
      </div>
    );
  }
}

export default SoftwareRating;
