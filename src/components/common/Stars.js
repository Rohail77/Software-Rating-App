import { Component } from 'react';
import Star from './Star';
import { v4 as uuidv4 } from 'uuid';

class Stars extends Component {
  getTotalRedStars() {
    return Math.floor(this.props.averageRating);
  }

  getTotalWhiteStars() {
    const { averageRating } = this.props;
    return Number.isInteger(averageRating)
      ? 5 - averageRating
      : 5 - Math.ceil(averageRating);
  }

  getStarTypes() {
    const starTypes = [];
    const { averageRating } = this.props;

    for (let i = 1; i <= this.getTotalRedStars(); i++) {
      starTypes.push('red star');
    }

    if (this.getTotalRedStars() < 5 && !Number.isInteger(averageRating)) {
      starTypes.push('half filled red star');
    }

    for (let i = 1; i <= this.getTotalWhiteStars(); i++) {
      starTypes.push('white star');
    }
    return starTypes;
  }

  render() {
    return (
      <ul className='stars-list'>
        {this.getStarTypes().map(starType => (
          <Star starType={starType} key={uuidv4()} />
        ))}
      </ul>
    );
  }
}

export default Stars;
