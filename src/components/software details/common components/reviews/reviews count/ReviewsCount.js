function ReviewsCount({ total_reviews }) {
  return (
    <div>
      <span className='reviews-qty'> {total_reviews} </span>
      <span>
        {total_reviews === 1 || total_reviews === 0 ? 'Review' : 'Reviews'}
      </span>
    </div>
  );
}

export default ReviewsCount;
