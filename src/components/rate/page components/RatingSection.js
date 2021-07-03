import { Component } from 'react';
import RatingStarsList from './RatingStarsList';

class RatingSection extends Component {
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

export default RatingSection;
