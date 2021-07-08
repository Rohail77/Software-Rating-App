import { Component } from 'react';
import RatingStarsList from './rating stars list/RatingStarsList';

class RatingInput extends Component {
  render() {
    return (
      <div className='rate'>
        <h2>
          Rate <span className='required-arterisk'>*</span>
        </h2>
        <RatingStarsList {...this.props} />
      </div>
    );
  }
}

export default RatingInput;
