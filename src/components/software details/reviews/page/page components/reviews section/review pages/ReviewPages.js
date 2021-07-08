import { Component } from 'react';
import ReviewPagesList from './review pages list/ReviewPagesList';

class ReviewPages extends Component {
  render() {
    const { totalPages, currentPage } = this.props;

    return (
      <div className='review-pages'>
        <ReviewPagesList {...this.props} />
        <p className='review-pages__info'>
          Page {currentPage} of{' '}
          <span className='review-pages__total-pages'>{totalPages}</span>
        </p>
      </div>
    );
  }
}

export default ReviewPages;
