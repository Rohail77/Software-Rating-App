import { Component } from 'react';
import RatingStar from './RatingStar';
import { v4 as uuidv4 } from 'uuid';

class RatingStarsList extends Component {
  getStarTypes() {
    const { rating } = this.props;
    const starTypes = [];
    for (let starNumber = 0; starNumber < rating; starNumber++) {
      starTypes.push('red');
    }
    for (let starNumber = rating; starNumber < 5; starNumber++) {
      starTypes.push('white');
    }
    return starTypes;
  }

  render() {
    return (
      <ul className='stars-list'>
        {this.getStarTypes().map((starType, index) => (
          <RatingStar
            {...this.props}
            starType={starType}
            starNumber={index + 1}
            key={uuidv4()}
          />
        ))}
      </ul>
    );
  }
}

export default RatingStarsList;
