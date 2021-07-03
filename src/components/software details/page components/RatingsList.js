import { Component } from 'react';
import Rating from './Rating'
import { v4 as uuidv4 } from 'uuid';

class RatingsList extends Component {
  getStarPercentage(starCount) {
    return (starCount / this.props.ratingCount) * 100;
  }

  render() {
    return (
      <ul className='ratings-list'>
      {this.props.ratingCategories.map(category => {
        return (
          <Rating
            ratingPercentage={this.getStarPercentage(
              category.count
            )}
            ratingQty={category.type}
            key={uuidv4()}
          />
        );
      })}
        
      </ul>
    );
  }
}

export default RatingsList;
