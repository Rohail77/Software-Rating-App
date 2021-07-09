import ReviewPagesList from './review pages list/ReviewPagesList';

function ReviewPages(props) {
  const { totalPages, currentPage } = props;

  return (
    <div className='review-pages'>
      <ReviewPagesList {...props} />
      <p className='review-pages__info'>
        Page {currentPage} of{' '}
        <span className='review-pages__total-pages'>{totalPages}</span>
      </p>
    </div>
  );
}

export default ReviewPages;
