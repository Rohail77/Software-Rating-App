import { Component } from 'react';
import ReviewPage from './review page/ReviewPage';
import { v4 as uuidv4 } from 'uuid';
import PreviousPageButton from './page navigation buttons/PreviousPageButton';
import NextPageButton from './page navigation buttons/NextPageButton';

class ReviewPagesList extends Component {
  endPagesNotReached() {
    const { currentPage, totalPages } = this.props;
    return currentPage + 2 <= totalPages;
  }

  getPageNumbers() {
    const { currentPage, totalPages } = this.props;
    const pageNumbers = [];

    if (this.endPagesNotReached()) {
      for (
        let pageNumber = currentPage;
        pageNumber <= currentPage + 2;
        pageNumber++
      ) {
        pageNumbers.push(pageNumber);
      }
    } else {
      for (
        let pageNumber = totalPages - 2;
        pageNumber <= totalPages;
        pageNumber++
      ) {
        if (pageNumber > 0) pageNumbers.push(pageNumber);
      }
    }
    return pageNumbers;
  }

  disablePreviousPageButton() {
    const { currentPage } = this.props;
    return currentPage === 1;
  }

  disableNextPageButton() {
    const { currentPage, totalPages } = this.props;
    return currentPage === totalPages;
  }

  render() {
    const { currentPage, updateCurrentPage } = this.props;

    return (
      <ul className='review-pages__list'>
        <PreviousPageButton
          isDisabled={this.disablePreviousPageButton()}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />
        {this.getPageNumbers().map(pageNumber => (
          <ReviewPage
            pageNumber={pageNumber}
            updateCurrentPage={updateCurrentPage}
            isActive={pageNumber === currentPage}
            key={uuidv4()}
          />
        ))}
        <NextPageButton
          isDisabled={this.disableNextPageButton()}
          currentPage={currentPage}
          updateCurrentPage={updateCurrentPage}
        />
      </ul>
    );
  }
}

export default ReviewPagesList;
