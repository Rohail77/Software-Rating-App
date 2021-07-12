import { Component } from 'react';
import PastReview from './PastReview';

class PastReviews extends Component {
  render() {
    return (
      <ul className='past-reviews-list'>
        <PastReview />
      </ul>
    );
  }
}

export default PastReviews;
